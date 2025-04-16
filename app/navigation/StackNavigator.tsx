import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '../screens/LandingScreen';
import LogInScreen from '../screens/LogInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import TabNavigator from './TabNavigator';
import ContactListScreen from '../screens/ContactListScreen';

export type RootStackParamList = {
   // undefined means this screen takes no parameters when being navigated to
  // {} key-value means screen can take parameters of a specified type
  LandingScreen: undefined;
  LogInScreen: undefined;
  SignUpScreen: undefined;
  ContactListScreen: undefined 
  TabNavigator: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="LandingScreen">
        <Stack.Screen name="LandingScreen" component={LandingScreen} />
        <Stack.Screen name="LogInScreen" component={LogInScreen} />

        {/* note: component, as a prop, refers to which screen the stack navigator points to, NOT UI components*/}
        <Stack.Screen name="ContactListScreen" component={ContactListScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
  );
}