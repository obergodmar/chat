import { memo } from 'react';

import { useSession } from 'data/sessionContext/sessionContext';
import styled from 'styled-components';

const Status = styled.span``;

const Strong = styled.strong``;

export const ChatStatus = memo(() => {
  const { partner, sessionId } = useSession();

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
