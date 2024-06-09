import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Add } from '@carbon/react/icons';
import { GlobalTheme, Button } from '@carbon/react';

import '@/styles/global.css';

const theme = 'g100'; // ← sua implementação, por exemplo, buscando configurações do usuário

const App = () => {
  useEffect(() => {
    document.documentElement.dataset['carbonTheme'] = theme;
  }, [theme]);

  return (
    <GlobalTheme theme={theme}>
      <Add />
      <Button>Teste</Button>
    </GlobalTheme>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);