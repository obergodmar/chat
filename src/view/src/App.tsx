import { navigate, Router } from '@reach/router';

import { createContext, memo, useCallback, useEffect, useState } from 'react';

import styled, { createGlobalStyle } from 'styled-components';

import { Authorization } from './authorization/Authorization';
import { ChatContainer } from './chat/ChatContainer';
import { request } from './utils/request';

const GlobalStyle = createGlobalStyle`
  body, *, *::after, *::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const ErrorMessage = styled.strong`
  margin-top: 10px;
`;

export interface IPartner {
  name: string;
  status: string;
}

interface ISessionContext {
  username: string;
  sessionId: string;
  partner: IPartner;
}

const initialSession: ISessionContext = {
  username: '',
  sessionId: '',
  partner: {
    name: '',
    status: '',
  },
};

export const SessionContext = createContext<ISessionContext>(initialSession);

export const App = memo(() => {
  const [session, setSession] = useState<ISessionContext>(initialSession);
  const [sessionError, setSessionError] = useState('');

  const handleChangeUsername = useCallback((username: string) => {
    request('/username', 'POST', { username })
      .then((value) => value.json())
      .then(({ sessionId, error }) => {
        if (error) {
          setSessionError(error);
          return;
        }

        setSessionError('');

        setSession((value) => ({ ...value, sessionId, username }));

        navigate(`/chat/${sessionId}`, { replace: true });
      });
  }, []);

  useEffect(() => {
    if (!sessionError) {
      return undefined;
    }

    const timer = setTimeout(() => {
      setSessionError('');
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [sessionError]);

  const handleUpdatePartner = useCallback(
    (partner: IPartner) => setSession((state) => ({ ...state, partner })),
    []
  );

  return (
    <SessionContext.Provider value={session}>
      <GlobalStyle />
      <Wrapper>
        <Router>
          <Authorization path="/" onAuthorize={handleChangeUsername} />
          <ChatContainer path="/chat/:id" updatePartner={handleUpdatePartner} />
        </Router>
        {sessionError && <ErrorMessage>{sessionError}</ErrorMessage>}
      </Wrapper>
    </SessionContext.Provider>
  );
});

App.displayName = 'App';
