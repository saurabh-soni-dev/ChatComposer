import { renderHook, act } from '@testing-library/react-native';
import { Keyboard, KeyboardEvent } from 'react-native';
import { useKeyboard } from '../../src/hooks/useKeyboard';

describe('useKeyboard', () => {
  let showCallback: (event: KeyboardEvent) => void;
  let hideCallback: () => void;

  beforeEach(() => {
    showCallback = () => {};
    hideCallback = () => {};

    // Mock Keyboard.addListener
    jest
      .spyOn(Keyboard, 'addListener')
      .mockImplementation((eventName, callback) => {
        if (eventName === 'keyboardDidShow') {
          showCallback = callback;
        } else if (eventName === 'keyboardDidHide') {
          hideCallback = callback;
        }
        return {
          remove: jest.fn(),
        };
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with 0 keyboard height', () => {
    const { result } = renderHook(() => useKeyboard());
    expect(result.current.keyboardHeight).toBe(0);
  });

  it('should update keyboard height when keyboard shows', () => {
    const { result } = renderHook(() => useKeyboard());

    act(() => {
      showCallback({
        endCoordinates: { height: 300, screenX: 0, screenY: 500, width: 400 },
        duration: 250,
        easing: 'keyboard',
        startCoordinates: { height: 0, screenX: 0, screenY: 800, width: 400 },
      });
    });

    expect(result.current.keyboardHeight).toBe(300);
  });

  it('should set keyboard height to 0 when keyboard hides', () => {
    const { result } = renderHook(() => useKeyboard());

    // First show the keyboard
    act(() => {
      showCallback({
        endCoordinates: { height: 300, screenX: 0, screenY: 500, width: 400 },
        duration: 250,
        easing: 'keyboard',
        startCoordinates: { height: 0, screenX: 0, screenY: 800, width: 400 },
      });
    });

    // Then hide it
    act(() => {
      hideCallback();
    });

    expect(result.current.keyboardHeight).toBe(0);
  });

  it('should cleanup listeners on unmount', () => {
    const removeMock = jest.fn();
    (Keyboard.addListener as jest.Mock).mockReturnValue({ remove: removeMock });

    const { unmount } = renderHook(() => useKeyboard());
    unmount();

    expect(removeMock).toHaveBeenCalledTimes(2);
  });
});
