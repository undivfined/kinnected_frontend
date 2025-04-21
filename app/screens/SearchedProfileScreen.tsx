import { Pressable, Text, TextInput, View } from 'react-native';
import { styles } from '../styles/styles';

export function SearchedProfileScreen() {
	return (
		<>
			<View className={styles.container}>
				<Text className={styles.headingTwo}>Kinnected User</Text>
			</View>

			<View className={styles.container}>
				<Text className={styles.inputLabel}>Fullname</Text>
				<TextInput className={styles.textInput} />

				<Text className={styles.inputLabel}>Birthday</Text>
				<TextInput className={styles.textInput} />

				<Text className={styles.inputLabel}>City</Text>
				<TextInput className={styles.textInput} />
			</View>

			<Pressable className={styles.logIn}>
				<Text className={styles.submitButtonText}>Add Connection</Text>
			</Pressable>
		</>
	);
}
