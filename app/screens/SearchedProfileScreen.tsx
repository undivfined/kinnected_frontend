import { Pressable, Text, TextInput, View } from 'react-native';
import {
	container,
	headingTwo,
	inputLabel,
	logIn,
	textInput,
} from '../styles/styles';

export function SearchedProfileScreen() {
	return (
		<>
			<View className={container}>
				<Text className={headingTwo}>Kinnected User</Text>
			</View>

			<View className={container}>
				<Text className={inputLabel}>Fullname</Text>
				<TextInput className={textInput} />

				<Text className={inputLabel}>Birthday</Text>
				<TextInput className={textInput} />

				<Text className={inputLabel}>City</Text>
				<TextInput className={textInput} />
			</View>

			<Pressable className={logIn}>
				<Text className='text-white'>Add Connection</Text>
			</Pressable>
		</>
	);
}
