import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { styles } from './styles';
import { Header } from '../../components/Header';
import { MessageList } from '../../components/MessageList';
import { SendMessageForm } from '../../components/SendMessageForm';
import { SignInBox } from '../../components/SignInBox';
import { useAuth } from '../../hooks/auth';

export function Home() {
  const { user } = useAuth();
  return (
    <>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          <Header />
          <MessageList />

          {user ? <SendMessageForm /> : <SignInBox />}
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
