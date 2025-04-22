import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/StackNavigator";
import {

	ScrollView,
	Text,
	View,
	TextInput,
	FlatList,
	Pressable,
} from 'react-native';
import { styles } from '../styles/styles';
import { Profiler, useContext, useEffect, useState } from 'react';


import ImageViewer from "../components/ImageViewer";
import ContactTile from "../components/ContactTile";
import { getContacts } from "../../api";
import { contact } from "../../types/databaseTypes";
import { UserContext } from "../context/UserContext";

const blankProfileImg = require("../../assets/freepik-basic-placeholder-profile-picture.png");

type Props = NativeStackScreenProps<RootStackParamList, "ContactListScreen">;

export default function ContactListScreen({ navigation }: Props) {
  const { userDetails } = useContext(UserContext);

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (userDetails.username) {
      getContacts(userDetails.username).then((newContacts) => {
        setContacts(newContacts);
      });
    }
  }, [userDetails]);


	return (
		<View className={styles.contactsContainer}>

      <Text className={styles.headingFive}>My Kinnections List</Text>

      <Pressable 
          onPress={() => {
            navigation.navigate("UserProfileScreen");
          }}>
			<View >
      
				<ImageViewer
					imgSource={blankProfileImg}
					selectedImage={userDetails.avatar_url}
					className={styles.profileImage}
				/>
        
			</View>
      </Pressable>

			<Text className={styles.headingSix}>{`Welcome ${userDetails.username}`}</Text>
			


      <View className='flex-row gap-4'>
        <Pressable className={styles.contactListScreenButton}
          onPress={() => {
            navigation.navigate("ConnectAfterSignUp");
          }}>
          
            <Text className={styles.submitButtonText}>Search for Users</Text>
          
        </Pressable>
        <Pressable className={styles.contactListScreenButton}
          onPress={() => {
            navigation.navigate("CreateCardScreen");
          }}>
          <View>
            <Text className={styles.submitButtonText}>Create Kinnect Card</Text>
          </View>
        </Pressable>
      </View>

      <FlatList
        data={contacts}
        renderItem={({ item }) => <ContactTile contact={item} />}
        keyExtractor={(item: contact) => item.contact_id}
      />
    </View>
  );
}
