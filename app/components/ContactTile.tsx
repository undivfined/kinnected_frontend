
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";
import { Pressable, View } from "react-native";
import {
  contactInfo,
  contactTile,
  contactTileImage,
  lastContacted,
  localTime,
} from "../styles/styles";
import ImageViewer from "./ImageViewer";
import { contact } from "../../types/databaseTypes";
import { Text } from "react-native";
import { convertMilliseconds } from "../utils/milliseconds-day";

const blankProfileImg = require('../../assets/freepik-basic-placeholder-profile-picture.png')
        
console.log(blankProfileImg, 'blank')

const getTime = (timezone: string) => {
    const event = new Date(Date.now()); 
    const time = (event.toLocaleString("en-GB", { timeZone: timezone, hour: '2-digit', minute: '2-digit' })); 

    return time

}

const getDaysSinceLastContact = (date_of_last_contact: string) => {

    const date1 = new Date(Date.now())
    const date2 = new Date(date_of_last_contact)

    return convertMilliseconds(Math.abs(date2.getTime() - date1.getTime()),'d');
}


export default function ContactTile({ contact } : { contact: contact  }) {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    
    return (
      
    <Pressable onPress={()=>{navigation.navigate("MessagingScreen")}}>
        <View className={contactTile}>
            <View className={contactInfo}>


              <Pressable onPress={()=>{navigation.navigate("ViewContactScreen")}}>

                <ImageViewer imgSource={blankProfileImg} selectedImage={contact.avatar_url} className={contactTileImage} />

                <Text>{contact.name.split(' ')[0]}</Text>


              </Pressable>

            </View>
            
            <View className={lastContacted}>
                <Text className="">Contacted</Text>
                <Text>
                  {contact.date_of_last_contact ? `${getDaysSinceLastContact(contact.date_of_last_contact)} days ago` : 'Not Contacted'}
                </Text>

            </View>

            <View className={localTime}>
              <Text>{getTime(contact.timezone)}</Text>
              <Text>{contact.timezone.split('/')[1]}</Text>
            </View>

  
        </View>
       
    </Pressable>
  );
}
