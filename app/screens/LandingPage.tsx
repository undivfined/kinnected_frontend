
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { RootStackParamList } from '../navigation/StackNavigator';



type Props = NativeStackScreenProps<RootStackParamList, 'LandingPage'>;

export default function LandingPage({ navigation } : Props)  {
    return (
        <View style={styles.containerStyle}>
            <Text>Kinnected</Text>
            <Pressable style={styles.button} onPress={() => {navigation.navigate('LogInPage')}}>

                <Text style={styles.buttonLabel}>Enter</Text>

            </Pressable>

        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      borderColor: 'red',
      borderWidth: 2,
      backgroundColor: 'white',
      width: '100%',
      height: '100%',
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
      width: '25%',
      height: '25%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    
    buttonLabel: {
      color: 'black',
      fontSize: 16,
    },
  });