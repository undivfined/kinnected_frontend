import * as React from 'react';
import StackNavigator from './src/navigation/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigation/TabsNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
      <TabNavigator />
      </NavigationContainer>
  );
}
