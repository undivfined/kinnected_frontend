import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingPage from '../screens/LandingPage';
import HomeScreen from '../screens/HomeScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import SignUpScreen from '../screens/SignUpScreen';
import TabNavigator from './TabNavigator';

export type RootStackParamList = {
  LandingPage: undefined;
  LogInPage: undefined;
  Home: undefined;
  // undefined means this screen takes no parameters when being navigated to
  MyProfileScreen: { itemId: number };
  // {} key-value means screen can take parameters of a specified type
  SignUpScreen: undefined;
  TabNavigator: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="LandingPage">
        <Stack.Screen name="LandingPage" component={LandingPage} />
        {/* note: component, as a prop, refers to which screen the stack navigator points to, NOT UI components*/}
        <Stack.Screen name="MyProfileScreen" component={MyProfileScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
  );
}