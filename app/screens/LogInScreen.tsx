import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, Text, TextInput, View } from "react-native";
import { RootStackParamList } from "../navigation/StackNavigator";
import { useContext, useState } from "react";
import { container, headingTwo, inputLabel, logIn, logInLabel, textInput } from "../styles/styles";
import bcrypt from 'bcryptjs'
import { getCredentials } from "../../api";



type Props = NativeStackScreenProps<RootStackParamList, 'LogInScreen'>;

export default function LogInScreen ({ navigation }: Props) {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    function onLogin () {
        // getCredentials(userName).then(({password: hash}) => {
        //     return bcrypt.compare(password, hash).then((result) => {
        //         return result
        //         });

        // }).then((result) => {
        //     console.log(result)
        //     if (result) {
        //         navigation.navigate('ContactListScreen')
        //     }
        // }).catch((error)=>{
           
        // })
        navigation.navigate('ContactListScreen')

    }

return (
    <View className={container}>
        <Text className={headingTwo}>Kinnected</Text>
        <Text className={logInLabel}>Log in</Text>
        <TextInput className={textInput} placeholder='enter your username here'onChangeText={setUserName} value={userName} />

        <Text className={logInLabel}>Password</Text>
        <TextInput className={textInput} placeholder='enter your password here' onChangeText={setPassword} value={password} secureTextEntry={true} />

        <Pressable onPress={() => {console.log('I forgot me password')}} >
            <Text className='underline' >Forgotten Password</Text>
        </Pressable> 

        <Pressable className={logIn} onPress={onLogin} >
            <Text className='text-white'>Log In</Text>
        </Pressable>

        <Pressable className='mt-20'onPress={() => {navigation.navigate('SignUpScreen')}} >
            <Text className='underline'>Sign Up Here</Text>
        </Pressable>

    </View>
  );
}