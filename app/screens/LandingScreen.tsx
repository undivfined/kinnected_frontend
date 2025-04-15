
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Pressable, Text } from 'react-native';
import { RootStackParamList } from '../navigation/StackNavigator';
import { container, enterBorder, enterPressable, headingOne, strapLine } from '../styles/styles';



type Props = NativeStackScreenProps<RootStackParamList, 'LandingScreen'>;

export default function LandingScreen({ navigation } : Props)  {
    return (
        <View className={container} >
            <Text className={headingOne}>Kinnected</Text>
            <View className={enterBorder}>
                <Pressable className={enterPressable} onPress={() => {navigation.navigate('LogInScreen')}}>
                    <Text className='text-white font-bold'>Enter</Text>
                </Pressable>
            </View>
            <Text className={strapLine}>I am an app</Text>
        </View>
      );
}
