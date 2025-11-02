import React, { FC } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../theme/colors';

interface IconProps {
  onPress: () => void;
}

export const IconButton: FC<IconProps> = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.card} activeOpacity={0.5}>
    <Image source={require('../assets/icons/mic.png')} style={styles.icon} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    height: 40,
    width: 40,
    marginHorizontal: 10,
    borderRadius: 5,
    borderWidth: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 22,
    width: 22,
    tintColor: colors.black,
  },
});
