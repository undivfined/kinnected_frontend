
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";
import { Pressable, View } from "react-native";
import {
  contactInfo,
  contactTile,
  lastContacted,
  localTime,
} from "../styles/styles";
import ImageViewer from "./ImageViewer";
import { contact } from "../../types/databaseTypes";
import { Text } from "react-native";

const blankProfileImg = require('../../assets/freepik-basic-placeholder-profile-picture.png')
        


const getTime = (timezone: string) => {
    const event = new Date(Date.now()); 
    const time = (event.toLocaleString("en-GB", { timeZone: timezone })); 

    return time

}


export default function ContactTile({ contact } : { contact: contact  }) {
  
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    
    return (
      
    <Pressable onPress={()=>{navigation.navigate("MessagingScreen")}}>
        <View className={contactTile}>
            <View className={contactInfo}>
              <Pressable onPress={()=>{navigation.navigate("ViewContactScreen")}}>
                <ImageViewer imgSource={blankProfileImg} className={contactInfo} />
                <Text>{contact.name}</Text>
              </Pressable>
            </View>
            <View className={lastContacted}>
                <Text>Last Contacted</Text>
                <Text>{contact.date_of_last_contact ? (new Date(contact.date_of_last_contact )).toLocaleDateString() : 'unknown'
                }</Text>
                </View>
            <View className={localTime}><Text>{getTime(contact.timezone)}</Text></View>

  
        </View>
        <View className={lastContacted}></View>
        <View className={localTime}></View>
    </Pressable>
  );
}
