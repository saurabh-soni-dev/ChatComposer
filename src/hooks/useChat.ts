import { useState, useCallback } from 'react';
import { Message } from '../types/chat';
import { simulateStreaming } from '../utils/streaming';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback((text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);

    setIsTyping(true);
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Chatbot response.',
        sender: 'assistant',
        timestamp: new Date(),
        isStreaming: true,
      };
      setMessages(prev => [...prev, assistantMessage]);
      simulateStreaming(
        assistantMessage,
        updated => {
          setMessages(prev =>
            prev.map(m => (m.id === updated.id ? updated : m)),
          );
        },
        () => {
          setMessages(prev => prev.map(m => ({ ...m, isStreaming: false })));
          setIsTyping(false);
        },
      );
    }, 1000);
  }, []);

  return { messages, sendMessage, isTyping };
};
