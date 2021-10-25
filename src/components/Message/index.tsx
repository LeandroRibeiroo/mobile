import React from 'react';
import { Text, View } from 'react-native';
import { MotiView } from '@motify/components';
import { UserPhoto } from '../UserPhoto';
import { styles } from './styles';

export interface IMessage {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

export interface IMessageData {
  data: IMessage;
}

export function Message({ data }: IMessageData) {
  return (
    <MotiView
      from={{
        opacity: 0,
        translateY: -50,
      }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 700 }}
      style={styles.container}
    >
      <Text style={styles.message}>{data.text}</Text>

      <View style={styles.footer}>
        <UserPhoto sizes="SMALL" imageUri={data.user.avatar_url} />

        <Text style={styles.username}>{data.user.name}</Text>
      </View>
    </MotiView>
  );
}
