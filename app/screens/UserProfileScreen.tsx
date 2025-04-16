import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, StyleSheet, Pressable, Text, Button, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../navigation/StackNavigator';
import { useState } from 'react';
import ImageViewer from '../components/ImageViewer';
import pickImage from "../utils/pickImage"
import { headingTwo } from '../styles/styles';
const PlaceholderImage = require("../../assets/freepik-basic-placeholder-profile-picture.png");


type Props = NativeStackScreenProps<RootStackParamList, 'SignUpScreen'>;

export default function SignUpScreen({ navigation } : Props) {
  const [selectedImage, setSelectedImage] = useState<"string" | undefined>(undefined)

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}   >
          
          <Text className={headingTwo}>Sign Up</Text>

          <View style={styles.imageContainer}>
            <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage}/>
          </View>

            <View style={styles.buttonWrapper}>
              <Button title="Choose a photo" color="#2196F3" onPress={pickImage}/>
            </View>

          <View style={styles.formContainer}>
            <Text>UserName</Text>
            <TextInput className='textInput' placeholder='Username'/>
            <TextInput style={styles.input} placeholder='Password'/>
            <TextInput style={styles.input} placeholder='Full name'/>
            <TextInput style={styles.input} placeholder='Date of birth'/>

              <View style={styles.pickerWrapper}>
              </View>

              <View style={styles.pickerWrapper}>
               
              </View>
          </View>


          <Pressable style={styles.signUpButton} onPress={() => {navigation.navigate('LogInScreen')}}>
            <Text style={styles.signUpButtonLabel}>Create Account</Text>
          </Pressable>

          <Pressable style={styles.loginButton} onPress={() => {navigation.navigate('LogInScreen')}}>
            <Text style={styles.loginButtonLabel}>Already have an account? Login</Text>
          </Pressable>

        </ScrollView>
      );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: 'red',
        borderWidth: 2,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft:0,
    },

    containerStyle: {
        width: 200,
        marginHorizontal: 50,
        marginVertical: 10,
    },

    
    scrollContainer: {
      alignItems: 'center',
      paddingVertical: 40,
      backgroundColor: 'white',
    },
    
    formContainer: {
      width: '100%',
      alignItems: 'center',
      marginTop: 20,
    },
    
    imageContainer: {
      flex: 1,
      paddingTop: 28,
    },
    
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },
    
    buttonLabel: {
      color: 'black',
      fontSize: 16,
    },

    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginTop: 80,
      textAlign: 'center',
      color: 'black',
    },
    
    
    loginButton: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    
    loginButtonLabel: {
      color: 'black',
      fontSize: 16,
      textDecorationLine: 'underline',
      marginTop: 20
    },

    signUpButton: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
      backgroundColor: "black",
      width: 180
    },
    
    signUpButtonLabel: {
      color: 'white',
      fontSize: 16,
    },

    photoButton: {
      flex: 1 / 3,
      alignItems: 'center',
      marginTop: 20,
      borderWidth: 1,
      borderColor: "transparent",
      padding: 7,
      borderRadius: 5,
    },

    buttonWrapper: {
      borderRadius: 5,
      borderWidth: 2,
      borderColor: "#2196F3",
      overflow: 'hidden',
      margin: 10,
    },
    
    photoButtonLabel:{
      color: "white",
      fontSize: 14,
    },
    
    input: {
      width: 280,
      height: 45,
      margin: 15,
      padding: 10,
      borderRadius: 5,
      borderWidth: 1.5,
    },
    
    pickerWrapper: {
      width: 280,
      height: 45,
      margin: 15,
      paddingHorizontal: 10,
      borderWidth: 1.5,
      borderRadius: 5,
      justifyContent: 'center',
      overflow: "hidden"
    },
    
    picker: {
      flex: 1,
      color: 'black',
    },
    
  });