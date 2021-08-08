import {
  KeyboardEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { v4 } from 'uuid';

import { LETTER_WIDTH } from './helpers';
import { Caret, Container, Letter, Placeholder } from './input.styled';

export interface IInputProps {
  value: string;
  onChange: (value: string) => void;
  onEnter?: () => void;
  placeholder?: string;
}

export const Input = memo(
  ({ value, onChange, onEnter, placeholder, ...props }: IInputProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [values, setValues] = useState<
      { letter: string; left: number; key: string }[]
    >([]);

    const [caretPosition, setCaretPosition] = useState(-1);

    useEffect(() => {
      setValues((oldValues) => {
        const newValues = value.split('').map((letter, idx) => ({
          letter,
          key: oldValues[idx]?.letter === letter ? oldValues[idx].key : v4(),
          left: idx * LETTER_WIDTH,
        }));

        setCaretPosition((prevValue) => {
          const newValue =
            newValues.length > oldValues.length ? prevValue + 1 : prevValue;

          if (newValue >= newValues.length) {
            return newValues.length - 1;
          }

          return newValue;
        });

        return newValues;
      });
    }, [value]);

    const handleFocus = useCallback(() => {
      ref.current?.focus();
    }, []);

    const handleInput = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        let newValue = value;
        let lettersArray: string[] = [];
        switch (e.key) {
          case 'Backspace':
            if (caretPosition === -1) {
              break;
            }
            lettersArray = newValue.split('');

            lettersArray.splice(caretPosition, 1);

            newValue = lettersArray.join('');

            setCaretPosition((prevValue) => prevValue - 1);

            break;
          case 'Delete':
            if (caretPosition === values.length - 1) {
              break;
            }

            lettersArray = newValue.split('');

            lettersArray.splice(caretPosition + 1, 1);

            newValue = lettersArray.join('');

            break;
          case 'CapsLock':
          case 'Shift':
          case 'Alt':
          case 'Meta':
          case 'ArrowUp':
          case 'ArrowDown':
          case 'Tab':
          case 'Control':
          case 'Escape':
          case 'F1':
          case 'F2':
          case 'F3':
          case 'F4':
          case 'F5':
          case 'F6':
          case 'F7':
          case 'F8':
          case 'F9':
          case 'F10':
          case 'F11':
          case 'F12':
            break;

          case 'ArrowLeft':
            setCaretPosition((prevValue) => {
              const newCaretValue = prevValue - 1;
              if (newCaretValue < 0) {
                return -1;
              }

              return newCaretValue;
            });

            break;

          case 'ArrowRight':
            setCaretPosition((prevValue) => {
              const newCaretValue = prevValue + 1;
              if (newCaretValue >= values.length) {
                return values.length - 1;
              }

              return newCaretValue;
            });

            break;

          case 'Enter':
            onEnter && onEnter();

            break;

          default:
            lettersArray = newValue.split('');

            lettersArray.splice(caretPosition + 1, 0, e.key);

            newValue = lettersArray.join('');
        }

        onChange(newValue);
      },
      [caretPosition, onChange, onEnter, value, values.length]
    );

    const handleMoveCaret = useCallback(
      (idx: number) => () => setCaretPosition(idx),
      []
    );

    return (
      <Container
        ref={ref}
        onClick={handleFocus}
        onKeyDown={handleInput}
        {...props}>
        {!values.length && placeholder && (
          <Placeholder>{placeholder}</Placeholder>
        )}
        {values.map(({ letter, left, key }, idx) => (
          <Letter key={key} left={left} top={0} onClick={handleMoveCaret(idx)}>
            {letter}
          </Letter>
        ))}
        <Caret
          withMargin={caretPosition !== -1}
          left={values[caretPosition]?.left ?? 0}
          top={0}
        />
      </Container>
    );
  }
);

Input.displayName = 'Input';
