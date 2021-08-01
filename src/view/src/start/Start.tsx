import { RouteComponentProps } from '@reach/router';

import { memo, useCallback, useState } from 'react';

import { useSession } from 'data/sessionContext/sessionContext';

import { Logo } from './logo/Logo';
import {
  EnterButton,
  ErrorMessage,
  LoginContainer,
  NameInput,
  StartWrapper,
} from './start.styled';

interface IStartProps extends RouteComponentProps {
  onAuthorize: (name: string) => void;
}

const MAX_USERNAME_LENGTH = 22;

export const Start = memo(({ onAuthorize }: IStartProps) => {
  const { error } = useSession();
  const [name, setName] = useState('');

  const handleChange = useCallback((value: string) => {
    if (value.length >= MAX_USERNAME_LENGTH) {
      return;
    }
    setName(value);
  }, []);

  const handleClick = useCallback(() => {
    if (name === '') {
      return;
    }
    onAuthorize(name);

    setName('');
  }, [name, onAuthorize]);

  return (
    <StartWrapper>
      <Logo />
      <LoginContainer>
        <NameInput
          placeholder="Type your name"
          value={name}
          onChange={handleChange}
          onEnter={handleClick}
        />
        <EnterButton disabled={name === ''} onClick={handleClick}>
          Enter
        </EnterButton>
      </LoginContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </StartWrapper>
  );
});

Start.displayName = 'Authorization';
