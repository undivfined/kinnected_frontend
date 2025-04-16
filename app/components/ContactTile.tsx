import { Image, Text, View } from "react-native";
import { contactInfo, contactTile, lastContacted, localTime } from "../styles/styles";
import ImageViewer from "./ImageViewer";
import { contact } from "../../types/databaseTypes";

const blankProfileImg = require('../../assets/freepik-basic-placeholder-profile-picture.png')

const getTime = (timezone: string) => {
    const event = new Date(Date.now()); 
    const time = (event.toLocaleString("en-GB", { timeZone: timezone })); 

    return time

}


export default function ContactTile({ contact } : { contact: contact  }) {
    
    return (
        <View className={contactTile}>
            <View className={contactInfo}><Text>{contact.name}</Text></View>
            <View className={lastContacted}>
                <Text>Last Contacted</Text>
                <Text>{contact.date_of_last_contact ? (new Date(contact.date_of_last_contact )).toLocaleDateString() : 'unknown'
                }</Text>
                </View>
            <View className={localTime}><Text>{getTime(contact.timezone)}</Text></View>
        </View>
);
}