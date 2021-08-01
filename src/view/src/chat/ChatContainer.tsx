import { navigate, RouteComponentProps } from '@reach/router';

import { memo, useEffect, useState } from 'react';

import { useSession } from 'data/sessionContext/sessionContext';
import { equals } from 'ramda';
import styled from 'styled-components';

import { request } from '../utils/request';
import { ChatMessages } from './ChatMessages';
import { ChatStatus } from './ChatStatus';
import { ChatTextarea } from './ChatTextarea';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 600px;
  border: 1px solid grey;

  @media (max-width: 600px) {
    width: calc(100vw - 20px);
    height: calc(100vh - 50px);
  }
`;

export interface IMessage {
  id: string;
  username: string;
  text: string;
}

export const ChatContainer = memo(({}: RouteComponentProps) => {
  const { username, sessionId, updateSession } = useSession();

  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    if (!username || !sessionId) {
      navigate('/', { replace: true });
    }

    const checkInterval = setInterval(() => {
      request('/check', 'POST', { username })
        .then((res) => {
          if (res.status !== 200) {
            navigate('/', { replace: true });

            return Promise.reject();
          }

          return res.json();
        })
        .then(({ partner, messages: messagesList }) => {
          updateSession({ partner });

          setMessages((values) =>
            equals(values, messagesList) ? values : messagesList
          );
        });
    }, 500);

    return () => {
      clearInterval(checkInterval);
    };
  }, [sessionId, updateSession, username]);

  return username ? (
    <>
      <ChatStatus />

      <Container>
        <ChatMessages messages={messages} />
        <ChatTextarea />
      </Container>
    </>
  ) : null;
});

ChatContainer.displayName = 'Container';
