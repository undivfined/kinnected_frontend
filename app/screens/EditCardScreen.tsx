import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { styles } from "../styles/styles";
import ImageViewer from "../components/ImageViewer";
import { ScrollView } from "react-native";
import LastContactDatePicker from "../components/LastContactDatePicker";
import { useState } from "react";
import RelationshipDropdown from "../components/RelationshipDropdown";
import { editCard } from "../../api";
import { contact } from "../../types/databaseTypes";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import CountryDropdown from "../components/CountryDropdown";
import TimezonesDropdown from "../components/TimezonesDropdown";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

type Props = NativeStackScreenProps<RootStackParamList, "EditCardScreen">;

export default function EditCardScreen({ navigation, route }: Props) {
  const { contact }: { contact: contact } = route.params;
  const [newDetails, setNewDetails] = useState({
    date_of_last_contact: contact.date_of_last_contact,
    type_of_relationship: contact.type_of_relationship,
    name: contact.name,
    date_of_birth: contact.date_of_birth,
    timezone: contact.timezone,
  });
  const [showCalender, setShowCalender] = useState(false);
  const [countryTimezones, setCountryTimezones] = useState<string[]>([]);

  function onDateChange(
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) {
    if (event.type === "set" && selectedDate) {
      setNewDetails((current) => {
        return { ...current, date_of_birth: selectedDate.toISOString() };
      });
    }
    setShowCalender(false);
  }

  const handleChange = (key: string, value: string) => {
    setNewDetails((current) => {
      return { ...current, [key]: value };
    });
  };

  const sendChanges = () => {
    editCard(contact.contact_id, newDetails)
      .then(() => {
        contact.type_of_relationship = newDetails.type_of_relationship;
        contact.date_of_last_contact = newDetails.date_of_last_contact;
        contact.name = newDetails.name;
        contact.date_of_birth = newDetails.date_of_birth;
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
      .catch((error) => {
        Alert.alert("OOPS", "Something went wrong", [{ text: "OK" }]);
      });
  };
  return (
    <View className="flex-1">
      <ScrollView contentContainerClassName="flex-grow">
        <View className="flex-1 justify-between">
          <View className={styles.container}>
            <Text className={styles.headingFour}>Kinnected User</Text>
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

            <View>
              <Text className={styles.inputLabel}>Name</Text>
              <TextInput
                className="bg-white border border-black rounded-md w-[300px] h-[45px] pt-[10px] pl-[10px] mb-5"
                value={newDetails.name}
                onEndEditing={() => {
                  if (!newDetails.name) {
                    setNewDetails((current) => {
                      return { ...current, name: contact.name };
                    });
                  }
                }}
                onChangeText={(text) => {
                  handleChange("name", text);
                }}
              />
            </View>
            <View>
              <Text className={styles.inputLabel}>Date of last contact</Text>
              <LastContactDatePicker setter={handleChange} value={newDetails} />
            </View>

            <View>
              <Text className={styles.inputLabel}>Date of birth</Text>
              <Pressable
                className={styles.textInput}
                onPress={() => {
                  setShowCalender(true);
                }}
              >
                <Text>
                  {newDetails.date_of_birth
                    ? new Date(newDetails.date_of_birth).toLocaleDateString(
                        "en-GB"
                      )
                    : "Not set"}
                </Text>
              </Pressable>

              {showCalender && (
                <DateTimePicker
                  value={
                    new Date(
                      newDetails.date_of_birth
                        ? newDetails.date_of_birth
                        : Date.now()
                    )
                  }
                  mode="date"
                  onChange={(event, selectedDate) => {
                    onDateChange(event, selectedDate);
                  }}
                />
              )}
            </View>

            <View>
              <Text className={styles.inputLabel}>Relationship Type</Text>
              <RelationshipDropdown setter={handleChange} value={newDetails} />
            </View>

            <View>
              <Text className={styles.inputLabel}>Country</Text>
              <CountryDropdown setCountryTimezones={setCountryTimezones} />
            </View>

            <View>
              <Text className={styles.inputLabel}>Timezone</Text>
              <TimezonesDropdown
                setNewUserDetails={setNewDetails}
                countryTimezones={countryTimezones}
                newUserDetails={newDetails}
              />
            </View>
          </View>
          <View className="flex-row justify-between items-end p-4 bg-white">
            <View className="flex-1 items-center">
              <Pressable className="items-center" onPress={sendChanges}>
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
