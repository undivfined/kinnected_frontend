import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";
import { useContext, useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import ImageViewer from "../components/ImageViewer";
import pickImage from "../utils/pickImage";

import {
  View,
  Pressable,
  Text,
  Button,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { styles } from "../styles/styles";

import { UserContext } from "../context/UserContext";
import CountryDropdown from "../components/CountryDropdown";
import TimezonesDropdown from "../components/TimezonesDropdown";

const PlaceholderImage = require("../../assets/freepik-basic-placeholder-profile-picture.png");

type Props = NativeStackScreenProps<RootStackParamList, "UserProfileScreen">;

export default function UserProfileScreen({ navigation }: Props) {
  const { userDetails, setUserDetails } = useContext(UserContext);

  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(userDetails.username);
  const [lastName, setLastName] = useState(userDetails.last_name);
  const [firstName, setFirstName] = useState(userDetails.first_name);
  const [date, setDate] = useState<Date>(
    userDetails.date_of_birth ? new Date(userDetails.date_of_birth) : new Date()
  );
  const [showCalender, setShowCalender] = useState(false);
  const [timezone, setTimezone] = useState({
    timezone: userDetails.timezone || "",
  });
  const [countryTimezones, setCountryTimezones] = useState<string[]>([]);

  function onDateChange(event: DateTimePickerEvent, selectedDate?: Date) {
    if (event.type === "set" && selectedDate) {
      setDate(selectedDate);
    }
    setShowCalender(false);
  }

  const handleSave = () => {
    setUserDetails({
      ...userDetails,
      username,
      first_name: firstName,
      last_name: lastName,
      date_of_birth: date,
      timezone: timezone.timezone,
    });
    Alert.alert("Success", "New details have been saved", [
              {
                text: "OK",
                onPress: () => {
                  navigation.navigate("UserProfileScreen");
                },
              },
            ]);
    setIsEditing(false);
  };

  return (
    <View className="flex-1">
      <ScrollView contentContainerClassName="flex-grow">
        <View className="flex-1 justify-between">
          <View className={styles.container}>
            <Text className={styles.headingTwo}>My Profile</Text>

            <View>
              <ImageViewer
                imgSource={PlaceholderImage}
                selectedImage={userDetails.avatar_url}
                className={styles.profileImage}
              />
            </View>

            <View className={styles.pictureButton}>
              <Button
                title="Choose a photo"
                color="black"
                onPress={() => pickImage(setUserDetails)}
              />
            </View>

            <Text className={styles.headingThree}>My Details</Text>

            <Text className={styles.inputLabel}>Username</Text>
            <TextInput
              className={styles.textInput}
              value={username}
              onChangeText={setUsername}
              editable={isEditing}
            />

            <Text className={styles.inputLabel}>First Name</Text>
            <TextInput
              className={styles.textInput}
              value={firstName}
              onChangeText={setFirstName}
              editable={isEditing}
            />

            <Text className={styles.inputLabel}>Last Name</Text>
            <TextInput
              className={styles.textInput}
              value={lastName}
              onChangeText={setLastName}
              editable={isEditing}
            />

            <Text className={styles.inputLabel}>Date of Birth</Text>
            <Pressable
              className={styles.textInput}
              onPress={() => {
                isEditing && setShowCalender(true);
              }}
            >
              <Text>{date.toLocaleDateString()}</Text>
            </Pressable>
            {showCalender && (
              <DateTimePicker
                value={date || new Date()}
                mode="date"
                onChange={(event, selectedDate) => {
                  onDateChange(event, selectedDate);
                }}
              />
            )}

            {isEditing ? (
              <Text className={styles.inputLabel}>Country</Text>
            ) : null}
            {isEditing ? (
              <CountryDropdown setCountryTimezones={setCountryTimezones} />
            ) : null}

            <Text className={styles.inputLabel}>Timezone</Text>
            {isEditing ? (
              <TimezonesDropdown
                countryTimezones={countryTimezones}
                newUserDetails={timezone}
                setNewUserDetails={setTimezone}
              />
            ) : (
              <TextInput
                className={styles.textInput}
                value={userDetails.timezone}
                editable={false}
              />
            )}
          </View>

          <View className="flex-row justify-between items-end p-4 bg-white">
            <View className="flex-1 items-center">
              <Pressable
                className="items-center"
                onPress={() => {
                  if (isEditing) {
                    handleSave();
                  } else {
                    setIsEditing(true);
                  }
                }}
              >
                <MaterialIcons name={isEditing ? "save" : "edit"} size={30} />
                <Text className="mt-1 text-sm text-center">
                  {isEditing ? "Save" : "Edit"}
                </Text>
              </Pressable>
            </View>

            <View className="flex-1 items-center">
              <Pressable
                className="items-center"
                onPress={() => navigation.navigate("LandingScreen")}
              >
                <MaterialIcons name="delete-forever" size={30} />
                <Text className="mt-1 text-sm text-center">Delete Account</Text>
              </Pressable>
            </View>

            <View className="flex-1 items-center">
              <Pressable
                className="items-center"
                onPress={() => navigation.navigate("LogInScreen")}
              >
                <MaterialIcons name="logout" size={30} />
                <Text className="mt-1 text-sm text-center">Log Out</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
