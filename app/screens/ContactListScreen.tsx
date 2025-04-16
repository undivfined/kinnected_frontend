import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";
import { ScrollView, Text, View, TextInput } from "react-native";
import { contactsContainer, container, headingThree,  inputLabel, profileImage, textInput, userContainer } from "../styles/styles";
import { Profiler, useState } from "react";
import ImageViewer from "../components/ImageViewer";
import ContactTile from "../components/ContactTile";
const blankProfileImg = require('../../assets/freepik-basic-placeholder-profile-picture.png')

type Props = NativeStackScreenProps<RootStackParamList, 'ContactListScreen'>;

export default function ContactListScreen({ navigation } : Props) {
    const [userName, setUserName] = useState("Chantelle")
    const [selectedImage, setSelectedImage] = useState<"string" | undefined>(undefined)


    return (
      
        <ScrollView>
            
            <View className={contactsContainer}>

                <View className={profileImage}><ImageViewer imgSource={blankProfileImg} selectedImage={selectedImage} className={profileImage}/></View>
                
                <Text className={headingThree}>{`${userName}`}</Text>
                <Text className={headingThree}>Your Kinnections List</Text>

                <ContactTile/>
                <ContactTile/>
                <ContactTile/>
                <ContactTile/>
                <ContactTile/>
                <ContactTile/>
                <ContactTile/>

            
            </View>
        </ScrollView>
        
    )
}   