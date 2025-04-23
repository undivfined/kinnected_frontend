
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { RootStackParamList } from "../navigation/StackNavigator";
// import { View, ActivityIndicator, StyleSheet } from 'react-native';
// import {useEffect, useState} from 'react'

// import { Chat, OverlayProvider, Channel, MessageList, MessageInput, useCreateChatClient } from "stream-chat-react-native";
// import { MessagingProvider } from "../context/MessagingContext";

//  //config
// const chatApiKey= 'xrxyswr6gz73';
// const chatUserId= 'test_user_1'; 
// const chatUserName = 'Victor24'; 
// const chatUserToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVzdF91c2VyXzEifQ.eEHt0TGMmR-yZ-3a1NZd3LYToR2ZUrjp-Za2fHvM9QM'

// const user = {
//     id: chatUserId,
//     name: chatUserName,
//   };

// type Props = NativeStackScreenProps<RootStackParamList, "MessagingScreen">;

// export default function MessagingScreen(): JSX.Element {

//     const client = useCreateChatClient({
//         apiKey: chatApiKey,
//         userData: user,
//         tokenOrProvider: chatUserToken,
//       })

//     const [channel, setChannel] = useState<any>(null);
//     const [isReady, setIsReady] = useState(false);


//     useEffect(() => {
//         if (!client) return;
        
//         client
//           .connectUser(
//             {
//               id: chatUserId,
//               name: chatUserName,
//               image: '',
//             },
//             chatUserToken //<---
//           )
//           .then(() => {
//             const sortedMembers = [chatUserId].sort().join('-');
//             const channelId = `dm-${sortedMembers}`;
    
//             const newChannel = client.channel("messaging", channelId, {
//                 members: [chatUserId],
//               });
      
//               return newChannel.watch().then(() => {
//                 setChannel(newChannel);
//                 setIsReady(true);
//               });
//             })
//             .catch((error: unknown) => {
//               console.error("Stream setup error:", error);
//             });
      
//           return () => {
//             client
//               .disconnectUser()
//               .catch((err: unknown) => console.error("Disconnection error:", err));
//           };
//         }, [client]);
      
//         if (!client || !isReady || !channel) {
//           return (
//             <View style={styles.loadingContainer}>
//               <ActivityIndicator size="large" />
//             </View>
//           );
//         }
      
//         return (
//           <OverlayProvider>
//             <MessagingProvider>
//               <Chat client={client}>
//                 <Channel channel={channel}>
//                   <View style={styles.container}>
//                     <MessageList />
//                     <MessageInput />
//                   </View>
//                 </Channel>
//               </Chat>
//             </MessagingProvider>
//           </OverlayProvider>
//         );
//       }

//       const styles = StyleSheet.create({
//         container: {
//           flex: 1,
//         },
//         loadingContainer: {
//           flex: 1,
//           justifyContent: "center",
//           alignItems: "center",
//         },
//       });