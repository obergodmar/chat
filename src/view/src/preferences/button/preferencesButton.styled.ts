import { RiSettings3Fill } from 'react-icons/ri';

import styled from 'styled-components';

export const Icon = styled(RiSettings3Fill).attrs({
  size: 32,
})``;

export const Button = styled.button`
  border: none;
  background-color: rgba(0, 0, 0, 0.0005);
  cursor: pointer;
  position: fixed;
  padding: 5px;
  margin: 0;
  top: 10px;
  right: 10px;
  color: #ffffff;
  border-radius: 10px;

  &:hover {
    background-color: #74747c;
  }
`;
