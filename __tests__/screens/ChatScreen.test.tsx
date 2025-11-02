import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ChatScreen } from '../../src/screens/ChatScreen';
import { useChat } from '../../src/hooks/useChat';
import { useKeyboard } from '../../src/hooks/useKeyboard';
import { Message } from '../../src/types/chat';

// Mock the hooks
jest.mock('../../src/hooks/useChat', () => ({
  useChat: jest.fn(),
}));

jest.mock('../../src/hooks/useKeyboard', () => ({
  useKeyboard: jest.fn(),
}));

describe('ChatScreen', () => {
  const mockMessages: Message[] = [];
  const mockSendMessage = jest.fn();

  beforeEach(() => {
    (useChat as jest.Mock).mockReturnValue({
      messages: mockMessages,
      sendMessage: mockSendMessage,
      isTyping: false,
    });

    (useKeyboard as jest.Mock).mockReturnValue({
      keyboardHeight: 0,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send message when text is entered and send button is pressed', () => {
    const { getByPlaceholderText, getByText } = render(<ChatScreen />);
    const input = getByPlaceholderText('Type a message...');

    fireEvent.changeText(input, 'Hello');

    const sendButton = getByText('Send');
    fireEvent.press(sendButton);

    expect(mockSendMessage).toHaveBeenCalledWith('Hello');
  });

  it('should handle sending messages', () => {
    const { getByPlaceholderText, getByText } = render(<ChatScreen />);

    // Type and send a message
    const input = getByPlaceholderText('Type a message...');
    fireEvent.changeText(input, 'Test message');

    const sendButton = getByText('Send');
    fireEvent.press(sendButton);

    expect(mockSendMessage).toHaveBeenCalledWith('Test message');
  });
});
