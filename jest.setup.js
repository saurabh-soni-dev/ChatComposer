import '@testing-library/jest-native/extend-expect';
import { jest } from '@jest/globals';

// Mock the SafeAreaContext
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));

// Mock the colors module
jest.mock('./src/theme/colors', () => ({
  blue: '#007AFF',
  black: '#000000',
  white: '#FFFFFF',
  bgBubble: '#F0F0F0',
}));
