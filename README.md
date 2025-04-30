# kinnected (app)

## Summary

kinnected is a mobile app designed to help people stay in touch with one another across countries and timezones, combining visual indicators with a messaging feature.

## Tech stack

- TypesSript
- React Native
- NativeWind
- Getstream
- Expo & Expo Go

## Features

- Login/Signup: Users can create accounts, providing such details as full name, date of birth, and timezone. While users are asked to provide a password for access to their account, there is currently no formal authentication implemented. However, passwords are stored in a hashed form
- Search: Users can search for other people's profiles by name and add them to connections
- Cards: "Dummy" profiles users can create to store information about people who do not use the app, for example their timezone, birthday and date of last contact. Cards are only visible to their creators
- Contacts screen: A list of a user's contacts, including both other people's profiles found and added to connections and custom cards created by the user. The list provides a brief summary about each person, including time since last contact, timezone and local time, and features visual indication for when a person might be available depending on their timezone
- Individual contact screens: Accessed by tapping a contact's avatar, these provide a summary about a person and the options to edit some (other users) or all (cards) of the information, delete a card / disconnect from a user, and chat (with another user)
- Own profile screen: An overview of the user's own details with the option to edit the details (in development). Although there is the option to select a picture from the device as an avatar, which would persist for the session, image upload and storage are currently not supported
- Messenger: Accessed by tapping a contact's tile in the contacts list or the chat icon on an individual contact's screen, this is a chat allowing for sending texts, GIFs and images and copying messages to the clipboard
- User experience: The app provides feedback to the user in the form of loading messages and popups to confirm a successful action or when there has been an error

## Using the app

Clone the repository and navigate to the directory. Then in the terminal:

- `npm i` to install React, React Native and the dependencies
- `npm run start` to serve the app with Expo.

There are a few options to try out the app.

### In the browser

The terminal will provide a link for opening the app in the browser. This is the simplest and quickest way to try out the app, but, as kinnected is a mobile app, some features are not supported in the browser, such as popups and date pickers.

### With Expo Go

There will be a QR-code provided in the terminal. Scanning it with the mobile Expo Go app will open kinnected on your phone and provide a fuller user experience compared to the browser. Please note that the messaging feature requires native code and is not available in Expo Go.

### In the iOS Simulator / Android Studio (messenging)

The messenging feature provided by Getstream only works in the iOS Simulator / Android studio. The code for the messenger would prevent the app opening in the browser / Expo Go and is commented out.
To try out messenging:

- uncomment the code in `/app/screens/MessagingScreen.tsx`
- in `/app/navigation/StackNavigator.tsx`, uncomment `import MessagingScreen from "../screens/MessagingScreen"` and `<Stack.Screen name="MessagingScreen" component={MessagingScreen} />`
- in the terminal, run `npm run android` or `npm run ios`
