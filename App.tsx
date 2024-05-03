import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { RecoilRoot } from 'recoil';
import { useLayoutEffect } from 'react';
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
import Ionicons from '@expo/vector-icons/Ionicons';
import Search from './app/screens/Search/Search';

const Tab = createBottomTabNavigator();
function Tabs() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false, tabBarActiveTintColor: tw.color('purple-700'),
      tabBarLabelStyle: tw.style('text-[14px]', { fontFamily: 'Sora' }),
      tabBarStyle: tw.style('bg-gray-200 h-14 shadow-md border-t border-purple-400')
    }}>
      <Tab.Screen name="Category" component={Category} options={{
        tabBarLabel: 'Categories',
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons name="apps" color={focused ? tw.color('purple-700') : tw.color('gray-500')} size={size} />
        ),
      }} />
      <Tab.Screen name="Ingredients" component={Ingredients} options={{
        // tabBarLabel: 'Ingredients',
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons name="nutrition" color={focused ? tw.color('purple-700') : tw.color('gray-500')} size={size} />
        ),
      }} />
      <Tab.Screen name="Favourites" component={Favourites} options={{
        // tabBarLabel: 'Favourites',
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons name="heart" color={focused ? tw.color('purple-700') : tw.color('gray-500')} size={size} />
        ),
      }} />
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
            <Stack.Screen name="Tabs" options={{ headerShown: false }} component={Tabs} />
            <Stack.Screen name="Homes" component={StartPage} options={{ headerShown: false }} />
            <Stack.Screen name="CategoryLists" component={List} />
            <Stack.Screen name="IngredientLists" component={IngredientList} />
            <Stack.Screen name="FavouriteLists" component={FavouriteList} />
            <Stack.Screen name="Single" component={Single} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Home" component={Category} />
          </Stack.Navigator>
        </NavigationContainer>
      </ReactNativeRecoilPersistGate>
    </RecoilRoot>
  );
}
