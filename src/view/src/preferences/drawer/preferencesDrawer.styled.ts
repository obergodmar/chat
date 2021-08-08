import styled, { css } from 'styled-components';

interface IPreferencesDrawerWrapperProps {
  active: boolean;
}

export const PreferencesDrawerFallback = styled.div`
  z-index: 2;
  width: 100vh;
  height: 100vh;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
`;

export const PreferencesDrawerWrapper = styled.div<IPreferencesDrawerWrapperProps>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 300px;
  background-color: #74747c;

  ${({ active }) => css`
    transform: translateX(${active ? '0' : '100%'});
  `}

  transition: transform 0.2s ease-in;
`;

export const CloseButton = styled.button`
  position: fixed;
  right: 10px;
  top: 10px;
  cursor: pointer;
  background-color: #38383d;
  color: #6d6d75;
  border: none;
  border-radius: 10px;
  padding: 10px;

  &:hover {
    color: #ffffff;
  }
`;

export const PreferencesContainer = styled.div`
  padding: 80px 10px;
`;
