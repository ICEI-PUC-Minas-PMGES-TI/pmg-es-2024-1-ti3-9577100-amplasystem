import React from 'react';
import ReactDOM from 'react-dom/client';

import '@fontsource/inter';
import '@/styles/global.css';
import App from '@/routes.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);