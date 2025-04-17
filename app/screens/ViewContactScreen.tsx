import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";
import { View } from "react-native";
import { container, profileImage } from "../styles/styles";
import { useState } from "react";
import ImageViewer from "../components/ImageViewer";
import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";

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


            </View>
        </ScrollView>
    )
}