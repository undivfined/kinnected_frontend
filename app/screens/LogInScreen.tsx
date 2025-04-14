import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { RootStackParamList } from "../navigation/StackNavigator";
import { useState } from "react";



type Props = NativeStackScreenProps<RootStackParamList, 'LogInScreen'>;

export default function LogInScreen ({ navigation }: Props) {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

return (
    <View style={styles.container}>
        <Text style={styles.title}>Kinnected</Text>
        <TextInput style={styles.userNameInput} onChangeText={setUserName} value={userName} />
        <TextInput style={styles.passwordInput} onChangeText={setPassword} value={password}/>
        <Pressable onPress={() => {console.log('I forgot me password')}} >
            <Text style={styles.forgottenPasswordText}  >Forgotten Password</Text>
        </Pressable> 

        <Pressable style={styles.logIn} onPress={() => {console.log('some sort of login thing')}} >
            <Text style={styles.logInText}>Log In</Text>
        </Pressable>

        <Pressable style={styles.signUp} onPress={() => {navigation.navigate('SignUpScreen')}} >
            <Text style={styles.signUpText}>Sign Up Here</Text>
        </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:0,
    },
    title : {  
        paddingBottom:50,
        fontSize: 30,
        fontWeight: 'bold'
    },
    userNameInput: {
        width: '80%',
        borderColor: 'black',
        fontSize: 15,
        borderWidth:2,
        borderRadius: 8,
        marginBottom: 20,
        color: 'black',
    },
    passwordInput: {
        width: '80%',
        borderColor: 'black',
        borderWidth:2,
        borderRadius: 8,
        marginBottom: 10,
    },
    forgottenPasswordText: {
        textDecorationLine:'underline',
        marginBottom: 30,

    },
    logIn: {
        backgroundColor: 'red',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    logInText: {
        color: 'white',
    },
    signUp: {
        paddingTop: 100,
    },
    signUpText: {
        textDecorationLine:'underline',
    }

})