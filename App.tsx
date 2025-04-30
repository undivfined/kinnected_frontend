import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as React from "react";
import StackNavigator from "./app/navigation/StackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import "./global.css";

import { UserProvider } from "./app/context/UserContext";

export default function App() {
  return (
    <GestureHandlerRootView>
      <UserProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </UserProvider>
    </GestureHandlerRootView>
  );
}
