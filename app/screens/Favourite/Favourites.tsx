import { View, Text, TextInput, FlatList, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { favouriteAtom } from '../../data/favourite';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Loader from '../../components/Loader';
import tw from 'twrnc';
import { displayAtom } from '../../data/display';

type Props = {
    navigation: any;
}

const Favourites = ({ navigation }: Props) => {
    const favourites = useRecoilValue<{ strMeal: string; strMealThumb: string; idMeal: number }[]>(favouriteAtom);
    // const [lists, setLists] = useState<Ingredient[]>([]);
    // const [completed, setCompleted] = useState(false);
    // const [failed, setFailed] = useState(false)
    const [listType, setListType] = useRecoilState(displayAtom);

    // useFocusEffect(
    //     React.useCallback(() => {
    //         console.log(favourites)
    //         // fetchData();
    //         return () => { };

    //     }, [])
    // );

    const handleOpen = (id: number) => {
        let index = favourites.findIndex(value => value.idMeal === id);
        navigation.navigate('Single', { name: favourites[index].strMeal, id: favourites[index].idMeal })
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
            {listType === 'grid' && <FlatList style={tw`h-4/5`} data={favourites} alwaysBounceVertical={false} renderItem={({ item }) => (
                <Pressable style={tw`items-center w-1/2 p-2 m-1 bg-white rounded-xl`} onPress={() => handleOpen(item.idMeal)}>
                    <Image src={item.strMealThumb} style={tw.style('rounded-lg', { height: 150, width: 150, objectFit: 'contain' })} />
                    <Text style={tw.style('', { fontFamily: 'Sora' })}>{item.strMeal}</Text>
                    {/* <Text style={tw`w-full`} numberOfLines={3}>{item.strDescription}</Text> */}
                </Pressable>
            )} keyExtractor={(item: any, index: any) => {
                return item.idMeal
            }} numColumns={2} />}

            {listType === 'lists' && <FlatList style={tw`mt-2 h-4/5`} data={favourites} alwaysBounceVertical={false} renderItem={({ item }) => (
                <Pressable onPress={() => handleOpen(item.idMeal)} style={tw`flex-row w-11/12 p-1 mx-auto my-2 bg-white rounded-xl`}>
                    <Image src={item.strMealThumb} style={tw`w-20 h-20 rounded-lg`} />
                    <View style={tw`justify-center w-3/4 ml-2`}>
                        <Text style={tw.style('text-purple-700', { fontFamily: 'Sora' })}>{item.strMeal}</Text>
                        {/* <Text style={tw`w-full`} numberOfLines={3}>{item.strDescription}</Text> */}
                    </View>
                </Pressable>
            )} keyExtractor={(item: any, index: any) => {
                return item.idMeal
            }} />}
            {/* {!completed && <Loader />} */}
            {/* {completed && failed && <View style={tw`absolute items-center justify-center w-full h-full`}>
                <View style={tw`w-2/5`}>
                    <Button onPress={fetchData} color={tw.color('purple-500')} title='Refresh' />
                </View>
            </View>} */}
        </View>
    )
}

export default Favourites