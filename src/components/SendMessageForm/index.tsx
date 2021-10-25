import React, { useState } from 'react';
import { Alert, Keyboard, TextInput, View } from 'react-native';
import { styles } from './styles';
import { COLORS } from '../../theme';
import { Button } from '../Button';
import { api } from '../../services/api';

export function SendMessageForm() {
  const [message, setMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  async function handleMessageSubmit() {
    const formatedMessage = message.trim();
    setSendingMessage(true);

    if (formatedMessage.length > 0) {
      await api.post('/messages', {
        message: formatedMessage,
      });
      setMessage('');
      Keyboard.dismiss();
      Alert.alert('Mensagem enviada com sucesso!');
    } else {
      setSendingMessage(false);
      Alert.alert('Escreva alguma mensagem para poder enviar!');
    }
    setSendingMessage(false);
  }

  return (
    <View style={styles.container}>
      <TextInput
        keyboardAppearance="dark"
        placeholder="Qual a sua expectativa para o DO WHILE 2021?"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        editable={!sendingMessage}
      />

      <Button
        title="Enviar mensagem"
        color={COLORS.WHITE}
        backgroundColor={COLORS.PINK}
        isLoading={sendingMessage}
        onPress={handleMessageSubmit}
      />
    </View>
  );
}
