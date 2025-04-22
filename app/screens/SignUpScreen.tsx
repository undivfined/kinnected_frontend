import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
	View,
	Pressable,
	Text,
	TextInput,
	ScrollView,
	Alert,
} from 'react-native';
import DateTimePicker, {	

  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { styles } from '../styles/styles';

import { useContext, useState } from "react";
import bcrypt from "react-native-bcrypt";

import { UserContext } from "../context/UserContext";
import { NewUser } from "../../types/NewUserType";

import { postNewUser } from "../../api";
import { RootStackParamList } from "../navigation/StackNavigator";
import CountryDropdown from "../components/CountryDropdown";
import TimezonesDropdown from "../components/TimezonesDropdown";
type Props = NativeStackScreenProps<RootStackParamList, "SignUpScreen">;

export default function SignUpScreen({ navigation }: Props) {
  const { setUserDetails } = useContext(UserContext);
  const [newUserDetails, setNewUserDetails] = useState<NewUser>({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    date_of_birth: new Date("1992-5-5").toISOString(),
    timezone: "",
  });

  const [showCalender, setShowCalender] = useState<boolean>(false);
  const [countryTimezones, setCountryTimezones] = useState<string[]>([]);

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
  function handleChange(value: string, property: string) {
    setNewUserDetails((current) => {
      return { ...current, [property]: value };
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
      <View className={styles.container}>
        <Text className={styles.headingTwo}>Sign Up</Text>

        <Text className={styles.inputLabel}>Username</Text>
        <TextInput
          className={styles.textInput}
          onChangeText={(value) => {
            handleChange(value, "username");
          }}
        />

        <Text className={styles.inputLabel}>Password</Text>
        <TextInput
          className={styles.textInput}
          onChangeText={(value) => {
            handleChange(value, "password");
          }}
          secureTextEntry={true}
        />

        <Text className={styles.inputLabel}>First Name</Text>
        <TextInput
          className={styles.textInput}
          onChangeText={(value) => {
            handleChange(value, "first_name");
          }}
        />

        <Text className={styles.inputLabel}>Last Name</Text>
        <TextInput
          className={styles.textInput}
          onChangeText={(value) => {
            handleChange(value, "last_name");
          }}
        />

        <Text className={styles.inputLabel}>Date of Birth</Text>
        <Pressable
          className={styles.textInput}
          onPress={() => {
            setShowCalender(true);
          }}
        >
          <Text>{new Date("1992-5-5").toLocaleDateString("en-GB")}</Text>
        </Pressable>

        {showCalender && (
          <DateTimePicker
            value={new Date(newUserDetails.date_of_birth)}
            mode="date"
            onChange={(event, selectedDate) => {
              onDateChange(event, selectedDate);
            }}
          />
        )}

        <Text className={styles.inputLabel}>Country</Text>
        <CountryDropdown setCountryTimezones={setCountryTimezones} />

        <Text className={styles.inputLabel}>Timezone</Text>
        <TimezonesDropdown
          setNewUserDetails={setNewUserDetails}
          countryTimezones={countryTimezones}
          newUserDetails={newUserDetails}
        />

        <Text
          className={styles.underline}
          onPress={() => {
            navigation.navigate("ConnectAfterSignUp");
          }}
        >
          Terms and conditions
        </Text>

        <Pressable className={styles.logIn} onPress={handleSignup}>
          <Text className={styles.submitButtonText}>Create Account</Text>
        </Pressable>

        <Pressable
          className={styles.underline}
          onPress={() => {
            navigation.navigate("LogInScreen");
          }}
        >
          <Text className={styles.underline}>Already have an account? Login</Text>
        </Pressable>
      </View>
    </ScrollView>
  );

}
