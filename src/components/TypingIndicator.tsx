import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const TypingIndicator: FC = () => (
  <View style={styles.container}>
    <Text>Typing...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
    padding: 10,
  },
});
