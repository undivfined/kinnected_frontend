import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";
import { ScrollView, Text, View, TextInput, FlatList } from "react-native";
import {
  contactsContainer,
  container,
  headingThree,
  inputLabel,
  profileImage,
  textInput,
  userContainer,
} from "../styles/styles";
import { Profiler, useContext, useEffect, useState } from "react";
import ImageViewer from "../components/ImageViewer";
import ContactTile from "../components/ContactTile";
import { getContacts } from "../../api";
import { contact } from "../../types/databaseTypes";
import { UserContext } from "../context/UserContext";
const blankProfileImg = require("../../assets/freepik-basic-placeholder-profile-picture.png");

type Props = NativeStackScreenProps<RootStackParamList, "ContactListScreen">;

export default function ContactListScreen({ navigation }: Props) {
  const [userName, setUserName] = useState("barbara38");
  const [selectedImage, setSelectedImage] = useState<"string" | undefined>(
    undefined
  );
  const [contacts, setContacts] = useState([]);
  const { userDetails, setUserDetails } = useContext(UserContext);

  useEffect(() => {
    getContacts(userName).then((newContacts) => {
      console.log(newContacts);
      setContacts(newContacts);
    });
  }, []);

  return (
    <ScrollView>
      <View className={contactsContainer}>
        <View className={profileImage}>
          <ImageViewer
            imgSource={blankProfileImg}
            selectedImage={selectedImage}
            className={profileImage}
          />
        </View>

        <Text className={headingThree}>{`${userDetails.username}`}</Text>
        <Text className={headingThree}>Your Kinnections List</Text>

        <FlatList
          data={contacts}
          renderItem={({ item }) => <ContactTile contact={item} />}
          keyExtractor={(item: contact) => item.contact_id}
        />
      </View>
    </ScrollView>
  );
}
