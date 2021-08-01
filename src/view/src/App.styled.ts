import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body, *, *::after, *::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    touch-action: manipulation;
  }

  body {
    background-color: #2b2a33;
    font-family: 'Comfortaa', cursive;
  }
`;

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;
