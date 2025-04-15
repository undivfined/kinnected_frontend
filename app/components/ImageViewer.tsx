import { StyleSheet } from 'react-native';
import { Image, type ImageSource } from 'expo-image';

type Props = {
  imgSource: ImageSource;
  selectedImage?: string;
};

export default function ImageViewer({ imgSource, selectedImage }: Props) {
    const imageSource = selectedImage ? { uri: selectedImage } : imgSource;
    
    return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    borderRadius: 200,
    borderWidth: 3,
    marginTop: 10,
    
  },
});
