import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MessageList } from '../../src/components/MessageList';
import { Message } from '../../src/types/chat';

describe('MessageList', () => {
  const mockOnScroll = jest.fn();
  const mockMessages: Message[] = [
    {
      id: '1',
      text: 'Hello',
      sender: 'user',
      timestamp: new Date(),
    },
    {
      id: '2',
      text: 'Hi there',
      sender: 'assistant',
      timestamp: new Date(),
    },
  ];

  beforeEach(() => {
    mockOnScroll.mockClear();
  });

  it('should render messages correctly', () => {
    const { getByText } = render(
      <MessageList
        messages={mockMessages}
        isTyping={false}
        onScroll={mockOnScroll}
      />,
    );

    expect(getByText('Hello')).toBeTruthy();
    expect(getByText('Hi there')).toBeTruthy();
  });

  it('should show typing indicator when isTyping is true', () => {
    const { getByTestId } = render(
      <MessageList
        messages={mockMessages}
        isTyping={true}
        onScroll={mockOnScroll}
      />,
    );

    expect(getByTestId('typing-indicator')).toBeTruthy();
  });

  it('should not show typing indicator when isTyping is false', () => {
    const { queryByTestId } = render(
      <MessageList
        messages={mockMessages}
        isTyping={false}
        onScroll={mockOnScroll}
      />,
    );

    expect(queryByTestId('typing-indicator')).toBeNull();
  });

  it('should call onScroll with correct boolean when scrolling', () => {
    const { getByTestId } = render(
      <MessageList
        messages={mockMessages}
        isTyping={false}
        onScroll={mockOnScroll}
      />,
    );

    const flatList = getByTestId('message-list');

    // Simulate scroll not at bottom
    fireEvent.scroll(flatList, {
      nativeEvent: {
        contentOffset: { y: 0 },
        contentSize: { height: 500 },
        layoutMeasurement: { height: 300 },
      },
    });

    expect(mockOnScroll).toHaveBeenCalledWith(false);

    // Simulate scroll at bottom
    fireEvent.scroll(flatList, {
      nativeEvent: {
        contentOffset: { y: 200 },
        contentSize: { height: 500 },
        layoutMeasurement: { height: 300 },
      },
    });

    expect(mockOnScroll).toHaveBeenCalledWith(true);
  });

  it('should handle empty message list', () => {
    const { queryByTestId } = render(
      <MessageList messages={[]} isTyping={false} onScroll={mockOnScroll} />,
    );

    expect(queryByTestId('message-list')).toBeTruthy();
  });
});
