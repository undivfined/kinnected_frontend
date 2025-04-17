import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";
import { Image, Pressable, View } from "react-native";
import {
  contactInfo,
  contactTile,
  lastContacted,
  localTime,
} from "../styles/styles";
import ImageViewer from "./ImageViewer";

const blankProfileImg = require("../../assets/freepik-basic-placeholder-profile-picture.png");

export default function ContactTile() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    
  return (
    <Pressable onPress={()=>{navigation.navigate("LogInScreen")}}>
      <View className={contactTile}>
        <View className={contactInfo}>
          <Pressable onPress={()=>{navigation.navigate("ContactCardScreen")}}>
            <ImageViewer imgSource={blankProfileImg} className={contactInfo} />
          </Pressable>
        </View>
        <View className={lastContacted}></View>
        <View className={localTime}></View>
      </View>
    </Pressable>
  );
}
