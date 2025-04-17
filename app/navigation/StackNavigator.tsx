import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '../screens/LandingScreen';
import LogInScreen from '../screens/LogInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import TabNavigator from './TabNavigator';

import ContactListScreen from '../screens/ContactListScreen';
import ConnectAfterSignUp from '../screens/ConnectAfterSignUp';
import UserProfileScreen from '../screens/UserProfileScreen';
import ViewContactScreen from '../screens/ViewContactScreen';
import MessagingScreen from '../screens/MessagingScreen';

export type RootStackParamList = {
   // undefined means this screen takes no parameters when being navigated to
  // {} key-value means screen can take parameters of a specified type
  LandingScreen: undefined;
  LogInScreen: undefined;
  SignUpScreen: undefined;
  UserProfileScreen: undefined
  ContactListScreen: undefined
	ConnectAfterSignUp: undefined;
  ViewContactScreen: undefined;
  MessagingScreen: undefined;
  TabNavigator: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {

  return (
      <Stack.Navigator screenOptions={{headerShown: true}} initialRouteName="LandingScreen">
        <Stack.Screen name="LandingScreen" component={LandingScreen} />
        <Stack.Screen name="LogInScreen" component={LogInScreen} />
        <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
        {/* note: component, as a prop, refers to which screen the stack navigator points to, NOT UI components*/}
        <Stack.Screen name="ContactListScreen" component={ContactListScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name='ConnectAfterSignUp' component={ConnectAfterSignUp} />
        <Stack.Screen name="ViewContactScreen" component={ViewContactScreen} />
        <Stack.Screen name="MessagingScreen" component={MessagingScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
  );
}