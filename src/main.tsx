import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';

import App from '@/routes.tsx';
import '@fontsource/inter';
import '@/styles/global.css';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <CssVarsProvider>
        <App />
      </CssVarsProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);