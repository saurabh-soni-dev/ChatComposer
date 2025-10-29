import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

interface MessageBubbleProps {
  message: {
    text: string;
    sender: string;
  };
}

export const MessageBubble: FC<MessageBubbleProps> = ({ message }) => (
  <View style={[styles.bubble, message.sender === 'user' && styles.user]}>
    <Text style={styles.textStyle} allowFontScaling={false} numberOfLines={1}>
      {message.text}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: colors.bgBubble,
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
  user: {
    alignSelf: 'flex-end',
  },
  textStyle: {
    fontSize: 14,
    color: colors.black,
  },
});
