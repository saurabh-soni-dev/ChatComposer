import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../../src/components/Button';

describe('Button', () => {
  const mockOnPress = jest.fn();
  const defaultProps = {
    title: 'Test Button',
    onPress: mockOnPress,
  };

  beforeEach(() => {
    mockOnPress.mockClear();
  });

  it('renders correctly with title', () => {
    const { getByText } = render(<Button {...defaultProps} />);
    const buttonTitle = getByText('Test Button');
    expect(buttonTitle).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const { getByText } = render(<Button {...defaultProps} />);
    const button = getByText('Test Button');
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    const { getByText } = render(<Button {...defaultProps} disabled={true} />);
    const button = getByText('Test Button');
    fireEvent.press(button);
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('does not call onPress when disabled', () => {
    const { getByText } = render(<Button {...defaultProps} disabled={true} />);
    const button = getByText('Test Button');
    fireEvent.press(button);
    expect(mockOnPress).not.toHaveBeenCalled();
  });
});
