import { Message } from '../types/chat';

export const simulateStreaming = (
  message: Message,
  onUpdate: (updatedMessage: Message) => void,
  onComplete: () => void,
) => {
  const tokens = message.text.split(' ');
  let index = 0;
  const interval = setInterval(() => {
    if (index < tokens.length) {
      const partialText = tokens.slice(0, index + 1).join(' ');
      onUpdate({ ...message, text: partialText });
      index++;
    } else {
      clearInterval(interval);
      onComplete();
    }
  }, 45); // 30-60ms/token
};
