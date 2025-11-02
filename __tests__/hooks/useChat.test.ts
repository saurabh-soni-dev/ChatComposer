import { renderHook, act } from '@testing-library/react-native';
import { useChat } from '../../src/hooks/useChat';
import { simulateStreaming } from '../../src/utils/streaming';

// Mock the streaming utility
jest.mock('../../src/utils/streaming', () => ({
  simulateStreaming: jest.fn((message, onUpdate, onComplete) => {
    // Simulate immediate completion for testing
    onComplete();
  }),
}));

describe('useChat', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    (simulateStreaming as jest.Mock).mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should initialize with empty messages and not typing', () => {
    const { result } = renderHook(() => useChat());

    expect(result.current.messages).toEqual([]);
    expect(result.current.isTyping).toBe(false);
  });

  it('should add user message when sending', () => {
    const { result } = renderHook(() => useChat());

    act(() => {
      result.current.sendMessage('Hello');
    });

    expect(result.current.messages[0]).toMatchObject({
      text: 'Hello',
      sender: 'user',
    });
  });

  it('should set typing status when sending message', () => {
    const { result } = renderHook(() => useChat());

    act(() => {
      result.current.sendMessage('Hello');
    });

    expect(result.current.isTyping).toBe(true);
  });

  it('should add assistant message after delay', () => {
    const { result } = renderHook(() => useChat());

    act(() => {
      result.current.sendMessage('Hello');
    });

    // Fast forward past the delay
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.messages).toHaveLength(2);
    expect(result.current.messages[1]).toMatchObject({
      text: 'Chatbot response.',
      sender: 'assistant',
    });
  });

  it('should start streaming after assistant message is added', () => {
    const { result } = renderHook(() => useChat());

    act(() => {
      result.current.sendMessage('Hello');
      jest.advanceTimersByTime(1000);
    });

    expect(simulateStreaming).toHaveBeenCalled();
    expect(result.current.isTyping).toBe(false);
  });
});
