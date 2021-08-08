import { ChangeEvent, KeyboardEvent, memo, useCallback } from 'react';

import { IInputProps } from './Input';

export const DefaultInput = memo(
  ({ placeholder, value, onChange, onEnter, ...props }: IInputProps) => {
    const handleEnter = useCallback(
      (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.code === 'Enter' && onEnter) {
          onEnter();
        }
      },
      [onEnter]
    );

    const handleChange = useCallback(
      ({ target: { value: newValue } }: ChangeEvent<HTMLInputElement>) =>
        onChange(newValue),
      [onChange]
    );

    return (
      <input
        {...props}
        type="text"
        value={value}
        placeholder={placeholder}
        onKeyDown={handleEnter}
        onChange={handleChange}
      />
    );
  }
);

DefaultInput.displayName = 'DefaultInput';
