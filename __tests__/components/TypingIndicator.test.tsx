import React from 'react';
import { render } from '@testing-library/react-native';
import { TypingIndicator } from '../../src/components/TypingIndicator';

describe('TypingIndicator', () => {
  it('should render typing indicator text', () => {
    const { getByText } = render(<TypingIndicator />);
    expect(getByText('Typing...')).toBeTruthy();
  });

  it('should render with correct styling', () => {
    const { getByText } = render(<TypingIndicator />);
    const text = getByText('Typing...');

    expect(text.props.allowFontScaling).toBe(false);
    expect(text.props.numberOfLines).toBe(1);
    expect(text.props.style).toEqual(
      expect.objectContaining({
        fontSize: 14,
      }),
    );
  });

  it('should render in a container with proper styling', () => {
    const { getByTestId } = render(<TypingIndicator />);
    const container = getByTestId('typing-indicator');

    expect(container.props.style).toEqual(
      expect.objectContaining({
        height: 40,
        justifyContent: 'center',
        padding: 10,
      }),
    );
  });
});
