import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import './index.css';

import { ThemeProvider } from '@mui/material';

import theme from './theme';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>,
);
