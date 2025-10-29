import React, { FC, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import { IconButton } from '../atoms/Icon';

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

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <Input
          value={text}
          onChangeText={setText}
          placeholder="Type..."
          multiline
        />
      </View>
      <View style={styles.actions}>
        <IconButton onPress={() => {}} />
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
    padding: 20,
    backgroundColor: '#F0F0F0',
  },
  inputView: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
  },
});
