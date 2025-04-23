
import { Image as RNImage , ImageSourcePropType } from 'react-native'
import { Platform } from 'react-native';
import { Image as ExpoImage } from 'expo-image';

type Props = {
  imgSource: ImageSourcePropType;
  selectedImage?: string;
  className?: string
};

const MyImage = Platform.OS === 'web' ? ExpoImage : RNImage;

export default function ImageViewer({ imgSource, selectedImage, className }: Props) {
    const imageSource = selectedImage ? { uri: selectedImage } : imgSource;
    return <MyImage source={imageSource} className={className} />;
}
