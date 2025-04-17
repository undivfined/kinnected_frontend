import * as React from 'react';
import StackNavigator from './app/navigation/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import "./global.css"
import { ImageProvider } from './app/context/ImageContext';
import { UserProvider } from './app/context/UserContext';

export default function App() {
  return (
    <UserProvider>
    <ImageProvider>
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
    </ImageProvider>
    </UserProvider>
  );
}
