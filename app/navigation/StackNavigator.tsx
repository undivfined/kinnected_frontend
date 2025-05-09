import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "../screens/LandingScreen";
import LogInScreen from "../screens/LogInScreen";
import SignUpScreen from "../screens/SignUpScreen";

import ContactListScreen from "../screens/ContactListScreen";
import ConnectAfterSignUp from "../screens/ConnectAfterSignUp";
import UserProfileScreen from "../screens/UserProfileScreen";
import ViewContactScreen from "../screens/ViewContactScreen";
// import MessagingScreen from "../screens/MessagingScreen";
import { contact, User } from "../../types/databaseTypes";
import SearchedUserScreen from "../screens/SearchedUserScreen";
import CreateCardScreen from "../screens/CreateCardScreen";
import EditConnectionScreen from "../screens/EditConnectionScreen";
import EditCardScreen from "../screens/EditCardScreen";

export type RootStackParamList = {
  // undefined means this screen takes no parameters when being navigated to
  // {} key-value means screen can take parameters of a specified type
  LandingScreen: undefined;
  LogInScreen: undefined;
  SignUpScreen: undefined;
  UserProfileScreen: undefined;
  ContactListScreen: undefined;
  ConnectAfterSignUp: undefined;
  ViewContactScreen: { contact: contact };
  MessagingScreen: { username: string };

  SearchedProfileScreen: undefined;
  CreateCardScreen: undefined;
  SearchedUserScreen: { user: User };
  EditConnectionScreen: { contact: contact };
  EditCardScreen: { contact: contact };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true, headerTitle: "Kinnected" }}
      initialRouteName="LandingScreen"
    >
      <Stack.Screen name="LandingScreen" component={LandingScreen} />
      <Stack.Screen name="LogInScreen" component={LogInScreen} />
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
      <Stack.Screen name="ContactListScreen" component={ContactListScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="ConnectAfterSignUp" component={ConnectAfterSignUp} />
      <Stack.Screen name="ViewContactScreen" component={ViewContactScreen} />
      {/* <Stack.Screen name="MessagingScreen" component={MessagingScreen} /> */}
      <Stack.Screen name="SearchedUserScreen" component={SearchedUserScreen} />
      <Stack.Screen name="CreateCardScreen" component={CreateCardScreen} />
      <Stack.Screen
        name="EditConnectionScreen"
        component={EditConnectionScreen}
      />
      <Stack.Screen name="EditCardScreen" component={EditCardScreen} />
    </Stack.Navigator>
  );
}
