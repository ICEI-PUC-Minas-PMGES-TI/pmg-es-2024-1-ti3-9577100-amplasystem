import React, { createContext, useEffect, useState } from 'react';
import { VendedorModel } from '../models/VendedorModel.ts';
import api from '../services/api.tsx';
import { useNavigate } from 'react-router';

interface AuthState {
    isAuthenticated: boolean;
    user: { email?: string; name?: string; token?: string };
    login: (email: string, senha: string) => void;
    sendForgotToken: (email: string) => void;
    tokenWasSend: boolean;
    logout: () => void;
}

const defaultState: AuthState = {
    isAuthenticated: false,
    user: {},
    login: async () => {},
    sendForgotToken: async () => {},
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
    const login = async (email: string, senha: string) => {
        try {
            const response = await api.post('/auth/login', { email, senha });
            const { accessToken: token } = response.data;

            setUser({ email, token });
            localStorage.setItem('user', JSON.stringify({ email, token }));
        } catch (error) {
            console.error('Error on login', error); // TODO: Add a toast message
        }
    };

    const sendForgotToken = async (email: string) => {
        try {
            const response = await api.post('/auth/forgotPassword', { email });

            setTokenWasSend(true);
            localStorage.setItem('userEmailForgotPassowrd', JSON.stringify({ email }));
        } catch (error) {
            console.error('Error on Send Token', error); // TODO: Add a toast message
        }
    };
    const logout = () => {
        setUser({});
        localStorage.removeItem('user');
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
            value={{ isAuthenticated: !!user?.token, user, login, tokenWasSend, sendForgotToken, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};
