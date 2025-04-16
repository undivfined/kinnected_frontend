import { Image, View } from "react-native";
import { contactInfo, contactTile, lastContacted, localTime } from "../styles/styles";
import ImageViewer from "./ImageViewer";

const blankProfileImg = require('../../assets/freepik-basic-placeholder-profile-picture.png')



export default function ContactTile() {
    
    return (
        <View className={contactTile}>
            <View className={contactInfo}><ImageViewer imgSource={blankProfileImg} className={contactInfo}/></View>
            <View className={lastContacted}></View>
            <View className={localTime}></View>
        </View>
);
}