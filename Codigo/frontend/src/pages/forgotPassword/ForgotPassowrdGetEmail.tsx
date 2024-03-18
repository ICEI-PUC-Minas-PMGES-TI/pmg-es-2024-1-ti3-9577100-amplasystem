import { useAuth } from '../../hooks/useAuth.ts';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';

import * as S from '../login/LoginPage.styles.ts';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { VisibilityOff } from '@mui/icons-material';

// import { ReactComponent as Logo } from '../../assets/logo.svg';
import Logo from '../../assets/logo.png';

const ForgotPasswordGetEmail = () => {
    const { sendForgotToken, isAuthenticated, tokenWasSend } = useAuth();
    const navigate = useNavigate();

    const refEmail = useRef<HTMLInputElement>(null);
    const refConfirmEmail = useRef<HTMLInputElement>(null);

    const [emailError, setEmailError] = useState(false);
    const [emailHelperText, setEmailHelperText] = useState('');

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (tokenWasSend) {
            navigate('/forgotPassowrd/token');
        }
    });

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const email = refEmail.current?.value || '';
        const emailConfirm = refConfirmEmail.current?.value || '';
        const isEmailValid = validateEmail(email) && validateEmail(emailConfirm);

        setEmailError(!isEmailValid);

        if (!isEmailValid) {
            setEmailHelperText('Informe um email valido.');
        } else if (email != emailConfirm) {
            setEmailError(true);
            setEmailHelperText('Os emails não coincidem.');
        } else {
            setEmailHelperText('');
        }
        if (isEmailValid) {
            sendForgotToken(email);
        }
    };

    return (
        <S.Container>
            <S.Logo src={Logo} alt="logo" />
            <S.LoginWrapper>
                <S.LoginTitle>Resetar sua senha</S.LoginTitle>
                <S.LoginForm onSubmit={onSubmit}>
                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        placeholder="Email"
                        error={emailError}
                        helperText={emailHelperText}
                        fullWidth
                        margin="normal"
                        inputRef={refEmail}
                    />
                    <TextField
                        id="confirmEmail"
                        label="Confirme seu email"
                        variant="outlined"
                        placeholder="Email"
                        error={emailError}
                        helperText={emailHelperText}
                        fullWidth
                        margin="normal"
                        inputRef={refConfirmEmail}
                    />

                    <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                        Enviar token
                    </Button>
                </S.LoginForm>
            </S.LoginWrapper>
        </S.Container>
    );
};

export default ForgotPasswordGetEmail;
