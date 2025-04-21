import { View, Text, TextInput, Pressable } from 'react-native';
import { styles } from '../styles/styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'ConnectAfterSignUp'>;

export default function ConnectAfterSignUp({ navigation }: Props) {
	return (
		<>
			<View>
				<Pressable
					onPress={() => {
						navigation.navigate('ContactListScreen');
					}}
				>
					<Text className={styles.skipPress}>SKIP</Text>
				</Pressable>
			</View>
			<View className={styles.container}>
				<Text className={styles.headingOne}>
					Would you like to kinnect to an existing user?
				</Text>
				{/* change to h2 style label later */}
				<Text className={styles.strapLine}>find someone you know</Text>
				<TextInput
					className={styles.textInput}
					placeholder='enter your their username or their full name'
				/>
				{/* change to submit button later vv */}
				<Pressable
					className={styles.logIn}
					onPress={() => {
						console.log('Finding your Kinnections...');
					}}
				>
					<Text className={styles.submitButtonText}>Let's Kinnect</Text>
				</Pressable>
			</View>
		</>
	);
}
