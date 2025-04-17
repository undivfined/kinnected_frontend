import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";
import { container, lastContactedTile, profileImage } from "../styles/styles";
import { ScrollView, Text, View } from "react-native";
import { useEffect, useState } from "react";
import ImageViewer from "../components/ImageViewer";



const blankProfileImg = require('../../assets/freepik-basic-placeholder-profile-picture.png')

type Props = NativeStackScreenProps<RootStackParamList, 'ViewContactScreen'>;


export default function ViewContactScreen({ navigation }: Props){

    //   useEffect(() => {
    //     getContact(userName).then((newContacts) => {
    //       console.log(newContacts);
    //       setContacts(newContacts);
    //     });
    //   }, []);

        const [selectedImage, setSelectedImage] = useState<"string" | undefined>(undefined)
    

    return (
        <ScrollView>
            <View className={container}>
                <View className={profileImage}>
                    <ImageViewer imgSource={blankProfileImg} selectedImage={selectedImage} className={profileImage}/>
                </View>

                <View className={lastContactedTile}>

                </View>

                <View className={lastContactedTile}>
                    <Text className="absolute top-2 left-2 text-sm font-semibold text-gray-700">Last Contacted:
                    </Text>
                    <Text className="absolute bottom-2 right-2 text-xs text-gray-500">3 days ago</Text>
                </View>


            </View>
        </ScrollView>
    )
}