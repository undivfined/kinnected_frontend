
import * as ImagePicker from "expo-image-picker"

export default function pickImage() {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    })
    .then((result) => {
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);    
    } else {
      alert('You did not select any image.');
    }
  });
}