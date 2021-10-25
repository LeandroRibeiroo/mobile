import React from 'react';
import { View } from 'react-native';
import { COLORS } from '../../theme';
import { Button } from '../Button';
import { useAuth } from '../../hooks/auth';
import { styles } from './styles';

export function SignInBox() {
  const { signIn, isSignIn } = useAuth();
  return (
    <View style={styles.container}>
      <Button
        icon="github"
        title="Entrar com o Github"
        color={COLORS.BLACK_PRIMARY}
        backgroundColor={COLORS.YELLOW}
        onPress={signIn}
        isLoading={isSignIn}
      />
    </View>
  );
}
