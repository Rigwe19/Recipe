import { View, Text, Pressable, Image } from 'react-native'
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
    onOpen: CallableFunction
}

const RecipeList = ({ item, onOpen }: Props) => {
    return (
        <Pressable onPress={() => onOpen('idCategory' in item ? item.idCategory : item.id)} style={tw`flex-row w-11/12 p-1 mx-auto my-2 bg-white rounded-xl`}>
            <Image source={{ uri: 'idCategory' in item ? item.strCategoryThumb : item.strMealThumb }} style={tw`w-20 h-20 rounded-lg`} />
            <View style={tw`justify-center w-3/4 ml-2`}>
                <Text style={tw.style('text-purple-700', { fontFamily: 'Sora' })}>{'idCategory' in item ? item.strCategory : item.strMeal}</Text>
                {'idCategory' in item && <Text style={tw`w-full`} numberOfLines={3}>{'idCategory' in item ? item.strCategoryDescription : ''}</Text>}
            </View>
        </Pressable>
    )
}

export default RecipeList