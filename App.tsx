import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { RecoilRoot } from 'recoil';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import StartPage from './app/screens/StartPage';
import List from './app/screens/Category/List';
import IngredientList from './app/screens/Ingredient/List';
import FavouriteList from './app/screens/Favourite/List';
import tw from 'twrnc'
import Single from './app/screens/Single';
import Category from './app/screens/Category/Category';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ingredients from './app/screens/Ingredient/Ingredients';
import ReactNativeRecoilPersist, {
  ReactNativeRecoilPersistGate,
} from "react-native-recoil-persist";
import Favourites from './app/screens/Favourite/Favourites';

const Tab = createBottomTabNavigator();
function Tabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Category" component={Category} />
      <Tab.Screen name="Ingredients" component={Ingredients} />
      <Tab.Screen name="Favourites" component={Favourites} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'MadimiOne': require('./assets/fonts/MadimiOne.ttf'),
    'Sora': require('./assets/fonts/Sora.ttf')
  });


  const lay = async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }
  useLayoutEffect(() => {
    lay(),
      [fontsLoaded, fontError]
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  const Stack = createNativeStackNavigator();
  return (
    <RecoilRoot>
      <ReactNativeRecoilPersistGate store={ReactNativeRecoilPersist}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: true, headerTintColor: tw.color('purple-500'), statusBarColor: tw.color('purple-500') }}>
            <Stack.Screen options={{ headerShown: false }} name="Tabs" component={Tabs} />
            <Stack.Screen name="Homes" component={StartPage} options={{ headerShown: false }} />
            <Stack.Screen name="CategoryLists" component={List} />
            <Stack.Screen name="IngredientLists" component={IngredientList} />
            <Stack.Screen name="FavouriteLists" component={FavouriteList} />
            <Stack.Screen name="Single" component={Single} />
            <Stack.Screen name="Home" component={Category} />
          </Stack.Navigator>
        </NavigationContainer>
      </ReactNativeRecoilPersistGate>
    </RecoilRoot>
  );
}
