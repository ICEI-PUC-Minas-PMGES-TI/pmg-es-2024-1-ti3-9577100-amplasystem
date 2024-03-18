import { useAuth } from '../../hooks/useAuth.ts';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const refEmail = useRef<HTMLInputElement>(null);
    const refSenha = useRef<HTMLInputElement>(null);

    const signIn = () => {
        login(refEmail.current?.value || '', refSenha.current?.value || '');
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div>
            <h1>Login Page</h1>
            <p>Email: vendedor1@gmail.com</p>
            <p>Senha: senha</p>
            <input id="email" ref={refEmail} type="text" placeholder="Email" />
            <input id="senha" ref={refSenha} onKeyDown={signIn} type="password" placeholder="Senha" />
            <button onClick={signIn}>Entrar</button>
        </div>
    );
};

export default LoginPage;
