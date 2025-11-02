import React, { FC } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import colors from '../theme/colors';

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
}

export const Input: FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  multiline,
}) => (
  <TextInput
    style={[styles.input, multiline && styles.multiline]}
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    placeholderTextColor={colors.black}
    multiline={multiline}
    autoCorrect={false}
    keyboardType={'default'}
    numberOfLines={6}
    cursorColor={'black'}
    autoCapitalize={'none'}
    allowFontScaling={false}
  />
);

const styles = StyleSheet.create({
  input: {
    borderWidth: 0.2,
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
    color: colors.black,
  },
  multiline: {
    maxHeight: 120,
  },
});
