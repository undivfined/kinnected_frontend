import * as React from 'react';
import StackNavigator from './app/navigation/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import "./global.css"

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
