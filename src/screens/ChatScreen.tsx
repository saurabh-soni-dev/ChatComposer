import React, { FC, useState } from 'react';
import {
  View,
  StyleSheet,
  Switch,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useChat } from '../hooks/useChat';
import { useKeyboard } from '../hooks/useKeyboard';
import { ChatComposer, JumpToLatest, MessageList } from '../components';
import colors from '../theme/colors';

export const ChatScreen: FC = () => {
  const { messages, sendMessage, isTyping } = useChat();
  const { keyboardHeight } = useKeyboard();
  const [showJump, setShowJump] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [slowMode, setSlowMode] = useState(false);

  const handleSend = (text: string) => {
    sendMessage(text);
    if (!showJump) setUnreadCount(prev => prev + 1);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.toggles}>
        <Text
          style={styles.textStyle}
          allowFontScaling={false}
          numberOfLines={1}
        >
          Slow Mode:{' '}
        </Text>
        <Switch value={slowMode} onValueChange={setSlowMode} />
        {/* Add more toggles for ads, etc., as needed */}
      </View>
      <MessageList
        messages={messages}
        isTyping={isTyping}
        onScroll={isAtBottom => setShowJump(!isAtBottom)}
      />
      {showJump && (
        <JumpToLatest
          count={unreadCount}
          onPress={() => {
            setShowJump(false);
            setUnreadCount(0);
          }}
        />
      )}
      <View style={[styles.composer, { marginBottom: keyboardHeight }]}>
        <ChatComposer onSend={handleSend} disabled={false} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toggles: {
    flexDirection: 'row',
    padding: 10,
  },
  composer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  textStyle: {
    fontSize: 14,
    color: colors.black,
  },
});
