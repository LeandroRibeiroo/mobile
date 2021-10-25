import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LogoSVG from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import { UserPhoto } from '../UserPhoto';
import { styles } from './styles';

export function Header() {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <LogoSVG />

      <View style={styles.logoutButton}>
        {user ? (
          <TouchableOpacity onPress={signOut}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        ) : null}
        <UserPhoto imageUri={user?.avatar_url} />
      </View>
    </View>
  );
}
