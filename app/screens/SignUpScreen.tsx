import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  View,
  Pressable,
  Text,
  TextInput,
  ScrollView,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { RootStackParamList } from "../navigation/StackNavigator";
import { Picker } from "@react-native-picker/picker";
import {
  container,
  headingTwo,
  inputLabel,
  logIn,
  pickerInput,
  textInput,
} from "../styles/styles";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
const PlaceholderImage = require("../../assets/freepik-basic-placeholder-profile-picture.png");

import { NewUser } from "../../types/NewUserType";
import countriesData from "../../countriesData";
type Props = NativeStackScreenProps<RootStackParamList, "SignUpScreen">;

export default function SignUpScreen({ navigation }: Props) {
  const { setUserDetails } = useContext(UserContext);
  const [newUserDetails, setNewUserDetails] = useState<NewUser>({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    date_of_birth: new Date(Date.now()).toLocaleDateString("en-GB"),
    timezone: "",
  });

  const [showCalender, setShowCalender] = useState<boolean>(false);
  const [country, setCountry] = useState<string>("");

  function onDateChange(
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) {
    if (event.type === "set" && selectedDate) {
      console.log(typeof selectedDate.toLocaleDateString());
      setNewUserDetails((current) => {
        const newUser = {
          ...current,
          date_of_birth: selectedDate.toLocaleDateString(),
        };
        return newUser;
      });
    }
    setShowCalender(false);
  }

  function handleUsername(e: string) {
    setNewUserDetails((current) => {
      return { ...current, username: e };
    });
  }

  function handlePassword(e: string) {
    setNewUserDetails((current) => {
      return { ...current, password: e };
    });
  }

  function handleFirstName(e: string) {
    setNewUserDetails((current) => {
      return { ...current, first_name: e };
    });
  }

  function handleLastName(e: string) {
    setNewUserDetails((current) => {
      return { ...current, last_name: e };
    });
  }

  function handleSignup() {
    let allValues = true;
    Object.values(newUserDetails).forEach((value) => {
      if (!value) {
        allValues = false;
      }
    });
    if (allValues) {
      console.log(newUserDetails);
    }
  }

  // console.log(newUserDetails);
  return (
    <ScrollView>
      <View className={container}>
        <Text className={headingTwo}>Sign Up</Text>

        <Text className={inputLabel}>Username</Text>
        <TextInput className={textInput} onChangeText={handleUsername} />

        <Text className={inputLabel}>Password</Text>
        <TextInput className={textInput} onChangeText={handlePassword} />

        <Text className={inputLabel}>First Name</Text>
        <TextInput className={textInput} onChangeText={handleFirstName} />

        <Text className={inputLabel}>Last Name</Text>
        <TextInput className={textInput} onChangeText={handleLastName} />

        <Text className={inputLabel}>Date of Birth</Text>
        <Pressable
          className={textInput}
          onPress={() => {
            setShowCalender(true);
          }}
        >
          <Text>{new Date(Date.now()).toLocaleDateString("en-GB")}</Text>
        </Pressable>

        {showCalender && (
          <DateTimePicker
            value={new Date(Date.now())}
            mode="date"
            onChange={(event, selectedDate) => {
              onDateChange(event, selectedDate);
            }}
          />
        )}

        <Text className={inputLabel}>Country</Text>

        <View className={pickerInput}>
          <Picker
            selectedValue={country}
            className={pickerInput}
            onValueChange={(selected) => setCountry(selected)}
          >
            <Picker.Item label="Select your country" value="" enabled={false} />
            {Object.keys(countriesData).map((country) => {
              return (
                <Picker.Item label={country} value={country} key={country} />
              );
            })}
          </Picker>
        </View>

        <Text className={inputLabel}>Timezone</Text>

        <View className={pickerInput}>
          <Picker
            selectedValue={newUserDetails.timezone}
            onValueChange={(selected) =>
              setNewUserDetails((current) => {
                return { ...current, timezone: selected };
              })
            }
          >
            <Picker.Item
              label="Select your Timezone"
              value=""
              enabled={false}
            />
            {country &&
              countriesData[country].map((timezone: string, i: number) => {
                return (
                  <Picker.Item label={timezone} value={timezone} key={i} />
                );
              })}
          </Picker>
        </View>

        <Text className="underline">Terms and conditions</Text>

        <Pressable className={logIn} onPress={handleSignup}>
          <Text className="text-white">Create Account</Text>
        </Pressable>

        <Pressable
          className="underline"
          onPress={() => {
            navigation.navigate("LogInScreen");
          }}
        >
          <Text className="underline">Already have an account? Login</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
