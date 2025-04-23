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

	function onLogin() {
		getCredentials(userName)
			.then(({ password: hash }) => {
				bcrypt.compare(password, hash, (err, result) => {
					if (result) {
						navigation.navigate('ContactListScreen');
						getUserByUsername(userName).then((user) => {
							setUserDetails(user);
						});
					} else {
						setPassword('');
						Alert.alert('OOPS!', 'Incorrect!', [{ text: 'Understood' }]);
					}
				});
			})
			.catch((error) => {
				setPassword('');
				setUserName('');
				Alert.alert('OOPS!', 'Incorrect!', [{ text: 'Understood' }]);
			});
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
				onPress={() => {
					console.log('I forgot me password');
				}}
			>
				<Text className={styles.underline}>Forgotten Password</Text>
			</Pressable>

			<Pressable className={styles.logIn} onPress={onLogin}>
				<Text className={styles.submitButtonText}>Log In</Text>
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
