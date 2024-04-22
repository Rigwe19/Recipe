import { View, Text, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import img from '../../assets/startpage.png'

type Props = {}

const StartPage = (props: Props) => {
    return (
        <View style={tw`bg-gray-900 pt-10 mx-auto h-4/5 justify-center`}>
            <Image source={img} style={tw.style('w-full h-full', { objectFit: 'contain' })} />
        </View>
    )
}

export default StartPage