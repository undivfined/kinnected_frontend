
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { RootStackParamList } from '../navigation/StackNavigator';



type Props = NativeStackScreenProps<RootStackParamList, 'LandingScreen'>;

export default function LandingScreen({ navigation } : Props)  {
    return (
        <View className='center'>
            <Text className='text-lg font-bold pb-4'>Kinnected</Text>
            <Pressable className='w-40 h-40 bg-gray-400 rounded-full items-center justify-center' onPress={() => {navigation.navigate('LogInScreen')}}>

                <Text className='text-white font-bold'>Enter</Text>

            </Pressable>

        </View>
      );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         borderColor: 'red',
//         borderWidth: 2,
//         backgroundColor: 'white',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginLeft:0,
//     },

//     containerStyle: {
//         width: 200,
//         marginHorizontal: 50,
//         marginVertical: 10,
//     },

//     button: {
//       borderRadius: '50%',
//       borderColor: 'red',
//       borderWidth: 2,
//       alignItems: 'center',
//       justifyContent: 'center',
//       flexDirection: 'row'
//     },
    
//     buttonLabel: {
//       color: 'black',
//       fontSize: 16,
//     },
//   });