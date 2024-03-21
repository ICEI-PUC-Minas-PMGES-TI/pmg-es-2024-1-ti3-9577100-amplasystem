import { useAuth } from '../../hooks/useAuth.ts';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from '../login/LoginPage.styles.ts';
import * as Sx from './ForgotPasswordStyle';
import { Button, TextField } from '@mui/material';

// import { ReactComponent as Logo } from '../../assets/logo.svg';
import Logo from '../../assets/logo.png';
import { useNotification } from '../../hooks/useNotification.ts';
import Validade from '../../utils/Validate';

const ForgotPasswordGetEmail = () => {
    const { sendForgotToken, isAuthenticated, tokenWasSend } = useAuth();
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const refEmail = useRef<HTMLInputElement>(null);
    const refConfirmEmail = useRef<HTMLInputElement>(null);

    const validate = new Validade();
    const [emailError, setEmailError] = useState(false);
    const [emailHelperText, setEmailHelperText] = useState('');

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (tokenWasSend) {
            navigate('/forgotPassword/token');
        }
    });

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const email = refEmail.current?.value || '';
        const emailConfirm = refConfirmEmail.current?.value || '';
        const isEmailValid = validate.validateEmail(email) && validate.validateEmail(emailConfirm);

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
            sendForgotToken(email).catch(() => {
                return showNotification({ message: 'Email invalido', type: 'error' });
            });
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
                        sx={Sx.materialUiTextFild}
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
                        sx={Sx.materialUiTextFild}
                        inputRef={refConfirmEmail}
                    />

                    <Button variant="contained" type="submit" sx={Sx.materialUiButton}>
                        Enviar token
                    </Button>
                </S.LoginForm>
            </S.LoginWrapper>
        </S.Container>
    );
};

export default ForgotPasswordGetEmail;
