import React, { FC, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { IconButton, Input, Button } from '../components';
import colors from '../theme/colors';

interface ChatComposerProps {
  onSend: (text: string) => void;
  disabled: boolean;
}

export const ChatComposer: FC<ChatComposerProps> = ({ onSend, disabled }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text) {
      onSend(text);
      setText('');
    }
  };

  const handleRecording = () => {
    Alert.alert('Recording feature is not implemented yet.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <Input
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
          multiline
        />
      </View>
      <View style={styles.actions}>
        <IconButton onPress={handleRecording} />
        <Button
          title="Send"
          onPress={handleSend}
          disabled={disabled || !text}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 25,
    backgroundColor: colors.bgColor,
  },
  inputView: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
  },
});
