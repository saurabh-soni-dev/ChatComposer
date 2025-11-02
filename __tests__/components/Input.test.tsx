import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Input } from '../../src/components/Input';

describe('Input', () => {
  const mockOnChangeText = jest.fn();
  const defaultProps = {
    value: '',
    onChangeText: mockOnChangeText,
    placeholder: 'Type something...',
  };

  beforeEach(() => {
    mockOnChangeText.mockClear();
  });

  it('renders correctly with placeholder', () => {
    const { getByPlaceholderText } = render(<Input {...defaultProps} />);
    const input = getByPlaceholderText('Type something...');
    expect(input).toBeTruthy();
  });

  it('shows the correct value', () => {
    const props = { ...defaultProps, value: 'test value' };
    const { getByDisplayValue } = render(<Input {...props} />);
    const input = getByDisplayValue('test value');
    expect(input).toBeTruthy();
  });

  it('calls onChangeText when text changes', () => {
    const { getByPlaceholderText } = render(<Input {...defaultProps} />);
    const input = getByPlaceholderText('Type something...');
    fireEvent.changeText(input, 'new text');
    expect(mockOnChangeText).toHaveBeenCalledWith('new text');
  });

  it('applies multiline styles when multiline prop is true', () => {
    const { getByPlaceholderText } = render(
      <Input {...defaultProps} multiline={true} />,
    );
    const input = getByPlaceholderText('Type something...');
    expect(input.props.style).toContainEqual(
      expect.objectContaining({ maxHeight: 120 }),
    );
  });
});
