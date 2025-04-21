import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Pressable, Text } from 'react-native';
import { RootStackParamList } from '../navigation/StackNavigator';
import { styles } from '../styles/styles';

type Props = NativeStackScreenProps<RootStackParamList, 'LandingScreen'>;

export default function LandingScreen({ navigation }: Props) {
	return (
		<View className={styles.container}>
			<Text className={styles.headingOne}>Kinnected</Text>
			<View className={styles.enterBorder}>
				<Pressable
					className={styles.enterPressable}
					onPress={() => {
						navigation.navigate('LogInScreen');
					}}
				>
					<Text className={styles.submitButtonText}>Enter</Text>
				</Pressable>
			</View>
			<Text className={styles.strapLine}>I am an app</Text>
		</View>
	);
}
