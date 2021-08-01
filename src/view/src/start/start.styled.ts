import { Input } from 'components/Input';
import styled from 'styled-components';

export const NameInput = styled(Input.type)`
  z-index: 1;
  background-color: #38383d;
  border: none;
  font-family: inherit;
  font-size: 14px;
  padding: 15px 30px;
  border-radius: 10px;
  color: #ffffff;
  width: 200px;
  min-width: 200px;
`;

export const EnterButton = styled.button`
  position: relative;
  background-color: #74747c;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  padding: 15px;
  font-family: inherit;
  font-size: 14px;
  transition: color 0.1s ease-in;

  &::before {
    z-index: -1;
    position: absolute;
    top: 0;
    left: -10px;
    width: 20px;
    height: 100%;
    background-color: #74747c;
    content: '';

    transition: background-color 0.1s ease-in;
  }

  &:disabled {
    color: #38383d;
  }

  &:focus,
  &:active {
    outline: none;
  }

  &:not(:disabled) {
    cursor: pointer;

    &::before {
      cursor: pointer;
      background-color: #38383d;
    }
  }
`;

export const StartWrapper = styled.main`
  margin-top: 15%;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 560px) {
    margin-top: 45%;
  }
`;

export const LoginContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const ErrorMessage = styled.strong`
  margin-top: 10px;
  color: #f48024;
`;
