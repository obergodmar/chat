import { navigate, RouteComponentProps } from '@reach/router';

import { memo, useContext, useEffect, useState } from 'react';

import { equals } from 'ramda';
import styled from 'styled-components';

import { IPartner, SessionContext } from '../App';
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

interface IChatContainer extends RouteComponentProps {
  updatePartner: (partner: IPartner) => void;
}

export interface IMessage {
  id: string;
  username: string;
  text: string;
}

export const ChatContainer = memo(({ updatePartner }: IChatContainer) => {
  const {
    username,
    sessionId,
    partner: sessionPartner,
  } = useContext(SessionContext);

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
          }

          return res.json();
        })
        .then(({ partner, messages: messagesList }) => {
          updatePartner(partner);

          setMessages((values) =>
            equals(values, messagesList) ? values : messagesList
          );
        });
    }, 500);

    return () => {
      clearInterval(checkInterval);
    };
  }, [sessionId, sessionPartner, updatePartner, username]);

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
