
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { RootStackParamList } from '../navigation/StackNavigator';



type Props = NativeStackScreenProps<RootStackParamList, 'LandingPage'>;

export default function LandingPage({ navigation } : Props)  {
    return (
        <View style={styles.container}>
            <Text>Kinnected</Text>
            <Pressable style={styles.button} onPress={() => {navigation.navigate('LogInPage')}}>

                <Text style={styles.buttonLabel}>Enter</Text>

            </Pressable>

        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: 'red',
        borderWidth: 2,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:0,
    },

    containerStyle: {
        width: 200,
        marginHorizontal: 50,
        marginVertical: 10,
    },

    button: {
      borderRadius: '50%',
      borderColor: 'red',
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },
    
    buttonLabel: {
      color: 'black',
      fontSize: 16,
    },
  });