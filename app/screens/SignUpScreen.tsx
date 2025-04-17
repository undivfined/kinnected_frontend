import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
	View,
	StyleSheet,
	Pressable,
	Text,
	TextInput,
	ScrollView,
} from 'react-native';
import DateTimePicker, {
	DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { RootStackParamList } from '../navigation/StackNavigator';

import {Picker } from "@react-native-picker/picker"
import {  container, headingTwo, inputLabel, logIn, pickerInput, textInput } from '../styles/styles';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
const PlaceholderImage = require("../../assets/freepik-basic-placeholder-profile-picture.png");


type Props = NativeStackScreenProps<RootStackParamList, 'SignUpScreen'>;



export default function SignUpScreen({ navigation } : Props) {

  const { setUserDetails } = useContext(UserContext)

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
        <ScrollView>
            <View className={container}>
            <Text className={headingTwo}>Sign Up</Text>

            <Text className={inputLabel}>Username</Text>
            <TextInput className={textInput}/>

            <Text className={inputLabel}>Password</Text>
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
              <Picker selectedValue={country} className={pickerInput} onValueChange={(selected) => setCountry(selected)} mode="dropdown">
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
          


            <Text className="underline">Terms and conditions</Text>

          <Pressable className={logIn} onPress={() => {console.log('do something log in y')}}>
            <Text className='text-white'>Create Account</Text>
          </Pressable>

          <Pressable className='underline' onPress={() => {navigation.navigate('LogInScreen')}}>
            <Text className='underline'>Already have an account? Login</Text>
          </Pressable>
          </View>

        </ScrollView>
      );
}
