import React, { FC } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

interface ButtonProps {
  title: string;
  disabled?: boolean;
  onPress: () => void;
}

export const Button: FC<ButtonProps> = ({ title, onPress, disabled }) => (
  <TouchableOpacity
    style={[styles.button, disabled && styles.disabled]}
    onPress={onPress}
    disabled={disabled}
    activeOpacity={0.5}
  >
    <Text style={styles.titleText} allowFontScaling={false} numberOfLines={1}>
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.blue,
    height: 40,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
  titleText: {
    fontSize: 14,
    color: colors.black,
  },
});
