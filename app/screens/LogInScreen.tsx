import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import { RootStackParamList } from '../navigation/StackNavigator';
import { useContext, useState } from 'react';
import { styles } from '../styles/styles';
import bcrypt from 'react-native-bcrypt';
import { getCredentials, getUserByUsername } from '../../api';
import { UserContext } from '../context/UserContext';
import { UserDetails } from '../context/UserContext';
import DismissKeyboardView from '../utils/dismissKeyboardView';
type Props = NativeStackScreenProps<RootStackParamList, 'LogInScreen'>;

export default function LogInScreen({ navigation }: Props) {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const { userDetails, setUserDetails } = useContext(UserContext);
	const [isLoggingIn, setIsLoggingIn] = useState(false);

	function onLogin() {
		setIsLoggingIn(true)
		getCredentials(userName)
			.then(({ password: hash }) => {
				bcrypt.compare(password, hash, (err, result) => {
					if (result) {
						setIsLoggingIn(false)
						navigation.navigate('ContactListScreen');
						getUserByUsername(userName).then((user) => {
							setUserDetails(user);
						});
					} else {
						setIsLoggingIn(false)
						setPassword('');
						Alert.alert('OOPS!', 'Incorrect!', [{ text: 'Understood' }]);
					}
				});
			})
			.catch((error) => {
				setIsLoggingIn(false)
				setPassword('');
				setUserName('');
				Alert.alert('OOPS!', 'Incorrect!', [{ text: 'Understood' }]);
			})
	}

	return (
		<DismissKeyboardView>

		<View className={styles.container}>
			<Text className={styles.headingTwo}>Kinnected</Text>
			<Text className={styles.logInLabel}>Log in</Text>
			<TextInput
				className={styles.textInput}
				placeholder='enter your username here'
				onChangeText={setUserName}
				value={userName}
			/>

			<Text className={styles.logInLabel}>Password</Text>
			<TextInput
				className={styles.textInput}
				placeholder='enter your password here'
				onChangeText={setPassword}
				value={password}
				secureTextEntry={true}
			/>

			<Pressable
				onPress={() => {{  Alert.alert("Oh no!", "I forgot me password.", [
					{
					  text: "OK",
					  onPress: () => {
						
					  },
					},
				  ]);
				  } }}
			>
				<Text className={styles.underline}>Forgotten Password</Text>
			</Pressable>

			<Pressable className={styles.logIn} disabled={isLoggingIn} onPress={onLogin}>
				<Text className={styles.submitButtonText}>{isLoggingIn ? "Logging In..." : "Log In"}</Text>
			</Pressable>

			<Pressable
				className={styles.underline}
				onPress={() => {
					navigation.navigate('SignUpScreen');
				}}
			>
				<Text className={styles.underline}>Sign Up Here</Text>
			</Pressable>
		</View>
		</DismissKeyboardView>
	);
}
