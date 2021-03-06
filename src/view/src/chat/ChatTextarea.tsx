import {
  ChangeEvent,
  KeyboardEvent,
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import styled from 'styled-components';

import { SessionContext } from '../App';
import { request } from '../utils/request';

const Textarea = styled.textarea.attrs({
  spellcheck: true,
  placeholder: 'Type here',
})`
  flex-grow: 1;
  resize: none;
  border: none;
  border-top: 1px solid grey;
  padding: 10px;
  height: 100%;
  width: 100%;
`;

const TextareaContainer = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
`;

const TextareaButton = styled.button`
  height: 100%;
  width: 70px;
`;

export const ChatTextarea = memo(() => {
  const [text, setText] = useState('');
  const { username } = useContext(SessionContext);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleTyping = () => {
      ref.current?.focus();
    };

    window.addEventListener('keydown', handleTyping);

    return () => {
      window.removeEventListener('keydown', handleTyping);
    };
  }, []);

  const handleSend = useCallback(() => {
    request('/message', 'POST', { username, text });

    setText('');
  }, [text, username]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.code !== 'Enter') {
        return;
      }

      e.preventDefault();

      handleSend();
    },
    [handleSend]
  );

  const handleChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => {
      setText(value);
    },
    []
  );

  return (
    <TextareaContainer>
      <Textarea
        ref={ref}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <TextareaButton disabled={text === ''} onClick={handleSend}>
        Send
      </TextareaButton>
    </TextareaContainer>
  );
});

ChatTextarea.displayName = 'ChatTextarea';
