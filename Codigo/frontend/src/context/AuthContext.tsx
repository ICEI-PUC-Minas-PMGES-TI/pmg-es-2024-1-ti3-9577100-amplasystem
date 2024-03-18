import React, { createContext, useEffect, useState } from 'react';
import { VendedorModel } from '../models/VendedorModel.ts';
import api from '../services/api.tsx';
import { useNotification } from '../hooks/useNotificaion.ts';

interface AuthState {
    isAuthenticated: boolean;
    user: { email?: string; name?: string; token?: string };
    login: (email: string, senha: string) => Promise<void>;
    logout: () => void;
}

const defaultState: AuthState = {
    isAuthenticated: false,
    user: {},
    login: async () => {},
    logout: () => {},
};

export const AuthContext = createContext<AuthState>(defaultState);

interface Props {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState<Partial<VendedorModel>>({});

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
        <AuthContext.Provider value={{ isAuthenticated: !!user?.token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
