import React from 'react';
import { render } from '@testing-library/react-native';
import { MessageBubble } from '../../src/components/MessageBubble';

describe('MessageBubble', () => {
  const userMessage = {
    text: 'Hello World',
    sender: 'user',
  };

  const botMessage = {
    text: 'Hi there',
    sender: 'bot',
  };

  it('renders user message correctly', () => {
    const { getByText } = render(<MessageBubble message={userMessage} />);
    const messageText = getByText('Hello World');
    expect(messageText).toBeTruthy();
    const messageContainer = messageText.parent?.parent;
    expect(messageContainer?.props.style).toContainEqual(
      expect.objectContaining({ alignSelf: 'flex-end' }),
    );
  });

  it('renders bot message correctly', () => {
    const { getByText } = render(<MessageBubble message={botMessage} />);
    const messageText = getByText('Hi there');
    expect(messageText).toBeTruthy();
    const messageContainer = messageText.parent?.parent;
    expect(messageContainer?.props.style).not.toContainEqual(
      expect.objectContaining({ alignSelf: 'flex-end' }),
    );
  });
});
