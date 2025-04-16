import { View, Text, TextInput, Pressable } from 'react-native';
import {
	container,
	headingOne,
	logIn,
	skipPress,
	strapLine,
	textInput,
} from '../styles/styles';

export default function ConnectAfterSignUp() {
	return (
		<>
			<View>
				<Text className={skipPress}>SKIP</Text>
			</View>
			<View className={container}>
				<Text className={headingOne}>
					Would you like to kinnect to an existing user?
				</Text>
				{/* change to h2 style label later */}
				<Text className={strapLine}>find someone you know</Text>
				<TextInput
					className={textInput}
					placeholder='enter your their username or their full name'
				/>
				{/* change to submit button later vv */}
				<Pressable
					className={logIn}
					onPress={() => {
						console.log('Finding your Kinnections...');
					}}
				>
					<Text className='text-white'>Let's Kinnect</Text>
				</Pressable>
			</View>
		</>
	);
}
