import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../src/screens/Auth/SplashScreen';
import HomeScreen from '../src/screens/Home/HomeScreen';
import {RootStackParamList} from '../src/types/types';
import WebViewScreen from '../src/screens/Webview';

const Stack = createNativeStackNavigator<RootStackParamList>();

const BLACK = '#000';

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        animation: 'simple_push',
      }}>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WebView"
        component={WebViewScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
