import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import { useContext, useState } from 'react';
import { Picker } from "@react-native-picker/picker"
import DateTimePicker,{ DateTimePickerEvent } from '@react-native-community/datetimepicker';

import ImageViewer from '../components/ImageViewer';
import pickImage from "../utils/pickImage"

import { View, Pressable, Text, Button, TextInput, ScrollView} from 'react-native';
import { styles } from '../styles/styles';

import { ImageContext } from '../context/ImageContext';
import { UserContext } from "../context/UserContext"

const PlaceholderImage = require("../../assets/freepik-basic-placeholder-profile-picture.png");


type Props = NativeStackScreenProps<RootStackParamList, 'UserProfileScreen'>;

export default function UserProfileScreen({ navigation } : Props) {

const { selectedImage, setSelectedImage } = useContext(ImageContext)
const { userDetails, setUserDetails } = useContext(UserContext)

const [isEditing, setIsEditing] = useState(false);
const [username, setUsername] = useState(userDetails.username);
const [lastName, setLastName] = useState(userDetails.last_name);
const [firstName, setFirstName] = useState(userDetails.first_name);
const [date, setDate] = useState<Date>(userDetails.date_of_birth? new Date(userDetails.date_of_birth) : new Date());
const [showCalender, setShowCalender] = useState(false);
const [timezone, setTimezone] = useState(userDetails.timezone);


  
    function onDateChange(event: DateTimePickerEvent, selectedDate?: Date) {
      if (event.type === 'set' && selectedDate) {
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
        timezone,
      });
      setIsEditing(false);
    };

    return (
        <ScrollView>

        <View className={styles.container}>

          <Text className={styles.headingTwo}>My Profile</Text>
          

          <View>
            <ImageViewer imgSource={PlaceholderImage} selectedImage={userDetails.avatar_url} className={styles.profileImage}/>
          </View>

            <View className={styles.pictureButton}>
              <Button title="Choose a photo" color="black" onPress={() => pickImage(setUserDetails)}/>
            </View>
            

            <Text className={styles.headingThree}>My Details</Text>

              <Pressable className={styles.logIn} onPress={() => {
                if (isEditing) {
                  handleSave();
                } else {
                  setIsEditing(true);
                }
              }}>
                <Text className="text-white">{isEditing ? 'Save' : 'Edit'}</Text>
              </Pressable>


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
            <Pressable className={styles.textInput} onPress={()=>{ isEditing && setShowCalender(true)}}><Text>{date.toLocaleDateString()}</Text></Pressable>

            {showCalender && (
            <DateTimePicker value={date || new Date} mode="date" onChange={(event, selectedDate) => {onDateChange(event, selectedDate)}}/>
            )}
            

            {/* <Text className={styles.inputLabel}>Country</Text>
            <View className={styles.pickerInput} >
              <Picker selectedValue={country}  onValueChange={(selected) => setCountry(selected)} mode="dropdown" enabled={isEditing}>
                <Picker.Item label="Select your country" value={null} enabled={false} />
                <Picker.Item label="England" value="england" />
                <Picker.Item label="Belarus" value="belarus" />
                <Picker.Item label="South Africa" value="south africa" />
                <Picker.Item label="London" value="london" />
              </Picker>
            </View> */}
            
             
            <Text className={styles.inputLabel}>Timezone</Text>
            <View className={styles.pickerInput} >
              <Picker selectedValue={timezone} onValueChange={(selected) => setTimezone(selected)} mode="dropdown" enabled={isEditing}>
                <Picker.Item label="Select your Timezone" value={null} enabled={false} />
                <Picker.Item label="No idea" value="No idea" />
                <Picker.Item label="hmmm" value="hmm" />
              </Picker>
            </View>


            <Pressable className={styles.deleteButton} onPress={() => {navigation.navigate("LandingScreen")
            }}>
              <Text className="text-white">Delete Account</Text>
            </Pressable>

          </View>

        </ScrollView>
      );
}
