import { View, Text, FlatList, Pressable, TextInput, Button, NativeSyntheticEvent, TextInputKeyPressEventData, TextInputSubmitEditingEventData } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import RecipeGrid from '../../components/RecipeGrid'
import RecipeList from '../../components/RecipeList'
// import lists from '../data/lists'
import tw from 'twrnc';
import axios from 'axios'
import { useFocusEffect } from '@react-navigation/native'
import Loader from '../../components/Loader'
import { useRecoilState } from 'recoil'
import { displayAtom } from '../../data/display'

type Props = {
    navigation: any;
    route: any;
}
interface Categorys {
    id: number;
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}
const Category = ({ navigation, route }: Props) => {
    const [lists, setLists] = useState<Categorys[]>([]);
    const [completed, setCompleted] = useState(false);
    const [failed, setFailed] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [listType, setListType] = useRecoilState(displayAtom);
    const fetchData = async () => {
        setCompleted(false)
        axios({
            method: 'get',
            url: 'https://www.themealdb.com/api/json/v1/1/categories.php',
        }).then((response) => {
            // console.log(response.data);
            let newLists = response.data.categories.map((value: { idCategory: string }) => { return { ...value, id: parseInt(value.idCategory) } })
            setLists(newLists);
        }).catch(error => {
            setFailed(true)
        }).finally(() => {
            setCompleted(true)
        });

    };
    useFocusEffect(
        React.useCallback(() => {
            // const title = route.params.name;
            navigation.setOptions({
                title: "Category Lists"
            })
            fetchData();
            return () => { };

        }, [])

    );

    const handleOpen = (id: string) => {
        let index = lists.findIndex(value => value.idCategory === id);

        navigation.navigate('CategoryLists', { name: lists[index].strCategory })
    }

    const handleKeyPress = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        navigation.navigate('Search', { name: searchTerm })
    }
    return (
        <View style={tw`relative w-full h-full`}>
            <View style={tw.style(`items-center my-3`)}>
                <TextInput onChange={e => setSearchTerm(e.nativeEvent.text)} value={searchTerm} keyboardType='web-search' enterKeyHint='search' onSubmitEditing={e => handleKeyPress(e)} style={tw.style('py-2 px-3 border border-purple-300 w-11/12 rounded-full')} />
            </View>
            <View style={tw.style(`flex-row items-center justify-between h-10 px-4 bg-white`)}>
                <View>
                    <Text>Filter</Text>
                </View>
                <View style={tw`flex-row`}>
                    <Pressable disabled={listType === 'grid'} onPress={() => setListType('grid')} style={tw`p-1 mx-1 border border-purple-500 rounded-md`}>
                        <Ionicons name={`${listType === 'grid' ? 'grid' : 'grid-outline'}`} size={20} color={`${listType === 'grid' ? 'purple' : 'gray'}`} />

                        {/* <Text style={tw`${listType === 'grid' ? 'text-white' : 'text-purple-500'}`}>Grid</Text> */}

                    </Pressable>
                    <Pressable disabled={listType === 'lists'} onPress={() => setListType('lists')} style={tw`p-1 mx-1 border border-purple-500 rounded-md`}>
                        <Ionicons name={`${listType === 'lists' ? 'list' : 'list-outline'}`} size={20} color={`${listType === 'lists' ? 'purple' : 'gray'}`} />
                        {/* <Text style={tw`${listType === 'lists' ? 'text-white' : 'text-purple-500'}`}>Lists</Text> */}
                    </Pressable>

                </View>
            </View>
            {listType === 'grid' && completed && <FlatList onRefresh={fetchData} refreshing={!completed} style={tw`h-4/5`} data={lists} alwaysBounceVertical={false} renderItem={item => (<RecipeGrid item={item.item} onOpen={handleOpen} />)} keyExtractor={(item: { id: any; }, index: any) => {
                return item.id
            }} numColumns={2} />}

            {listType === 'lists' && completed && <FlatList onRefresh={fetchData} refreshing={!completed} style={tw`mt-2 h-4/5`} data={lists} alwaysBounceVertical={false} renderItem={item => (<RecipeList item={item.item} onOpen={handleOpen} />)} keyExtractor={(item: { id: any; }, index: any) => {
                return item.id
            }} />}
            {!completed && <Loader />}
            {/* {completed && failed && <View style={tw`absolute items-center justify-center w-full h-full`}>
                <View style={tw`w-2/5`}>
                    <Button onPress={fetchData} color={tw.color('purple-500')} title='Refresh' />
                </View>
            </View>} */}
        </View>
    )
}

export default Category