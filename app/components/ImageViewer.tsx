import { StyleSheet } from 'react-native';
import { Image, type ImageSource } from 'expo-image';

type Props = {
  imgSource: ImageSource;
  selectedImage?: string;
  className?: string
};

export default function ImageViewer({ imgSource, selectedImage, className }: Props) {
    const imageSource = selectedImage ? { uri: selectedImage } : imgSource;
    
    return <Image source={imageSource} className={className} />;
}

// const styles = StyleSheet.create({
//   image: {
//     width: 120,
//     height: 120,
//     borderRadius: 200,
//     borderWidth: 3,
//     marginTop: 10,
    
//   },
// });
