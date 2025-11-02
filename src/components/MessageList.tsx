import React, { FC, useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { MessageBubble, TypingIndicator } from '../components';
import { Message } from '../types/chat';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  onScroll: (isAtBottom: boolean) => void;
}

export const MessageList: FC<MessageListProps> = ({
  messages,
  isTyping,
  onScroll,
}) => {
  const flatListRef = useRef<FlatList>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const atBottom =
      contentOffset.y >= contentSize.height - layoutMeasurement.height - 10;
    setIsAtBottom(atBottom);
    onScroll(atBottom);
  };

  useEffect(() => {
    if (isAtBottom) flatListRef.current?.scrollToEnd();
  }, [messages, isAtBottom]);

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <MessageBubble message={item} />}
      showsVerticalScrollIndicator={false}
      onScroll={handleScroll}
      ListFooterComponent={isTyping ? <TypingIndicator /> : null}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    marginBottom: 100,
  },
});
