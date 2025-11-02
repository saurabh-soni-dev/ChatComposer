import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { JumpToLatest } from '../../src/components/JumpToLatest';

describe('JumpToLatest', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    mockOnPress.mockClear();
  });

  it('should render with correct count', () => {
    const { getByText } = render(
      <JumpToLatest count={5} onPress={mockOnPress} />,
    );

    expect(getByText('Jump to Latest (5)')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const { getByText } = render(
      <JumpToLatest count={1} onPress={mockOnPress} />,
    );

    const button = getByText('Jump to Latest (1)');
    fireEvent.press(button);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should display 0 count correctly', () => {
    const { getByText } = render(
      <JumpToLatest count={0} onPress={mockOnPress} />,
    );

    expect(getByText('Jump to Latest (0)')).toBeTruthy();
  });
});
