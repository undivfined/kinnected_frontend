import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  View,
  Pressable,
  Text,
  TextInput,
  ScrollView,
  Alert,
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
import bcrypt from "react-native-bcrypt";

import { NewUser } from "../../types/NewUserType";
import countriesData from "../../countriesData";
import { postNewUser } from "../../api";
type Props = NativeStackScreenProps<RootStackParamList, "SignUpScreen">;

export default function SignUpScreen({ navigation }: Props) {
  const { setUserDetails } = useContext(UserContext);
  const [newUserDetails, setNewUserDetails] = useState<NewUser>({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    date_of_birth: new Date(Date.now()).toISOString(),
    timezone: "",
  });

  const [showCalender, setShowCalender] = useState<boolean>(false);
  const [country, setCountry] = useState<string>("");

  function onDateChange(
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) {
    if (event.type === "set" && selectedDate) {
      setNewUserDetails((current) => {
        const newUser = {
          ...current,
          date_of_birth: selectedDate.toISOString(),
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
      bcrypt.hash(newUserDetails.password, 10, function (err, hash) {
        if (err) {
          Alert.alert("OOPS!", "Something went wrong", [
            { text: "Not again..." },
          ]);
        }

        postNewUser({
          ...newUserDetails,
          password: hash || "",
        })
          .then((newUser) => {
            const { password, ...rest } = newUser;
            setUserDetails(rest);
            navigation.navigate("ConnectAfterSignUp");
          })
          .catch((error) => {
            if (
              error.response.data.message ===
              "A user with this username already exists"
            ) {
              Alert.alert("OOPS!", error.response.data.message, [
                { text: "OK" },
              ]);
            } else {
              Alert.alert("OOPS!", "Something went wrong", [
                { text: "Not again..." },
              ]);
            }
          });
      });
    } else {
      Alert.alert("OOPS!", "Please fill in all the fields", [{ text: "Fine" }]);
    }
  }

  return (
    <ScrollView>
      <View className={container}>
        <Text className={headingTwo}>Sign Up</Text>

        <Text className={inputLabel}>Username</Text>
        <TextInput className={textInput} onChangeText={handleUsername} />

        <Text className={inputLabel}>Password</Text>
        <TextInput
          className={textInput}
          onChangeText={handlePassword}
          secureTextEntry={true}
        />

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

        <View>
          <Picker
            className={pickerInput}
            selectedValue={country}
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

        <View>
          <Picker
            className={pickerInput}
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
