import ReactDOM from 'react-dom';

import { GlobalStyle } from 'App.styled';
import { SessionProvider } from 'data/sessionContext/sessionContext';

import { App } from './App';

const AppWithData = () => (
  <SessionProvider>
    <GlobalStyle />
    <App />
  </SessionProvider>
);

ReactDOM.render(<AppWithData />, document.getElementById('root'));
