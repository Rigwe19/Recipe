import { View, Text, Image, Pressable, Platform } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import tw from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
// import img from '../../assets/startpage.png'


type Props = {
    navigation: any
}

const StartPage = (props: Props) => {
    function populate() {
        props.navigation.navigate('Home')
    }
    return (
        <SafeAreaView style={tw`h-full bg-gray-100`}>
            <View style={tw`items-center pt-8`}>
                <Text style={tw.style('text-5xl text-purple-700', { fontFamily: 'MadimiOne' })}>Recipe One</Text>
            </View>
            <View style={tw`justify-center mx-auto h-4/5`}>
                <Image source={require('../../assets/startpage.png')} style={{ objectFit: 'fill', height: 320, width: 320 }} />
            </View>

            <Pressable onPress={() => populate()} android_ripple={{ color: tw.color('purple-700') }} style={(pressed) => pressed && tw`items-center w-5/6 px-2 py-4 mx-auto bg-purple-800 rounded-2xl`}>
                <View>
                    <Text style={tw.style('text-white text-xl', { fontFamily: 'Sora' })}>Get Started</Text>
                </View>
            </Pressable>
        </SafeAreaView>
    )
}

export default StartPage