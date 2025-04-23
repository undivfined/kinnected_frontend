import * as ImagePicker from "expo-image-picker"
import { UserDetails } from "../context/UserContext";


export default function pickImage(setUserDetails: Function) {

    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    })
    .then((result) => {
    if (!result.canceled) {
      setUserDetails((current: UserDetails) => {
        return {
          ...current,
          avatar_url: result.assets[0].uri
        }
      });    
    } else {
      alert('You did not select a new image.');
    }
  });
  }
