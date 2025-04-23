import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";
import { Pressable, Text, View } from "react-native";
import { styles } from "../styles/styles";
import ImageViewer from "../components/ImageViewer";
import { ScrollView } from "react-native";
import { convertMilliseconds } from "../utils/milliseconds-day";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { deleteCard, deleteConnection } from "../../api";


type Props = NativeStackScreenProps<RootStackParamList, "ViewContactScreen">;

export default function ViewContactScreen({ navigation, route }: Props) {
  const { contact } = route.params;

  const handleDelete = () => {
    if (contact.isCard) {
      return deleteCard(contact.contact_id).then(() => {
        navigation.navigate("ContactListScreen");
      });
    } else {
      return deleteConnection(contact.contact_id).then(() => {
        navigation.navigate("ContactListScreen");
      });
    }
  };

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

  const getDaysSinceLastContact = (date_of_last_contact: string) => {
    const date1 = new Date(Date.now());
    const date2 = new Date(date_of_last_contact);
    return convertMilliseconds(
      Math.abs(date2.getTime() - date1.getTime()),
      "d"
    );
  };

  const getCurrentTime = (timezone: string) => {
    const now = new Date();
    return now.toLocaleTimeString("en-GB", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <View className="flex-1">
      <ScrollView contentContainerClassName="flex-grow">
        <View className="flex-1 justify-between">
          <View className={styles.container}>
            <Text className={styles.headingTwo}>
              {contact.isCard ? "Kinnect Card" : "Kinnected User"}
            </Text>
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
                  Last Contacted:
                </Text>
                <Text className="text-sm text-gray-500">
                 {contact.date_of_last_contact ? getDaysSinceLastContact(contact.date_of_last_contact) ===  0 ? 'Today' :`${getDaysSinceLastContact(contact.date_of_last_contact)} days ago` : 'Not Contacted'}
                </Text>
              </View>

              <View className="flex-row justify-between mb-2">
                <Text className="text-sm font-semibold text-gray-700">
                  Timezone:
                </Text>
                <Text className="text-sm text-gray-500">
                  {contact.timezone.split("/")[1].replace("_", " ")}
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
              <Text className={styles.inputLabel}>Birthday</Text>
              <View className="bg-white w-[300px] h-[45px] border border-black rounded-md mb-5 flex items-center justify-center">
                <Text className="text-center">
                  {contact.date_of_birth
                    ? new Date(contact.date_of_birth).toLocaleDateString(
                        "en-GB"
                      )
                    : "No Birthday"}
                </Text>
              </View>
            </View>

            <View>
              <Text className={styles.inputLabel}>Relationship Type</Text>
              <View className="bg-white w-[300px] h-[45px] border border-black rounded-md mb-5 flex items-center justify-center">
                <Text className="text-center">
                  {contact.type_of_relationship
                    ? contact.type_of_relationship
                    : "Not Set"}
                </Text>
              </View>
            </View>
          </View>
          <View className="flex-row justify-between items-end p-4 bg-white">
            {contact.isCard ? null : (
              <View className="flex-1 items-center">
                <Pressable
                  className="items-center"
                  onPress={() => {
                    navigation.navigate("MessagingScreen", {username: contact.username!});
                  }}
                >
                  <Ionicons name="chatbox-ellipses" size={30} />
                  <Text className="mt-1 text-sm text-center">Chat</Text>
                </Pressable>
              </View>
            )}

            <View className="flex-1 items-center">
              <Pressable
                className="items-center"
                onPress={() => {
                  navigation.navigate(
                    contact.isCard ? "EditCardScreen" : "EditConnectionScreen",
                    { contact }
                  );
                }}
              >
                <MaterialIcons name="edit" size={30} />
                <Text className="mt-1 text-sm text-center">Edit</Text>
              </Pressable>
            </View>

            <View className="flex-1 items-center">
              <Pressable className="items-center" onPress={handleDelete}>
                <MaterialIcons name="delete-forever" size={30} />
                <Text className="mt-1 text-sm text-center">
                  {contact.isCard ? "Delete" : "Disconnect"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
