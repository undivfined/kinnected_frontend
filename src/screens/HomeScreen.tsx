import { View, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Sign Up" onPress={() => navigation.navigate('SignUpScreen')} />
      <Button title="Go to My Profile Screen" onPress={() => navigation.navigate('MyProfileScreen')} />
    </View>
  );
}