import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { styles } from "../styles/styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";
import { UserContext } from "../context/UserContext";
import { useContext, useState } from "react";
import RelationshipDropdown from "../components/RelationshipDropdown";
import LastContactDatePicker from "../components/LastContactDatePicker";
import { postConnection } from "../../api";

type Props = NativeStackScreenProps<RootStackParamList, "SearchedUserScreen">;

export default function SearchedUserScreen({ navigation, route }: Props) {
  const { user } = route.params;
  const {
    userDetails: { username: username_1 },
  } = useContext(UserContext);
  const username_2 = user.username;
  const [newConnection, setNewConnection] = useState({
    username_1: username_1 || "",
    username_2: username_2,
    type_of_relationship: null,
    date_of_last_contact: null,
  });
  function handleConnectionChange(key: string, value: string) {
    setNewConnection((current) => {
      return { ...current, [key]: value };
    });
  }

  function handleAddConnection() {
    if (newConnection.username_1 && newConnection.username_2) {
      postConnection(newConnection)
        .then((createdConnection) => {
          Alert.alert(
            "Success!",
            `You have kinnected with ${user.first_name}`,
            [
              {
                text: "OK",
                onPress: () => {
                  navigation.navigate("ConnectAfterSignUp");
                },
              },
            ]
          );
        })
        .catch(() => {
          Alert.alert("OOPS", "Something went wrong", [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("ConnectAfterSignUp");
              },
            },
          ]);
        });
    }
  }

  return (
    <View>
      <View className={styles.container}>
        <Text className={styles.headingTwo}>
          {user.first_name + " " + user.last_name}
        </Text>
      </View>

      <View className={styles.container}>
        <Text>
          Birthday: {new Date(user.date_of_birth).toLocaleDateString("en-GB")}
        </Text>

        <Text>Timezone: {user.timezone}</Text>
        <Text className={styles.inputLabel}>
          Who is {user.first_name} to you? (Optional)
        </Text>
        <RelationshipDropdown
          setter={handleConnectionChange}
          value={newConnection}
        />
        <Text className={styles.inputLabel}>
          When were you last in touch with {user.first_name}? (Optional)
        </Text>
        <LastContactDatePicker
          setter={handleConnectionChange}
          value={newConnection}
        />
      </View>

      <Pressable className={styles.logIn}>
        <Text className="text-white" onPress={handleAddConnection}>
          Add Connection
        </Text>
      </Pressable>
    </View>
  );
}
