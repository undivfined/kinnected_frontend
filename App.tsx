import * as React from 'react';
import StackNavigator from './app/navigation/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import "./global.css"
import { ImageProvider } from './app/context/ImageContext';
import { UserProvider } from './app/context/UserContext';

export default function App() {
  return (
    <GestureHandlerRootView>
    <UserProvider>
    <ImageProvider>
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
    </ImageProvider>
    </UserProvider>
    </GestureHandlerRootView>
  );
}
