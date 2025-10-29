import React, { FC } from 'react';
import { TextInput, StyleSheet } from 'react-native';

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
    placeholder={placeholder ?? 'Typing...'}
    placeholderTextColor={'black'}
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
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
    color: 'black',
  },
  multiline: {
    maxHeight: 120,
  }, // For 6 lines
});
