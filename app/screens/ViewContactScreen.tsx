import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";
import { Text, View } from "react-native";
import { container, headingFour, headingTwo, lastContactedTile, profileImage } from "../styles/styles";
import { useState } from "react";
import ImageViewer from "../components/ImageViewer";
import { ScrollView } from "react-native";


const blankProfileImg = require('../../assets/freepik-basic-placeholder-profile-picture.png')

type Props = NativeStackScreenProps<RootStackParamList, 'ViewContactScreen'>;


export default function ViewContactScreen({ navigation }: Props){

    const [selectedImage, setSelectedImage] = useState<"string" | undefined>(undefined)


    return (
        <ScrollView>
            <View className={container}>
                <View className={profileImage}>
                    <ImageViewer imgSource={blankProfileImg} selectedImage={selectedImage} className={profileImage}/>
                </View>

                <View className={lastContactedTile}>
                    <Text className="absolute top-2 left-2 text-sm font-semibold text-gray-700">Last Contacted:
                    </Text>
                    <View className="absolute top-2 right-2">
                        <ImageViewer imgSource={blankProfileImg} className="text-gray-500" />
                    </View>
                    <Text className="absolute bottom-2 right-2 text-xs text-gray-500">3 days ago</Text>
                </View>


            </View>
        </ScrollView>
    )
}