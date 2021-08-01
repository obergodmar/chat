import { memo, useEffect, useRef } from 'react';

import { useSession } from 'data/sessionContext/sessionContext';
import styled from 'styled-components';

import { IMessage } from './ChatContainer';

const MessagesContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden auto;
  padding-bottom: 10px;
`;

interface IMessageProps {
  left: boolean;
}

const Message = styled.div<IMessageProps>`
  padding: 4px;
  margin: 0 10px;
  border: 1px solid grey;

  width: 80%;

  align-self: ${({ left }) => (left ? 'flex-start' : 'flex-end')};

  &:first-child,
  &:last-child {
    margin-top: 10px;
  }

  & + & {
    margin-top: 10px;
  }
`;

interface IChatMessagesProps {
  messages: IMessage[];
}

export const ChatMessages = memo(({ messages }: IChatMessagesProps) => {
  const { partner } = useSession();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo(0, ref.current.scrollHeight);
  }, [messages]);

  return (
    <MessagesContainer ref={ref}>
      {messages.map(({ id, username, text }) => (
        <Message key={id} left={username === partner.name}>
          {text}
        </Message>
      ))}
    </MessagesContainer>
  );
});

ChatMessages.displayName = 'ChatMessages';
