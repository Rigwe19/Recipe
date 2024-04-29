import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import tw from 'twrnc'

type Category = {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}
type Meal = {
    id: number;
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
}
type Props = {
    item: Category | Meal
    onOpen: CallableFunction;
    // type?: string
}

const RecipeGrid = ({ item, onOpen }: Props) => {
    return (
        <Pressable style={tw`items-center w-1/2 p-2 m-1 bg-white rounded-xl`} onPress={() => onOpen('idCategory' in item ? item.idCategory : item.id)}>
            <Image source={{ uri: 'idCategory' in item ? item.strCategoryThumb : item.strMealThumb }} style={tw.style('rounded-lg', { height: 150, width: 150, objectFit: 'contain' })} />
            <Text style={tw.style('', { fontFamily: 'Sora' })}>{'idCategory' in item ? item.strCategory : item.strMeal}</Text>
            <Text style={tw`w-full`} numberOfLines={3}>{'idCategory' in item ? item.strCategoryDescription : ''}</Text>
        </Pressable>
    )
}

export default RecipeGrid