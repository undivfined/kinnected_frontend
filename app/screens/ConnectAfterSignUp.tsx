import { View, Text, TextInput, Pressable } from "react-native";
import {
  container,
  headingOne,
  logIn,
  skipPress,
  strapLine,
  textInput,
} from "../styles/styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";
import { UserContext } from "../context/UserContext";
import { useContext, useState } from "react";
import { getUsers } from "../../api";

type Props = NativeStackScreenProps<RootStackParamList, "ConnectAfterSignUp">;

export default function ConnectAfterSignUp({ navigation }: Props) {
  const { userDetails } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearch() {
    if (searchTerm) {
      getUsers(searchTerm).then((usersFromApi) => {
        setUsers(usersFromApi);
      });
    }
  }

  console.log(users);
  return (
    <>
      <View>
        <Pressable
          onPress={() => {
            navigation.navigate("ContactListScreen");
          }}
        >
          <Text className={skipPress}>SKIP</Text>
        </Pressable>
      </View>

      <View className={container}>
        <Text className={headingOne}>
          Welcome, {userDetails.first_name}! Would you like to kinnect to an
          existing user?
        </Text>
        {/* change to h2 style label later */}
        <Text className={strapLine}>Find someone you know</Text>
        <TextInput
          className={textInput}
          placeholder="Type their name"
          onChangeText={(text) => {
            setSearchTerm(text);
          }}
        />
        {/* change to submit button later vv */}
        <Pressable className={logIn} onPress={handleSearch}>
          <Text className="text-white">Search</Text>
        </Pressable>
      </View>
    </>
  );
}
