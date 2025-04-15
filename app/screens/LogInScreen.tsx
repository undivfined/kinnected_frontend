import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { RootStackParamList } from "../navigation/StackNavigator";
import { useState } from "react";
import { container, headingTwo, inputLabel, logIn, logInLabel, textInput } from "../styles/styles";



type Props = NativeStackScreenProps<RootStackParamList, 'LogInScreen'>;

export default function LogInScreen ({ navigation }: Props) {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

return (
    <View className={container}>
        <Text className={headingTwo}>Kinnected</Text>
        <Text className={logInLabel}>Log in</Text>
        <TextInput className={textInput} placeholder='enter your username here'onChangeText={setUserName} value={userName} />

        <Text className={logInLabel}>Password</Text>
        <TextInput className={textInput} placeholder='enter your password here' onChangeText={setPassword} value={password}/>

        <Pressable onPress={() => {console.log('I forgot me password')}} >
            <Text className='underline' >Forgotten Password</Text>
        </Pressable> 

        <Pressable className={logIn} onPress={() => {console.log('some sort of login thing')}} >
            <Text className='text-white'>Log In</Text>
        </Pressable>

        <Pressable className='mt-20'onPress={() => {navigation.navigate('SignUpScreen')}} >
            <Text className='underline'>Sign Up Here</Text>
        </Pressable>

    </View>
  );
}