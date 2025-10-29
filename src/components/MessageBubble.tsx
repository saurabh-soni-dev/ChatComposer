import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MessageBubbleProps {
  message: {
    text: string;
    sender: string;
  };
}

export const MessageBubble: FC<MessageBubbleProps> = ({ message }) => (
  <View style={[styles.bubble, message.sender === 'user' && styles.user]}>
    <Text>{message.text}</Text>
  </View>
);

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: '#E5E5EA',
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
  user: {
    alignSelf: 'flex-end',
  },
});
