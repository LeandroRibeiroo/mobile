import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import io from 'socket.io-client';
import { api } from '../../services/api';
import { IMessage, Message } from '../Message';
import { styles } from './styles';

let messagesQueue: IMessage[] = [];

const socket = io(String(api.defaults.baseURL));
socket.on('new_message', (newMessage) => {
  messagesQueue.push(newMessage);
});

export function MessageList() {
  const [currentMessages, setCurrentMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    async function fetchMessages() {
      const messagesResponse = await api.get<IMessage[]>('/messages/last3');
      setCurrentMessages(messagesResponse.data);
    }

    fetchMessages();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setCurrentMessages((prevState) => [
          messagesQueue[0],
          prevState[0],
          prevState[1],
        ]);
        messagesQueue.shift();
      }

      return () => {
        clearInterval(timer);
      };
    }, 3000);
  }, []);

  return (
    <ScrollView
      keyboardShouldPersistTaps="never"
      contentContainerStyle={styles.content}
      style={styles.container}
    >
      {currentMessages.map((message) => (
        <Message data={message} key={message.id} />
      ))}
    </ScrollView>
  );
}
