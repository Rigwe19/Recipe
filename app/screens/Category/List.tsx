import { View, Text, TextInput, Pressable, FlatList, Button } from 'react-native'
import React, { useState } from 'react'
import RecipeGrid from '../../components/RecipeGrid'
import tw from 'twrnc';
import lists from '../../data/lists'
import RecipeList from '../../components/RecipeList';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { displayAtom } from '../../data/display';
import Loader from '../../components/Loader';
type Props = {
    navigation: any
    route: any
}
interface Meal {
    id: number;
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}
const List = ({ navigation, route }: Props) => {
    const [lists, setLists] = useState<Meal[]>([]);
    const meal = route.params.name;
    const [completed, setCompleted] = useState(false)
    const [failed, setFailed] = useState(false)
    const fetchData = async () => {
        axios({
            method: 'get',
            url: `https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal}`,
        }).then((response) => {
            // console.log(response.data);
            let newLists = response.data.meals.map((value: { idMeal: string }) => {
                return {
                    ...value,
                    id: parseInt(value.idMeal)
                }
            })
            setLists(newLists);
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setCompleted(true)
        });
    };
    useFocusEffect(
        React.useCallback(() => {
            fetchData();
            navigation.setOptions({
                title: `${meal} Recipe Lists`
            })
            return () => { };
        }, [])
    );
    const [listType, setListType] = useRecoilState(displayAtom);

    const handleOpen = (id: number) => {
        let index = lists.findIndex(value => value.id === id);
        navigation.navigate('Single', { name: lists[index].strMeal, id: lists[index].id })
    }

    return (
        <View style={tw`w-full `}>
            <View style={tw.style(`items-center my-3`)}>
                <TextInput keyboardType='web-search' style={tw.style('py-2 px-3 border border-purple-300 w-11/12 rounded-full')} />
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
            {listType === 'grid' && <FlatList onRefresh={fetchData} refreshing={!completed} style={tw`h-4/5`} data={lists} alwaysBounceVertical={false} renderItem={item => (<RecipeGrid item={item.item} onOpen={handleOpen} />)} keyExtractor={(item: { id: any; }, index: any) => {
                return item.id
            }} numColumns={2} />}

            {listType === 'lists' && <FlatList onRefresh={fetchData} refreshing={!completed} style={tw`mt-2 h-4/5`} data={lists} alwaysBounceVertical={false} renderItem={item => (<RecipeList item={item.item} onOpen={handleOpen} />)} keyExtractor={(item: { id: any; }, index: any) => {
                return item.id
            }} />}
            {/* <Text>{JSON.stringify(lists, null, 2)}</Text> */}
            {!completed && <Loader />}
            {completed && failed && <View style={tw`w-full h-full`}>
                <Button title='Refresh' />
            </View>}
        </View>
    )
}

export default List