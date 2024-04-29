import { View, Text, Animated, Easing, Image } from 'react-native'
import React, { useEffect, useRef } from 'react'
import tw from 'twrnc'
import * as Animatable from 'react-native-animatable';

type Props = {
}

const Loader = ({ }: Props) => {
    return (
        <View style={tw`absolute items-center justify-center w-full h-full bg-white/45`} accessibilityRole='progressbar'>
            {/* <Animated.Image source={require('../../assets/loader.png')} style={{
                transform: [{
                    // scale:
                    rotateZ: rotationDegree.interpolate({
                        inputRange: [0, 360],
                        outputRange: ['0deg', '360deg']
                    })
                }]
            }} /> */}
            <Animatable.Image
                animation="rubberBand" source={require('../../assets/loader.png')}
                easing="ease-out"
                style={tw`w-10 h-10`}
                iterationCount="infinite">
            </Animatable.Image>
        </View>
    )
}

export default Loader