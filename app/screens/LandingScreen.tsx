import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Pressable, Text } from 'react-native';
import { RootStackParamList } from '../navigation/StackNavigator';
import { styles } from '../styles/styles';
import ImageViewer from '../components/ImageViewer';

const kinnectedLogo =  require('../../assets/Kinnected_logo.png')


type Props = NativeStackScreenProps<RootStackParamList, 'LandingScreen'>;

export default function LandingScreen({ navigation }: Props) {
	return (
		<View className={styles.container}>
				<Pressable 
			
					className={styles.enterPressable}
					onPress={() => {
						navigation.navigate('LogInScreen');
					}}
				>
					
					<ImageViewer className={styles.enterPressable} imgSource={kinnectedLogo} />
					{/* <Text className={styles.headingFour}> Get Kinnected</Text> */}
					<Text className={styles.strapLine}>Where Your Connections Become Kin</Text>
				</Pressable>
	
		</View>
	);
}
