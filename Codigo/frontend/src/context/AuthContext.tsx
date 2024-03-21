import React, { createContext, useEffect, useState } from 'react';
import { VendedorModel } from '../models/VendedorModel.ts';
import api from '../services/api.tsx';
import { useNotification } from '../hooks/useNotification.ts';

interface AuthState {
    isAuthenticated: boolean;
    user: { email?: string; name?: string; token?: string };
    login: (email: string, senha: string) => Promise<void>;
    sendForgotToken: (email: string) => Promise<void>;
    changePassword: (token: string, senha: string, confirmacaoNovaSenha: string) => Promise<void>;
    tokenWasSend: boolean;
    passwordWasReset: boolean;
    logout: () => void;
}

const defaultState: AuthState = {
    isAuthenticated: false,
    passwordWasReset: false,
    user: {},
    login: async () => {},
    sendForgotToken: async () => {},
    changePassword: async () => {},
    tokenWasSend: false,
    logout: () => {},
};

export const AuthContext = createContext<AuthState>(defaultState);

interface Props {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState<Partial<VendedorModel>>({});
    const [tokenWasSend, setTokenWasSend] = useState(false);
    const [passwordWasReset, setPasswordWasReset] = useState(false);
    const login = async (email: string, password: string) => {
        try {
            const response = await api.post('/auth/login', { email, senha: password });
            const { accessToken: token } = response.data;

            setUser({ email, token });
            localStorage.setItem('user', JSON.stringify({ email, token }));
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const sendForgotToken = async (email: string) => {
        try {
            const response = await api.post('/auth/forgotPassword', { email });

            setTokenWasSend(true);
            localStorage.setItem('userEmailForgotPassword', JSON.stringify({ email }));
        } catch (error) {
            console.error('Error on Send Token', error); // TODO: Add a toast message
            throw error;
        }
    };
    const logout = () => {
        setUser({});
        localStorage.removeItem('user');
    };
    const changePassword = async (token: string, novaSenha: string, confirmacaoNovaSenha: string) => {
        try {
            const localStorageEmail = localStorage.getItem('userEmailForgotPassword') || ' ';
            const obj = JSON.parse(localStorageEmail);
            const email = obj.email;

            const response = await api.post('/auth/changePassword', { token, email, novaSenha, confirmacaoNovaSenha });

            setPasswordWasReset(true);
        } catch (error) {
            console.error('Error on Send Token', error); // TODO: Add a toast message
            throw error;
        }
    };
    const syncLocalStorage = () => {
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
        }
    };

    useEffect(() => {
        syncLocalStorage();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: !!user?.token,
                passwordWasReset: passwordWasReset,
                user,
                login,
                tokenWasSend,
                sendForgotToken,
                changePassword,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
