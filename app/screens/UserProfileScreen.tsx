import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";
import { useContext, useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
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
import { deleteOwnAccount, editAccountDetails } from "../../api";

const PlaceholderImage = require("../../assets/freepik-basic-placeholder-profile-picture.png");

type Props = NativeStackScreenProps<RootStackParamList, "UserProfileScreen">;

export default function UserProfileScreen({ navigation }: Props) {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [updatedDetails, setUpdatedDetails] = useState({
    first_name: userDetails.first_name!,
    last_name: userDetails.last_name!,
    timezone: userDetails.timezone!,
    date_of_birth: userDetails.date_of_birth!,
  });
  const [isEditing, setIsEditing] = useState(false);

  const [showCalender, setShowCalender] = useState(false);

  const [countryTimezones, setCountryTimezones] = useState<string[]>([]);

  function onDateChange(event: DateTimePickerEvent, selectedDate?: Date) {
    if (event.type === "set" && selectedDate) {
      setUpdatedDetails((current) => {
        return { ...current, date_of_birth: selectedDate.toISOString() };
      });
    }
    setShowCalender(false);
  }

  const handleSave = () => {
    editAccountDetails(userDetails.username!, updatedDetails);
    setUserDetails({
      ...userDetails,
      first_name: updatedDetails.first_name,
      last_name: updatedDetails.last_name,
      date_of_birth: updatedDetails.date_of_birth,
      timezone: updatedDetails.timezone,
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
              editable={false}
              value={userDetails.username}
            />

            <Text className={styles.inputLabel}>First Name</Text>
            <TextInput
              className={styles.textInput}
              value={updatedDetails.first_name}
              onChangeText={(text) => {
                setUpdatedDetails((current) => {
                  return { ...current, first_name: text };
                });
              }}
              editable={isEditing}
            />

            <Text className={styles.inputLabel}>Last Name</Text>
            <TextInput
              className={styles.textInput}
              value={updatedDetails.last_name}
              onChangeText={(text) => {
                setUpdatedDetails((current) => {
                  return { ...current, last_name: text };
                });
              }}
              editable={isEditing}
            />

            <Text className={styles.inputLabel}>Date of Birth</Text>
            <Pressable
              className={styles.textInput}
              onPress={() => {
                isEditing && setShowCalender(true);
              }}
            >
              <Text>
                {new Date(updatedDetails.date_of_birth!).toLocaleDateString(
                  "en-GB"
                )}
              </Text>
            </Pressable>
            {showCalender && (
              <DateTimePicker
                value={new Date(updatedDetails.date_of_birth!)}
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
                newUserDetails={updatedDetails}
                setNewUserDetails={setUpdatedDetails}
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
                onPress={() => {
                  Alert.alert(
                    "Attention!",
                    "You are about to delete your account forever. Are you sure?",
                    [
                      {
                        text: "Delete",
                        onPress: () => {
                          deleteOwnAccount(userDetails.username!);
                          navigation.navigate("LandingScreen");
                        },
                      },
                      { text: "Cancel" },
                    ]
                  );
                }}
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
