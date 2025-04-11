import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AddConnection from '../components/AddConnection';
import DeleteConnection from '../components/DeleteConnection';

export type RootTabParamList = {
    AddConnection: undefined;
    DeleteConnection: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="AddConnection" component={AddConnection}/>
                {/* note: component, as a prop, refers to which screen the stack navigator points to, NOT UI components*/}
        <Tab.Screen name="DeleteConnection" component={DeleteConnection} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}