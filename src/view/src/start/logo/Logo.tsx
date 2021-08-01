import { memo } from 'react';
import { IoChatbox } from 'react-icons/all';

import styled from 'styled-components';

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  pointer-events: none;
  user-select: none;
`;

export const LogoText = styled.h1`
  font-size: 36;
  margin-left: 10px;
`;

export const Logo = memo(() => (
  <LogoWrapper>
    <IoChatbox size={35} />
    <LogoText>The chat</LogoText>
  </LogoWrapper>
));

Logo.displayName = 'Logo';
