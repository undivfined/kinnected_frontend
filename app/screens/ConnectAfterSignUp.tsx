
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { styles } from '../styles/styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';




import { UserContext } from "../context/UserContext";
import { useContext, useState } from "react";
import { getContacts, getUsers } from "../../api";


import SearchedUserTile from "../components/SearchedUserTile";
import { contact, User } from "../../types/databaseTypes";
import DismissKeyboardView from '../utils/dismissKeyboardView';

type Props = NativeStackScreenProps<RootStackParamList, "ConnectAfterSignUp">;

export default function ConnectAfterSignUp({ navigation }: Props) {

  const { userDetails } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSearch() {
    if (searchTerm && userDetails.username) {
      setIsLoading(true);
      Promise.all([
        getUsers(searchTerm.replace(" ", "")),
        getContacts(userDetails.username),
      ]).then(([usersFromApi, contactsFromApi]) => {
        const existingContacts = contactsFromApi
          .map((contact: contact) => contact.username)
          .filter((username: string | null) => username);
        const searchResults = usersFromApi.filter(
          (user: User) =>
            !existingContacts.includes(user.username) &&
            user.username !== userDetails.username
        );
        console.log(searchResults);
        setUsers(searchResults);
        setIsLoading(false);
      });
    }
  }

  return (
    <ScrollView>
    <DismissKeyboardView>
      <View>
        <Pressable
          onPress={() => {
            navigation.navigate("ContactListScreen");
          }}
        >
          <Text className={styles.skipPress}>View kinnections</Text>

        </Pressable>
      </View>

      <View className={styles.container}>
        <Text className={styles.headingOne}>
          Welcome, {userDetails.first_name}! Would you like to kinnect to an
          existing user?
        </Text>
        {/* change to h2 style label later */}
        <Text className={styles.strapLine}>Find someone you know</Text>
        <TextInput
          className={styles.textInput}
          placeholder="Type their name"
          onChangeText={(text) => {
            setSearchTerm(text);
          }}
        />
        {/* change to submit button later vv */}
        <Pressable className={styles.logIn} onPress={handleSearch}>
          <Text className={styles.submitButtonText}>Search</Text>
        </Pressable>
      </View>

      <View className={styles.container}>
        {users &&
          users.map((user: User) => {
            return <SearchedUserTile user={user} key={user.username} />;
          })}
      </View>
    </DismissKeyboardView>
    </ScrollView>
  );

}
