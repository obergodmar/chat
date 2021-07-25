import { RouteComponentProps } from '@reach/router';

import {
  ChangeEvent,
  KeyboardEvent,
  memo,
  useCallback,
  useContext,
  useState,
} from 'react';

import styled from 'styled-components';

import { SessionContext } from '../App';

const NameInput = styled.input.attrs({
  type: 'text',
  placeholder: 'Type your name',
})``;

const EnterButton = styled.button`
  margin-left: 10px;
`;

interface IAuthorizationProps extends RouteComponentProps {
  onAuthorize: (name: string) => void;
}

export const Authorization = memo(({ onAuthorize }: IAuthorizationProps) => {
  const { username } = useContext(SessionContext);
  const [name, setName] = useState(username);
  const handleChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setName(value);
    },
    []
  );

  const handleSetName = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.code !== 'Enter' || name === '') {
        return;
      }

      e.preventDefault();

      onAuthorize(name);

      setName('');
    },
    [name, onAuthorize]
  );

  const handleClick = useCallback(() => {
    onAuthorize(name);

    setName('');
  }, [name, onAuthorize]);

  return (
    <>
      <NameInput
        value={name}
        onChange={handleChange}
        onKeyDown={handleSetName}
      />
      <EnterButton disabled={name === ''} onClick={handleClick}>
        Enter
      </EnterButton>
    </>
  );
});

Authorization.displayName = 'Authorization';
