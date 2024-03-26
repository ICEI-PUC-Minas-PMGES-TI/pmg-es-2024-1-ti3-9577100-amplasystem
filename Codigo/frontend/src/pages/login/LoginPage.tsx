import { useAuth } from '../../hooks/useAuth.ts';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';

import * as S from './LoginPage.styles.ts';
import { Box, Button, IconButton, InputAdornment, Link, TextField } from '@mui/material';
import { VisibilityOff } from '@mui/icons-material';

import Logo from '../../assets/logo.png';
import { useNotification } from '../../hooks/useNotification.ts';
import Validade from '../../utils/Validate';

const LoginPage = () => {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const { showNotification } = useNotification();

    const refEmail = useRef<HTMLInputElement>(null);
    const refPassword = useRef<HTMLInputElement>(null);

    const [emailError, setEmailError] = useState(false);
    const [emailHelperText, setEmailHelperText] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const validade = new Validade();
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const email = refEmail.current?.value || '';
        const password = refPassword.current?.value || '';
        const isEmailValid = validade.validateEmail(email);

        setEmailError(!isEmailValid);

        if (!isEmailValid) {
            setEmailHelperText('Please enter a valid email.');
        } else {
            setEmailHelperText('');
        }

        if (!isEmailValid) return;

        login(email, password).catch(() => {
            return showNotification({ message: 'Email e/ou senha inválidos', type: 'error' });
        });
    };

    return (
        <S.Container>
            <S.Logo src={Logo} alt="logo" />
            <S.LoginWrapper>
                <S.LoginTitle>Login</S.LoginTitle>
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
                        sx={{
                            borderRadius: '8px',
                            maxWidth: 720,
                            height: 65,
                        }}
                        inputRef={refEmail}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        fullWidth
                        margin="normal"
                        sx={{
                            borderRadius: '8px',
                            maxWidth: 720,
                            height: 65,
                        }}
                        inputRef={refPassword}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'right',
                            width: '100%',
                            mt: '-15px',
                            maxWidth: 720,
                        }}
                    >
                        <Link
                            underline="hover"
                            component="button"
                            variant="body2"
                            sx={{
                                color: 'black',
                            }}
                            onClick={() => {
                                navigate('/forgotPassword/email');
                            }}
                        >
                            esqueceu sua senha?
                        </Link>
                    </Box>

                    <Button
                        variant="contained"
                        type="submit"
                        sx={{
                            mt: 2,
                            maxWidth: 720,
                            backgroundColor: '#45BCEF',
                            width: '100%',
                            height: 55,
                        }}
                    >
                        Entrar
                    </Button>
                </S.LoginForm>
            </S.LoginWrapper>
        </S.Container>
    );
};

export default LoginPage;
