import { View, Text, Button, FlatList, Pressable, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import Loader from '../../components/Loader';
import RecipeGrid from '../../components/RecipeGrid';
import RecipeList from '../../components/RecipeList';
import { displayAtom } from '../../data/display';
import tw from 'twrnc';

type Props = {
    navigation: any
}
interface Ingredient {
    idIngredient: string;
    strIngredient: string;
    strDescription: string;
    strType: string;
}

const Ingredients = ({ navigation }: Props) => {
    const [lists, setLists] = useState<Ingredient[]>([]);
    const [completed, setCompleted] = useState(false);
    const [failed, setFailed] = useState(false)
    const [listType, setListType] = useRecoilState(displayAtom);
    const fetchData = async () => {
        setCompleted(false)
        axios({
            method: 'get',
            url: 'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
        }).then((response) => {
            // console.log(response.data);
            let newLists = response.data.meals.map((value: { idCategory: string }) => { return { ...value, id: parseInt(value.idCategory) } })
            setLists(newLists);
        }).catch(error => {
            console.log(error)
            setFailed(true)
        }).finally(() => {
            setCompleted(true)
        });

    };
    useFocusEffect(
        React.useCallback(() => {

            fetchData();
            return () => { };

        }, [])
    );

    const handleOpen = (id: string) => {
        let index = lists.findIndex(value => value.idIngredient === id);

        navigation.navigate('IngredientLists', { name: lists[index].strIngredient })
    }
    return (
        <View style={tw`relative w-full h-full`}>
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
            {listType === 'grid' && completed && <FlatList onRefresh={fetchData} refreshing={!completed} style={tw`h-4/5`} data={lists} alwaysBounceVertical={false} renderItem={({ item }) => (
                <Pressable style={tw`items-center w-1/2 p-2 m-1 bg-white rounded-xl`} onPress={() => handleOpen(item.idIngredient)}>
                    <Image src={`https://themealdb.com/images/ingredients/${item.strIngredient}-Small.png`} style={tw.style('rounded-lg', { height: 150, width: 150, objectFit: 'contain' })} />
                    <Text style={tw.style('', { fontFamily: 'Sora' })}>{item.strIngredient}</Text>
                    <Text style={tw`w-full`} numberOfLines={3}>{item.strDescription}</Text>
                </Pressable>
            )} keyExtractor={(item: any, index: any) => {
                return item.idIngredient
            }} numColumns={2} />}

            {listType === 'lists' && completed && <FlatList onRefresh={fetchData} refreshing={!completed} style={tw`mt-2 h-4/5`} data={lists} alwaysBounceVertical={false} renderItem={({ item }) => (
                <Pressable onPress={() => handleOpen(item.idIngredient)} style={tw`flex-row w-11/12 p-1 mx-auto my-2 bg-white rounded-xl`}>
                    <Image src={`https://themealdb.com/images/ingredients/${item.strIngredient}-Small.png`} style={tw`w-20 h-20 rounded-lg`} />
                    <View style={tw`justify-center w-3/4 ml-2`}>
                        <Text style={tw.style('text-purple-700', { fontFamily: 'Sora' })}>{item.strIngredient}</Text>
                        <Text style={tw`w-full`} numberOfLines={3}>{item.strDescription}</Text>
                    </View>
                </Pressable>
            )} keyExtractor={(item: any, index: any) => {
                return item.idIngredient
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

export default Ingredients