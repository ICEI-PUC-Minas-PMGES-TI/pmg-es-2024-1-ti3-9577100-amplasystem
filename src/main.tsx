import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Add } from '@carbon/react/icons';
import { Button } from '@carbon/react';

import '@/styles/global.scss';

const theme = 'g100'; // ← sua implementação, por exemplo, buscando configurações do usuário

const App = () => {
  useEffect(() => {
    document.documentElement.dataset['carbonTheme'] = theme;
  }, [theme]);

  return (
    <>
      <Add />
      <Button>Teste</Button>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);