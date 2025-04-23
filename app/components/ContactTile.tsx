
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";
import { Alert, Pressable, View } from "react-native";
import { styles } from "../styles/styles";
import ImageViewer from "./ImageViewer";
import { contact } from "../../types/databaseTypes";
import { Text } from "react-native";
import { convertMilliseconds } from "../utils/milliseconds-day";

const blankProfileImg = require('../../assets/freepik-basic-placeholder-profile-picture.png')
        


const getDaysSinceLastContact = (date_of_last_contact: string) => {

    const date1 = new Date(Date.now())
    const date2 = new Date(date_of_last_contact)

    return convertMilliseconds(Math.abs(date2.getTime() - date1.getTime()),'d');
}


export default function ContactTile({ contact } : { contact: contact  }) {


  const getTime = (timezone: string) => {
    const event = new Date(Date.now()); 
    const time = (event.toLocaleString("en-GB", { timeZone: timezone, hour: '2-digit', minute: '2-digit' })); 

    return time

  }

  const isWithinDaytimeHours = () => {
  const now = new Date();
  const hourString = now.toLocaleString(undefined, {
    timeZone: contact.timezone,
    hour: "2-digit",
    hour12: false,
  });

  const hour = parseInt(hourString, 10);
  return hour >= 8 && hour < 20;
  };

  const tileStyle = `border ${
  isWithinDaytimeHours() ? "border-green-500" : "border-red-500"
  } rounded-md w-[300px] bg-white`;

  

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if(contact.isCard) {
    return (
      <Pressable onPress={()=>  {  Alert.alert("Sorry", "This contact is not currently on the Kinnected app", [
                  {
                    text: "OK",
                    onPress: () => {
                      
                    },
                  },
                ]);
                } }> 
        <View className={styles.contactTile+ " " + tileStyle}>
            <View className={styles.contactInfo}>


              <Pressable onPress={()=>{navigation.navigate("ViewContactScreen", { contact })}} className={'items-center'}>

                <ImageViewer imgSource={blankProfileImg} selectedImage={contact.avatar_url} className={styles.contactTileImage} />

                <Text>{contact.name.split(' ')[0]}</Text>


              </Pressable>

            </View>
            
            <View className={styles.lastContacted}>
                <Text className="text-xs mb-3">Last Contacted</Text>
                <Text className='text-center'>
                {contact.date_of_last_contact ? getDaysSinceLastContact(contact.date_of_last_contact) ===  0 ? 'Today' :`${getDaysSinceLastContact(contact.date_of_last_contact)} days ago` : 'Not Contacted'}
                </Text>

            </View>

            <View className={styles.localTime}>
            <Text>{contact.timezone.split('/')[1].replace('_', ' ')}</Text>
              <Text>{getTime(contact.timezone)}</Text>
              <Text className={styles.contactTileRelationship}>{contact.type_of_relationship ? contact.type_of_relationship: 'Not set'}</Text>
            </View>

  
        </View>
       
    </Pressable>
    )
  }
    
  return (
    <Pressable onPress={()=>{navigation.navigate("MessagingScreen", {username: contact.username!})}}> 
        <View className={styles.contactTile+ " " + tileStyle}>
            <View className={styles.contactInfo}>


              <Pressable onPress={()=>{navigation.navigate("ViewContactScreen", { contact })}} className={'items-center'}>

                <ImageViewer imgSource={blankProfileImg} selectedImage={contact.avatar_url} className={styles.contactTileImage} />

                <Text>{contact.name.split(' ')[0]}</Text>


              </Pressable>

            </View>
            
            <View className={styles.lastContacted}>
                <Text className="text-xs mb-3">Last Contacted</Text>
                <Text className='text-center'>
                  {contact.date_of_last_contact ? getDaysSinceLastContact(contact.date_of_last_contact) ===  0 ? 'Today' :`${getDaysSinceLastContact(contact.date_of_last_contact)} days ago` : 'Not Contacted'}
                </Text>

            </View>

            <View className={styles.localTime}>
            <Text>{contact.timezone.split('/')[1].replace('_', ' ')}</Text>
              <Text>{getTime(contact.timezone)}</Text>
              <Text className={styles.contactTileRelationship}>{contact.type_of_relationship ? contact.type_of_relationship: 'Not Set'}</Text>
            </View>

  
        </View>
       
    </Pressable>
  );
}
