import * as ImagePicker from "expo-image-picker"
import {ImageContextType} from "../context/ImageContext"
import { Platform } from "react-native";

export default function pickImage( setSelectedImage: ImageContextType['setSelectedImage']) {

    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    })
    .then((result) => {
      if (!result.canceled) {
        const uri = result.assets[0].uri;
        const base64 = result.assets[0].base64;
    
        // For web, use base64; for mobile, use URI
        const imageSource = Platform.OS === 'web' ? `data:image/jpeg;base64,${base64}` : uri;
        setSelectedImage(imageSource);
      } else {
        alert('You did not select a new image.');
      }
    }
)}
 