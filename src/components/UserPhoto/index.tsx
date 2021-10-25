import React from 'react';
import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import defaultAvatarImage from '../../assets/avatar.png';
import { styles } from './styles';
import { COLORS } from '../../theme';

const SIZES = {
  SMALL: {
    containerSize: 32,
    avatarSize: 28,
  },
  NORMAL: {
    containerSize: 48,
    avatarSize: 42,
  },
};

interface IUserPhoto {
  imageUri?: string;
  sizes?: 'SMALL' | 'NORMAL';
}

const avatar_default = Image.resolveAssetSource(defaultAvatarImage).uri;

export function UserPhoto({ imageUri, sizes = 'NORMAL' }: IUserPhoto) {
  const { containerSize, avatarSize } = SIZES[sizes];

  return (
    <LinearGradient
      start={{ x: 0, y: 0.8 }}
      end={{ x: 0.9, y: 1 }}
      colors={[COLORS.PINK, COLORS.YELLOW]}
      style={[
        styles.container,
        {
          width: containerSize,
          height: containerSize,
          borderRadius: containerSize / 2,
        },
      ]}
    >
      <Image
        style={[
          styles.avatar,
          {
            width: avatarSize,
            height: avatarSize,
            borderRadius: avatarSize / 2,
          },
        ]}
        source={{ uri: imageUri ?? avatar_default }}
      />
    </LinearGradient>
  );
}
