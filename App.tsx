import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { RecoilRoot } from 'recoil';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import StartPage from './app/screens/StartPage';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'MadimiOne': require('./assets/fonts/MadimiOne.ttf'),
    'Sora': require('./assets/fonts/Sora.ttf')
  });
  const onLayoutRootView = useCallback(
    async () => {
      if (fontsLoaded || fontError) {
        await SplashScreen.hideAsync();
      }
    },
    [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  const Stack = createNativeStackNavigator();
  return (
    <RecoilRoot>
      <NavigationContainer onLayout={onLayoutRootView}>
        <Stack.Navigator style={styles.container} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Homes" component={StartPage} />
          {/* <Stack.Screen name="Todo" component={Todo} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="MainLogin" component={MainLogin} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
