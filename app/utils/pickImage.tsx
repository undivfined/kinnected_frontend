import * as ImagePicker from "expo-image-picker"
import {ImageContextType} from "../context/ImageContext"

export default function pickImage( setSelectedImage: ImageContextType['setSelectedImage']) {

    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    })
    .then((result) => {
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);    
    } else {
      alert('You did not select a new image.');
    }
  });
  }
  