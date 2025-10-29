import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const JumpToLatest: React.FC<{ count: number; onPress: () => void }> = ({
  count,
  onPress,
}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text>Jump to Latest ({count})</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
  },
});
