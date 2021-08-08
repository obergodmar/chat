import ReactDOM from 'react-dom';

import { GlobalStyle } from 'App.styled';
import { PreferencesProvider, SessionProvider } from 'data';
import { Preferences } from 'preferences';

import { App } from './App';

const AppWithData = () => (
  <PreferencesProvider>
    <SessionProvider>
      <GlobalStyle />
      <App />
      <Preferences />
    </SessionProvider>
  </PreferencesProvider>
);

ReactDOM.render(<AppWithData />, document.getElementById('root'));
