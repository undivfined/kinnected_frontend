import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";
import {
  ScrollView,
  Text,
  View,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import {
  contactsContainer,
  container,
  headingFive,
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
  const { userDetails } = useContext(UserContext);
  const [selectedImage, setSelectedImage] = useState<"string" | undefined>(
    undefined
  );
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (userDetails.username) {
      getContacts(userDetails.username).then((newContacts) => {
        setContacts(newContacts);
      });
    }
  }, [userDetails]);

  return (
    <View className={contactsContainer}>
      <View className={profileImage}>
        <ImageViewer
          imgSource={blankProfileImg}
          selectedImage={selectedImage}
          className={profileImage}
        />
      </View>

      <Text className={headingFive}>{userDetails.username}</Text>
      <Text className={headingFive}>Your Kinnections List</Text>

      <Pressable
        onPress={() => {
          navigation.navigate("SearchedProfileScreen");
        }}
      >
        <View>
          <Text className="underline">SearchForUsers</Text>
        </View>
      </Pressable>

      <FlatList
        data={contacts}
        renderItem={({ item }) => <ContactTile contact={item} />}
        keyExtractor={(item: contact) => item.contact_id}
      />
    </View>
  );
}
