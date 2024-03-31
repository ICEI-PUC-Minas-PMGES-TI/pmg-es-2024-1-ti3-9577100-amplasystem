import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import { AuthProvider } from './context/AuthContext.tsx';
import { NotificationProvider } from './context/NotificationContext.tsx';
import RouterRoutes from './routes/Routes.tsx';
import theme from './styles/themes/theme.tsx';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <NotificationProvider>
                <AuthProvider>
                    <RouterRoutes />
                </AuthProvider>
            </NotificationProvider>
        </ThemeProvider>
    </React.StrictMode>,
);
