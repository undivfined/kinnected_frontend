import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import { useContext, useState } from 'react';
import { Picker } from "@react-native-picker/picker"
import DateTimePicker,{ DateTimePickerEvent } from '@react-native-community/datetimepicker';

import ImageViewer from '../components/ImageViewer';
import pickImage from "../utils/pickImage"

import { View, Pressable, Text, Button, TextInput, ScrollView} from 'react-native';
import { headingTwo, container, inputLabel, textInput, pickerInput, imageContainer, logIn, scrollContainer, headingThree } from '../styles/styles';

import { ImageContext } from '../context/ImageContext';
import { UserContext } from "../context/UserContext"

const PlaceholderImage = require("../../assets/freepik-basic-placeholder-profile-picture.png");


type Props = NativeStackScreenProps<RootStackParamList, 'UserProfileScreen'>;

export default function UserProfileScreen({ navigation } : Props) {

const { selectedImage, setSelectedImage } = useContext(ImageContext)

// const { userDetails, setUserDetails } = useContext(UserContext)

  const [date, setDate] = useState(new Date("1992-5-5"))
  const [showCalender, setShowCalender] = useState(false);
  const [country, setCountry] = useState<string | null>(null);
  const [timezone, setTimezone] = useState<string | null>(null);
  
    function onDateChange(event: DateTimePickerEvent, selectedDate?: Date) {
      if (event.type === 'set' && selectedDate) {
        setDate(selectedDate);
      }
      setShowCalender(false);
    }

    return (
        <ScrollView contentContainerClassName={scrollContainer}>

          <View>
          <Text className={headingTwo}>My Profile</Text>
          </View>
          
          <View className={imageContainer}>
            <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage}/>
          </View>

            <View className={logIn}>
              <Button title="Choose a photo" color="black" onPress={() => pickImage(setSelectedImage)}/>
            </View>

            <Text className={headingThree}>My Details</Text>

            <Text className={inputLabel}>Username</Text>
            <TextInput className={textInput}/>

            <Text className={inputLabel}>Full Name</Text>
            <TextInput className={textInput}/>

            <Text className={inputLabel}>Date of Birth</Text>
            <Pressable className={textInput} onPress={()=>{setShowCalender(true)}}><Text>{date.toLocaleDateString()}</Text></Pressable>

            {showCalender && (
            <DateTimePicker value={date} mode="date" onChange={(event, selectedDate) => {onDateChange(event, selectedDate)}}/>
            )}
            
            <Text className={inputLabel}>Country</Text>
            <View className={pickerInput} >
              <Picker selectedValue={country}  onValueChange={(selected) => setCountry(selected)} mode="dropdown">
                <Picker.Item label="Select your country" value={null} enabled={false} />
                <Picker.Item label="England" value="england" />
                <Picker.Item label="Belarus" value="belarus" />
                <Picker.Item label="South Africa" value="south africa" />
                <Picker.Item label="London" value="london" />
              </Picker>
            </View>
            
           
             
            <Text className={inputLabel}>Timezone</Text>
            <View className={pickerInput} >
              <Picker selectedValue={timezone} className={pickerInput} onValueChange={(selected) => setTimezone(selected)}>
                <Picker.Item label="Select your Timezone" value={null} enabled={false} />
                <Picker.Item label="No idea" value="No idea" />
                <Picker.Item label="hmmm" value="hmm" />
              </Picker>
            </View>

        </ScrollView>
      );
}
