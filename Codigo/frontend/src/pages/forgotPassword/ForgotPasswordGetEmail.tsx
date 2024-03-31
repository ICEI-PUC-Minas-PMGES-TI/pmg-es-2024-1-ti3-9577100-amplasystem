import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Backdrop, Button, CircularProgress, TextField } from '@mui/material';

import Logo from '@/assets/logo.png';
import { useAuth } from '@/hooks/useAuth.ts';
import { useNotification } from '@/hooks/useNotification.ts';
import * as S from '@/pages/login/LoginPage.styles.ts';
import * as ButtonStyle from '@/styles/ButtonsStyles';
import * as Input from '@/styles/InputStyles';
import Validade from '@/utils/Validate';

const ForgotPasswordGetEmail = () => {
    const { sendForgotToken, isAuthenticated, tokenWasSend } = useAuth();
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const refEmail = useRef<HTMLInputElement>(null);
    const refConfirmEmail = useRef<HTMLInputElement>(null);

    const validate = new Validade();
    const [emailError, setEmailError] = useState(false);
    const [emailHelperText, setEmailHelperText] = useState('');
    const [loading, setLoading] = useState(false);
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
            setLoading(true);
            sendForgotToken(email)
                .catch((err) => {
                    return showNotification({ message: err.message, type: 'error' });
                })
                .then(() => {
                    setLoading(false);
                });
        }
    };

    return (
        <S.Container>
            <S.Logo src={Logo} alt="logo" />
            <S.LoginWrapper>
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                    {' '}
                    <CircularProgress
                        sx={{
                            visibility: loading ? 'visible' : 'hidden',
                        }}
                    />
                </Backdrop>

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
                        sx={Input.input}
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
                        sx={Input.input}
                        inputRef={refConfirmEmail}
                    />

                    <Button variant="contained" type="submit" sx={ButtonStyle.greenButton}>
                        Enviar token
                    </Button>
                </S.LoginForm>
            </S.LoginWrapper>
        </S.Container>
    );
};

export default ForgotPasswordGetEmail;
