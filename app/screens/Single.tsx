import { View, Text, Image, ScrollView, Button, Pressable } from 'react-native'
import React, { Children, useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useFocusEffect } from '@react-navigation/native'
import Loader from '../components/Loader'
import tw from 'twrnc'
import axios from 'axios'
import countries from '../data/countries'
import { useRecoilState } from 'recoil'
import { favouriteAtom } from '../data/favourite'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import * as Animatable from 'react-native-animatable';

type Props = {
    navigation: any,
    route: any
}
interface Meal {
    idMeal: number;
    strMeal: string;
    strDrinkAlternate: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags: string;
    strYoutube: string;
    strIngredient1: string;
    strIngredient2: string;
    strIngredient3: string;
    strIngredient4: string;
    strIngredient5: string;
    strIngredient6: string;
    strIngredient7: string;
    strIngredient8: string;
    strIngredient9: string;
    strIngredient10: string;
    strIngredient11: string;
    strIngredient12: string;
    strIngredient13: string;
    strIngredient14: string;
    strIngredient15: string;
    strIngredient16: string;
    strIngredient17: string;
    strIngredient18: string;
    strIngredient19: string;
    strIngredient20: string;
    strMeasure1: string;
    strMeasure2: string;
    strMeasure3: string;
    strMeasure4: string;
    strMeasure5: string;
    strMeasure6: string;
    strMeasure7: string;
    strMeasure8: string;
    strMeasure9: string;
    strMeasure10: string;
    strMeasure11: string;
    strMeasure12: string;
    strMeasure13: string;
    strMeasure14: string;
    strMeasure15: string;
    strMeasure16: string;
    strMeasure17: string;
    strMeasure18: string;
    strMeasure19: string;
    strMeasure20: string;
    strSource: string;
    strImageSource: string;
    strCreativeCommonsConfirmed: string;
    dateModified: string
}
const Single = ({ navigation, route }: Props) => {
    const [meal, setMeal] = useState<Meal>()
    const [completed, setCompleted] = useState(false)
    const [failed, setFailed] = useState(false)
    const [ingredient, setIngredient] = useState<{ ingredient: string; measure: string; }[]>([])
    const title = route.params.name;
    const id = route.params.id;
    const [code, setCode] = useState<string | undefined>('NG')
    const [double, setDouble] = useState(false);
    const [favourites, setFavourites] = useRecoilState<{ strMeal: string; strMealThumb: string; idMeal: number }[]>(favouriteAtom);
    // const tap = Gesture
    const fetchData = async () => {
        axios({
            method: 'get',
            url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
        }).then((response) => {
            let ing: { ingredient: string; measure: string; }[] = [];
            for (let i = 1; i < 21; i++) {
                if (response.data.meals[0][`strIngredient${i}`]) {
                    ing.push({
                        ingredient: response.data.meals[0][`strIngredient${i}`],
                        measure: response.data.meals[0][`strMeasure${i}`],
                        // image: 'https://themealdb.com/images/ingredients/' + response.data.meals[0][`strIngredient${i}`] + '-Small.png'
                    });
                }

            }
            // console.log(ing)
            setIngredient(ing);
            setMeal(response.data.meals[0]);
            setCode(countries.find(val => val.country === response.data.meals[0].strArea)?.code)

        }).catch(error => {
            setFailed(true);
        }).finally(() => {
            setCompleted(true)
        });
    };
    useFocusEffect(
        React.useCallback(() => {
            fetchData();
            navigation.setOptions({
                title: title
            })
            return () => { };
        }, [])
    );
    useEffect(() => {
        setTimeout(() => {
            if (double)
                setDouble(false);
        }, 1000);
    }, [double]);
    const doubleTap = Gesture.Tap()
        .maxDuration(250)
        .numberOfTaps(2)
        .onStart(() => {
            setFavourites(pv => ([...pv, { idMeal: id, strMeal: title, strMealThumb: meal!.strMealThumb }]))
            setDouble(true)
            console.log('Double tap!');
        });

    return (
        <View style={tw`relative w-full h-full`}>
            {completed && meal && <ScrollView>
                <View style={tw`relative w-11/12 mx-auto mt-2 h-60`}>
                    <GestureHandlerRootView  >
                        <GestureDetector gesture={doubleTap}>
                            <Image style={tw`w-full h-full rounded-t-md`} alt={code} source={{ uri: meal?.strMealThumb }} />
                        </GestureDetector>
                    </GestureHandlerRootView>
                    {double && <View style={tw`absolute items-center justify-center w-full h-full`}>
                        <Animatable.Image
                            animation="zoomIn" source={require('../../assets/loader.png')}
                            easing="ease-out"
                            style={tw`w-16 h-16`}
                            iterationCount="infinite">
                        </Animatable.Image>
                    </View>}
                </View>
                <View style={tw`flex-row items-center justify-around my-2`}>
                    <Text style={{ fontFamily: 'Sora' }}>{meal?.strCategory}</Text>
                    {/* <Text>{code}</Text> */}
                    <Text style={{ fontFamily: 'Sora' }}>{meal?.strTags ?? 'No Tags'}</Text>
                    <Image source={{ uri: `https://flagsapi.com/${code}/flat/32.png` }} style={tw`w-8 h-8`} />
                </View>
                <View style={tw`px-2`}>
                    <Text style={tw.style('text-2xl font-bold text-purple-700', { fontFamily: 'MadimiOne' })}>Instructions</Text>
                    <Text style={tw.style(`leading-6`, { fontFamily: 'Sora' })}>{meal?.strInstructions}</Text>
                </View>
                <View style={tw`px-2 my-2`}>
                    <Text style={tw.style('text-2xl font-bold text-purple-700', { fontFamily: 'MadimiOne' })}>Ingredients</Text>
                    {Children.toArray(ingredient.map((value, index) => <View style={tw`flex-row items-center w-11/12 px-2 py-4 mx-auto my-1 bg-white border-b-4 border-purple-300 rounded-xl`}>
                        <View style={tw`w-1/6`}>
                            <Image src={`https://themealdb.com/images/ingredients/${value.ingredient}-Small.png`} style={tw`w-8 h-8`} />
                        </View>

                        {/* <Text>{index + 1}</Text> */}
                        <View style={tw`flex-row justify-between w-5/6`}>
                            <Text style={tw.style(``, { fontFamily: 'Sora' })}>{value.ingredient}</Text>
                            <Text style={tw.style(`font-bold`, { fontFamily: 'Sora' })}>{value.measure}</Text>
                        </View>
                    </View>))}
                </View>
            </ScrollView>}
            {/* <Text>{JSON.stringify(meal, null, 2)}</Text> */}

            {!completed && !meal && <Loader />}
            {completed && failed && <View style={tw`absolute items-center justify-center w-full h-full`}>
                <View style={tw`w-2/5`}>
                    <Button onPress={fetchData} color={tw.color('purple-500')} title='Refresh' />
                </View>
            </View>}
        </View>
    )
}

export default Single