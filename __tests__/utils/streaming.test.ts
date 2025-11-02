import { simulateStreaming } from '../../src/utils/streaming';
import { Message } from '../../src/types/chat';

describe('simulateStreaming', () => {
  let mockMessage: Message;
  let mockOnUpdate: jest.Mock;
  let mockOnComplete: jest.Mock;

  beforeEach(() => {
    jest.useFakeTimers();
    mockMessage = {
      id: '1',
      text: 'Hello world test',
      sender: 'assistant',
      timestamp: new Date(),
      isStreaming: true,
    };
    mockOnUpdate = jest.fn();
    mockOnComplete = jest.fn();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should stream message text word by word', () => {
    simulateStreaming(mockMessage, mockOnUpdate, mockOnComplete);

    // First word
    jest.advanceTimersByTime(45);
    expect(mockOnUpdate).toHaveBeenCalledWith({
      ...mockMessage,
      text: 'Hello',
    });

    // Second word
    jest.advanceTimersByTime(45);
    expect(mockOnUpdate).toHaveBeenCalledWith({
      ...mockMessage,
      text: 'Hello world',
    });

    // Third word
    jest.advanceTimersByTime(45);
    expect(mockOnUpdate).toHaveBeenCalledWith({
      ...mockMessage,
      text: 'Hello world test',
    });

    // Should complete after all words
    jest.advanceTimersByTime(45);
    expect(mockOnComplete).toHaveBeenCalled();
  });

  it('should cleanup interval on completion', () => {
    simulateStreaming(mockMessage, mockOnUpdate, mockOnComplete);

    // Fast forward through all updates
    jest.advanceTimersByTime(45 * 4);

    // Clear any pending timers
    jest.clearAllTimers();

    // No more updates should occur
    mockOnUpdate.mockClear();
    jest.advanceTimersByTime(45);
    expect(mockOnUpdate).not.toHaveBeenCalled();
  });
});
