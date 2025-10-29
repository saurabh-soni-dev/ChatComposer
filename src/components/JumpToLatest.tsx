import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export const JumpToLatest: React.FC<{ count: number; onPress: () => void }> = ({
  count,
  onPress,
}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.textStyle} allowFontScaling={false} numberOfLines={1}>
      Jump to Latest ({count})
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
  },
  textStyle: {
    fontSize: 14,
    color: colors.black,
  },
});
