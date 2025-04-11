import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import SignUpScreen from '../screens/SignUpScreen';
import TabNavigator from './TabNavigator';

export type RootStackParamList = {
  Home: undefined;
  MyProfileScreen: undefined;
  SignUpScreen: undefined;
  TabNavigator: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Welcome'}}/>
        {/* note: component, as a prop, refers to which screen the stack navigator points to, NOT UI components*/}
        <Stack.Screen name="MyProfileScreen" component={MyProfileScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
  );
}