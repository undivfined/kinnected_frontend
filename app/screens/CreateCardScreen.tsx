import {
	Alert,
	Pressable,
	ScrollView,
	Text,
	TextInput,
	View,
} from 'react-native';
import { useContext, useState } from 'react';
import DateTimePicker, {
	DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';

import { styles } from '../styles/styles';
import { NewCard } from '../../types/NewCardType';
import { UserContext } from '../context/UserContext';
import { postNewCard } from '../../api';

import DismissKeyboardView from '../utils/dismissKeyboardView';
import ImageViewer from '../components/ImageViewer';
import RelationshipDropdown from '../components/RelationshipDropdown';
import LastContactDatePicker from '../components/LastContactDatePicker';
import CountryDropdown from '../components/CountryDropdown';
import TimezonesDropdown from '../components/TimezonesDropdown';

const PlaceholderImage = require('../../assets/freepik-basic-placeholder-profile-picture.png');

type Props = NativeStackScreenProps<RootStackParamList, 'CreateCardScreen'>;

export default function CreateCardScreen({ navigation, route }: Props) {
	const {
		userDetails: { username },
	} = useContext(UserContext);

	const [newCardDetails, setNewCardDetails] = useState<NewCard>({
		creator_username: username!,
		name: '',
		type_of_relationship: '',
		timezone: '',
		date_of_birth: null,
		date_of_last_contact: null,
	});

	const [showCalender, setShowCalender] = useState<boolean>(false);
	const [countryTimezones, setCountryTimezones] = useState<string[]>([]);

	function onBirthdayChange(
		event: DateTimePickerEvent,
		selectedDate: Date | undefined
	) {
		if (event.type === 'set' && selectedDate) {
			setNewCardDetails((current) => {
				const newCard = {
					...current,
					date_of_birth: selectedDate.toISOString(),
				};
				return newCard;
			});
		}
		setShowCalender(false);
	}

	function handleCardChange(key: string, value: string) {
		setNewCardDetails((prev) => ({
			...prev,
			[key]: value,
		}));
	}

	function handleCreateCard() {
		const { name, timezone } = newCardDetails;

		if (!name || !timezone) {
			Alert.alert('OOPS!', 'Please fill in all the required fields', [
				{ text: 'Fine' },
			]);
			return;
		}

		postNewCard(newCardDetails)
			.then(() => {
				Alert.alert(
					'Success!',
					`You have created a card for ${newCardDetails.name}`,
					[
						{
							text: 'OK',
							onPress: () => {
								navigation.navigate('ContactListScreen');
							},
						},
					]
				);
			})
			.catch((err) => {
				Alert.alert('OOPS', 'Something went wrong', [
					{
						text: 'OK',
						onPress: () => {
							navigation.navigate('CreateCardScreen');
						},
					},
				]);
			});
	}

	return (
		<View className='flex-1'>
			<ScrollView contentContainerClassName='flex-grow'>
				<DismissKeyboardView>
					<View className='flex-1 justify-between'>
						<View className={styles.container}>
							<Text className='mb-5 text-2xl font-bold'>Create Card</Text>
							<View className={styles.profileImage}>
								<ImageViewer
									imgSource={PlaceholderImage}
									className={styles.profileImage}
								/>
							</View>

							<View>
								<Text className={styles.inputLabel}>Full Name *</Text>
								<TextInput
									className='bg-white w-[300px] h-[50px] border border-black rounded-md mb-5 flex items-center justify-center px-3'
									placeholder='Enter full name'
									value={newCardDetails.name}
									onChangeText={(text) => {
										setNewCardDetails((prev) => ({
											...prev,
											name: text,
										}));
									}}
								/>
							</View>

							<View>
								<Text className={styles.inputLabel}>Birthday</Text>

								<Pressable
									onPress={() => setShowCalender(true)}
									className='bg-white w-[300px] h-[50px] border border-black rounded-md mb-5 flex justify-center px-3'
								>
									<Text>
										{newCardDetails.date_of_birth
											? new Date(
													newCardDetails.date_of_birth
											  ).toLocaleDateString()
											: 'Set birthday'}
									</Text>
								</Pressable>

								{showCalender && (
									<DateTimePicker
										value={new Date(newCardDetails.date_of_birth || new Date())}
										mode='date'
										display='default'
										onChange={(event, selectedDate) => {
											onBirthdayChange(event, selectedDate);
										}}
									/>
								)}
							</View>

							<Text className={styles.inputLabel}>Country *</Text>
							<CountryDropdown setCountryTimezones={setCountryTimezones} />

							<Text className={styles.inputLabel}>Timezone *</Text>
							<TimezonesDropdown
								setNewUserDetails={setNewCardDetails}
								countryTimezones={countryTimezones}
								newUserDetails={newCardDetails}
							/>

							<View>
								<Text className={styles.inputLabel}>Relationship Type</Text>
								<RelationshipDropdown
									value={newCardDetails}
									setter={handleCardChange}
								/>
							</View>

							<View>
								<Text className={styles.inputLabel}>Date of Last Contact</Text>

								<LastContactDatePicker
									setter={handleCardChange}
									value={newCardDetails}
								/>
							</View>

							<Text className='text-m font-bold text-left w-[300px]'>
								* Required Fields
							</Text>

							<View>
								<Pressable className={styles.logIn}>
									<Text className='text-white' onPress={handleCreateCard}>
										Create Card
									</Text>
								</Pressable>
							</View>
						</View>
					</View>
				</DismissKeyboardView>
			</ScrollView>
		</View>
	);
}
