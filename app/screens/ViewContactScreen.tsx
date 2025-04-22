import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import { Text, View } from 'react-native';
import { styles } from '../styles/styles';
import { useState } from 'react';
import ImageViewer from '../components/ImageViewer';
import { ScrollView } from 'react-native';
import { convertMilliseconds } from '../utils/milliseconds-day';

type Props = NativeStackScreenProps<RootStackParamList, 'ViewContactScreen'>;

export default function ViewContactScreen({ navigation, route }: Props) {
	const { contact } = route.params;

	const isWithinDaytimeHours = () => {
		const now = new Date();
		const hourString = now.toLocaleString(undefined, {
			timeZone: contact.timezone,
			hour: '2-digit',
			hour12: false,
		});

		const hour = parseInt(hourString, 10);
		return hour >= 8 && hour < 20;
	};

	const tileStyle = `border ${
		isWithinDaytimeHours() ? 'border-green-500' : 'border-red-500'
	} rounded-md w-[300px] bg-white mb-5 mt-5 p-4`;

	const getDaysSinceLastContact = (date_of_last_contact: string) => {
		const date1 = new Date(Date.now());
		const date2 = new Date(date_of_last_contact);
		return convertMilliseconds(
			Math.abs(date2.getTime() - date1.getTime()),
			'd'
		);
	};

	const getCurrentTime = (timezone: string) => {
		const now = new Date();
		return now.toLocaleTimeString('en-GB', {
			timeZone: timezone,
			hour: '2-digit',
			minute: '2-digit',
		});
	};


  if (contact.isCard) {
    return (
      <ScrollView>
        <View className={container}>
          <Text className={headingFour}>Kinnect Card</Text>
          <View className={profileImage}>
            <ImageViewer
              imgSource={
                contact.avatar_url
                  ? { uri: contact.avatar_url.trim() }
                  : require("../../assets/freepik-basic-placeholder-profile-picture.png")
              }
              className={profileImage}
            />
          </View>
          <Text className={headingFive}>{contact.name}</Text>
          <View className={tileStyle}>
            <View className="flex-row justify-between mb-2">
              <Text className="text-sm font-semibold text-gray-700">
                Last Contacted:
              </Text>
              <Text className="text-sm text-gray-500">
                {contact.date_of_last_contact
                  ? `${getDaysSinceLastContact(
                      contact.date_of_last_contact
                    )} days ago`
                  : "Not Contacted"}
              </Text>
            </View>


						<View className={styles.contactCardContainer}>
							<Text className={styles.fontTwo}>Current Time:</Text>
							<Text className={styles.fontThree}>
								{getCurrentTime(contact.timezone)}
							</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		);
	} else {
		return (
			<ScrollView>
				<View className={styles.container}>
					<Text className={styles.headingFour}>Kinnected User</Text>
					<View className={styles.profileImage}>
						<ImageViewer
							imgSource={
								contact.avatar_url.trim()
									? { uri: contact.avatar_url }
									: require('../../assets/freepik-basic-placeholder-profile-picture.png')
							}
							className={styles.profileImage}
						/>
					</View>
					<Text className={styles.headingFive}>{contact.name}</Text>
					<View className={tileStyle}>
						<View className={styles.gap}>
							<Text className={styles.contactCardContainer}>
								Last Contacted:
							</Text>
							<Text className={styles.fontThree}>
								{contact.date_of_last_contact
									? `${getDaysSinceLastContact(
											contact.date_of_last_contact
									  )} days ago`
									: 'Not Contacted'}
							</Text>
						</View>


            <View className="flex-row justify-between">
              <Text className="text-sm font-semibold text-gray-700">
                Current Time:
              </Text>
              <Text className="text-sm text-gray-500">
                {getCurrentTime(contact.timezone)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView>
        <View className={container}>
          <Text className={headingFour}>Kinnected User</Text>
          <View className={profileImage}>
            <ImageViewer
              imgSource={
                contact.avatar_url
                  ? { uri: contact.avatar_url.trim() }
                  : require("../../assets/freepik-basic-placeholder-profile-picture.png")
              }
              className={profileImage}
            />
          </View>
          <Text className={headingFive}>{contact.name}</Text>
          <View className={tileStyle}>
            <View className="flex-row justify-between mb-2">
              <Text className="text-sm font-semibold text-gray-700">
                Last Contacted:
              </Text>
              <Text className="text-sm text-gray-500">
                {contact.date_of_last_contact
                  ? `${getDaysSinceLastContact(
                      contact.date_of_last_contact
                    )} days ago`
                  : "Not Contacted"}
              </Text>
            </View>


						<View className={styles.contactCardContainer}>
							<Text className={styles.fontTwo}>Current Time:</Text>
							<Text className={styles.fontThree}>
								{getCurrentTime(contact.timezone)}
							</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		);
	}
}
