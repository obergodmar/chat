import { navigate, Router } from '@reach/router';

import { memo, useCallback } from 'react';

import { Wrapper } from 'App.styled';
import { useSession } from 'data/sessionContext/sessionContext';

import { ChatContainer } from './chat/ChatContainer';
import { Start } from './start/Start';
import { request } from './utils/request';

export const App = memo(() => {
  const { updateSession } = useSession();

  const handleChangeUsername = useCallback(
    (username: string) => {
      request('/username', 'POST', { username })
        .then((value) => value.json())
        .then(({ sessionId, error }) => {
          if (error) {
            updateSession({ error });
            return;
          }

          updateSession({ sessionId, username, error: undefined });

          navigate(`/chat/${sessionId}`, { replace: true });
        });
    },
    [updateSession]
  );

  return (
    <Router component={Wrapper}>
      <Start path="/" onAuthorize={handleChangeUsername} />
      <ChatContainer path="/chat/:id" />
    </Router>
  );
});

App.displayName = 'App';
