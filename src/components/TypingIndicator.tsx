import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export const TypingIndicator: FC = () => (
  <View style={styles.container} testID="typing-indicator">
    <Text allowFontScaling={false} numberOfLines={1} style={styles.textStyle}>
      Typing...
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
    padding: 10,
  },
  textStyle: {
    fontSize: 14,
    color: colors.black,
  },
});
