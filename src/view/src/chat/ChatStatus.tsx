import { memo, useContext } from 'react';

import styled from 'styled-components';

import { SessionContext } from '../App';

const Status = styled.span``;

const Strong = styled.strong``;

export const ChatStatus = memo(() => {
  const { partner, sessionId } = useContext(SessionContext);

  return (
    <Status>
      {partner.name ? (
        <>
          You are chatting with <Strong>{partner.name}</Strong>
          {partner.status ? ` - ${partner.status}` : ''}
        </>
      ) : (
        <>
          Waiting for partner to join... Session ID:{' '}
          <Strong>{sessionId}</Strong>
        </>
      )}
    </Status>
  );
});

ChatStatus.displayName = 'ChatStatus';
