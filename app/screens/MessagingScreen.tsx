import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
  OverlayProvider,
} from 'stream-chat-react-native';
import { StreamChat } from 'stream-chat';

type MessagingScreenRouteProp = RouteProp<RootStackParamList, 'MessagingScreen'>;

const chatApiKey = 'xrxyswr6gz73';
const chatUserId = 'victor24';
const chatUserName = 'victor24';
const userToken = StreamChat.getInstance(chatApiKey).devToken(chatUserId);

export default function MessagingScreen(): JSX.Element {
  const route = useRoute<MessagingScreenRouteProp>();
  const otherUserId = route.params?.username;

  const [client, setClient] = useState<StreamChat | null>(null);
  const [channel, setChannel] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!otherUserId) return;

    const chatClient = StreamChat.getInstance(chatApiKey);

    chatClient
      .connectUser(
        {
          id: chatUserId,
          name: chatUserName,
        },
        userToken
      )
      .then(() => {
        const channelId = ['dm', ...[chatUserId, otherUserId].sort()].join('-');

        const newChannel = chatClient.channel('messaging', channelId, {
          members: [
            { user_id: chatUserId },
            { user_id: otherUserId },
          ],
        });

        return newChannel.watch().then(() => {
          setClient(chatClient);
          setChannel(newChannel);
          setIsReady(true);
        });
      })
      .catch((err) => {
        console.error('Stream Chat setup failed:', err);
      });

    return () => {
      chatClient.disconnectUser().catch((err) =>
        console.error('Disconnect failed:', err)
      );
    };
  }, [otherUserId]);

  if (!client || !isReady || !channel) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <OverlayProvider>
      <Chat client={client}>
        <Channel channel={channel}>
          <View style={styles.container}>
            <MessageList />
            <MessageInput />
          </View>
        </Channel>
      </Chat>
    </OverlayProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
