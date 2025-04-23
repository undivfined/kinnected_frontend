import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";
import { Alert, Pressable, Text, View } from "react-native";
import { styles } from "../styles/styles";
import ImageViewer from "../components/ImageViewer";
import { ScrollView } from "react-native";
import LastContactDatePicker from "../components/LastContactDatePicker";
import { useState } from "react";
import RelationshipDropdown from "../components/RelationshipDropdown";
import { editConnection } from "../../api";
import { contact } from "../../types/databaseTypes";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


type Props = NativeStackScreenProps<RootStackParamList, "EditConnectionScreen">;

export default function EditConnectionScreen({ navigation, route }: Props) {
  const { contact }: { contact: contact } = route.params;
  const [newDetails, setNewDetails] = useState({
    date_of_last_contact: contact.date_of_last_contact,
    type_of_relationship: contact.type_of_relationship,
  });

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
  } rounded-md w-[300px] bg-white mb-5 mt-5 p-4`;

  const getCurrentTime = (timezone: string) => {
    const now = new Date();
    return now.toLocaleTimeString("en-GB", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleChange = (key: string, value: string) => {
    setNewDetails((current) => {
      return { ...current, [key]: value };
    });
  };

  const sendChanges = () => {
    editConnection(contact.contact_id, newDetails)
      .then(() => {
        contact.type_of_relationship = newDetails.type_of_relationship;
        contact.date_of_last_contact = newDetails.date_of_last_contact;
        Alert.alert("Success", "New details have been saved", [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("ViewContactScreen", { contact });
            },
          },
        ]);
      })
      .catch(() => {
        Alert.alert("OOPS", "Something went wrong", [{ text: "OK" }]);
      });
  };

  return (
    <View className="flex-1">
      <ScrollView contentContainerClassName="flex-grow">
        <View className="flex-1 justify-between">
          <View className={styles.container}>
            <Text className={styles.headingTwo}>Kinnected User</Text>
            <View className={styles.profileImage}>
              <ImageViewer
                imgSource={
                  contact.avatar_url
                    ? { uri: contact.avatar_url.trim() }
                    : require("../../assets/freepik-basic-placeholder-profile-picture.png")
                }
                className={styles.profileImage}
              />
            </View>
            <Text className="text-xl pt-8">{contact.name}</Text>
            <View className={tileStyle}>
              <View className="flex-row justify-between mb-2">
                <Text className="text-sm font-semibold text-gray-700">
                  Birthday:
                </Text>
                <Text className="text-sm text-gray-500">
                  {contact.date_of_birth
                    ? new Date(contact.date_of_birth).toLocaleDateString(
                        "en-GB"
                      )
                    : "No Birthday"}
                </Text>
              </View>

              <View className="flex-row justify-between mb-2">
                <Text className="text-sm font-semibold text-gray-700">
                  Timezone:
                </Text>
                <Text className="text-sm text-gray-500">
                  {contact.timezone}
                </Text>
              </View>

              <View className="flex-row justify-between">
                <Text className="text-sm font-semibold text-gray-700">
                  Current Time:
                </Text>
                <Text className="text-sm text-gray-500">
                  {getCurrentTime(contact.timezone)}
                </Text>
              </View>
            </View>

            <View>
              <Text className={styles.inputLabel}>Date of last contact</Text>

              <LastContactDatePicker setter={handleChange} value={newDetails} />
            </View>

            <View>
              <Text className={styles.inputLabel}>Relationship Type</Text>
              <RelationshipDropdown setter={handleChange} value={newDetails} />
            </View>
          </View>
          <View className="flex-row justify-between items-end p-4 bg-white">
            <View className="flex-1 items-center">
              <Pressable
                className="items-center"
                onPress={sendChanges}
              >
                <MaterialIcons name="save" size={30} />
                <Text className="mt-1 text-sm text-center">Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
