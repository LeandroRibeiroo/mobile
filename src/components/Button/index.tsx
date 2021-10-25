import React from 'react';
import {
  ColorValue,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styles } from './styles';
import { COLORS } from '../../theme';

interface IButton extends TouchableOpacityProps {
  color: ColorValue;
  title: string;
  backgroundColor: ColorValue;
  icon?: React.ComponentProps<typeof AntDesign>['name'];
  isLoading?: boolean;
}

export function Button({
  color,
  title,
  backgroundColor,
  icon,
  isLoading = false,
  ...props
}: IButton) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={isLoading}
      style={[styles.container, { backgroundColor }]}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={COLORS.BLACK_PRIMARY} size={24} />
      ) : (
        <>
          <AntDesign name={icon} size={24} style={styles.icon} />
          <Text style={[styles.title, { color }]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}
