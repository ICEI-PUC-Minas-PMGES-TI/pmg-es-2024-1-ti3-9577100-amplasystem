import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { Snackbar, Alert, AlertColor, AlertTitle } from '@mui/material';

interface INotification {
    message: string;
    type: AlertColor;
    title?: string | undefined | null;
    autoHideDuration?: number | null | undefined;
}

interface ShowNotificationProps {
    message: string;
    type: AlertColor;
    title?: string | undefined | null;
    autoHideDuration?: number | null | undefined;
}

interface NotificationContextType {
    showNotification: ({ message, type }: ShowNotificationProps) => void;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [notification, setNotification] = useState<INotification | null>(null);
    const [open, setOpen] = useState(false);

    const showNotification = useCallback(({ message, type, autoHideDuration, title }: ShowNotificationProps) => {
        setNotification({ message, type, autoHideDuration: autoHideDuration ?? 6000, title });
        setOpen(true);
    }, []);

    const handleClose = useCallback((event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }, []);

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                style={{ right: '60px' }}
            >
                <div>
                    {notification && (
                        <Alert onClose={handleClose} severity={notification.type} sx={{ width: '100%' }}>
                            <AlertTitle> {notification?.title}</AlertTitle>
                            {notification.message}
                        </Alert>
                    )}
                </div>
            </Snackbar>
        </NotificationContext.Provider>
    );
};
