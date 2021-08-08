import styled from 'styled-components';

import { CARET_MARGIN } from './helpers';

interface ILetterProps {
  left: number;
  top: number;
}

export const Letter = styled.span.attrs(({ left, top }: ILetterProps) => ({
  style: {
    transform: `translate(${left}px, ${top}px`,
  },
}))<ILetterProps>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1px;
`;

export interface ICaretProps {
  left: number;
  top: number;
  withMargin?: boolean;
}

export const Caret = styled.div.attrs(({ left, top }: ICaretProps) => ({
  style: {
    transform: `translate(${left}px, ${top}px`,
  },
}))<ICaretProps>`
  position: absolute;
  height: 18px;
  width: 2px;
  background-color: #ffffff;
  opacity: 0;

  margin-left: ${({ withMargin }) =>
    withMargin ? `${CARET_MARGIN}px` : `-${CARET_MARGIN}px`};

  transition: transform 0.1s ease-in;
`;

export const Container = styled.div.attrs({
  role: 'textbox',
  tabIndex: 0,
})`
  cursor: text;
  position: relative;
  box-sizing: content-box;
  min-height: 17px;
  height: 17px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: inherit;
  font-size: 16px;
  user-select: none;

  &:focus,
  &:active {
    border: none;
    outline: none;

    ${Caret} {
      animation: Pulse 0.8s infinite;
    }
  }

  @keyframes Pulse {
    50% {
      opacity: 1;
    }
  }
`;

export const Placeholder = styled.div`
  color: #74747c;
`;
