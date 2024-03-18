import { useAuth } from '../../hooks/useAuth.ts';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';

import * as S from '../login/LoginPage.styles.ts';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { VisibilityOff } from '@mui/icons-material';

// import { ReactComponent as Logo } from '../../assets/logo.svg';
import Logo from '../../assets/logo.png';
import { useNotification } from '../../hooks/useNotificaion.ts';

const ForgotPasswordGetEmail = () => {
    const { passwordWasReset, changePassword } = useAuth();
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const refSenha = useRef<HTMLInputElement>(null);
    const refToken = useRef<HTMLInputElement>(null);
    const refConfirmSenha = useRef<HTMLInputElement>(null);

    const [senhaError, setSenhaError] = useState(false);
    const [senhaHelperText, setSenhaHelperText] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (passwordWasReset) {
            navigate('/login');
        }
    });

    const validatePassword = (password: string) => {
        // Rule: password must be at least 6 characters at least 1 number, 1 uppercase and 1 lowercase
        const passwordRegex = /^(?=.\d)(?=.[a-z])(?=.*[A-Z]).{6,}$/;
        return true;
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const senha = refSenha.current?.value || '';
        const senhaConfirm = refConfirmSenha.current?.value || '';
        const token = refToken.current?.value || '';
        const isSenhaValid = validatePassword(senha) && validatePassword(senhaConfirm);

        setSenhaError(!isSenhaValid);

        if (!isSenhaValid) {
            setSenhaHelperText('Informe uma senha valida.');
        } else if (senha != senhaConfirm) {
            setSenhaError(true);
            setSenhaHelperText('As senhas são não coincidem.');
        } else {
            setSenhaHelperText('');
        }
        if (isSenhaValid) {
            changePassword(token, senha, senhaConfirm).catch(() => {
                return showNotification({ message: 'Senhas ou token invalido', type: 'error' });
            });
        }
    };

    return (
        <S.Container>
            <S.Logo src={Logo} alt="logo" />
            <S.LoginWrapper>
                <S.LoginTitle>Alterar sua senha</S.LoginTitle>
                <S.LoginForm onSubmit={onSubmit}>
                    <TextField
                        id="token"
                        label="Token"
                        variant="outlined"
                        placeholder="Token"
                        fullWidth
                        margin="normal"
                        sx={{
                            borderRadius: '8px',
                            maxWidth: 720,
                            height: 65,
                        }}
                        inputRef={refToken}
                    />
                    <TextField
                        id="senha"
                        label="Senha"
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Senha"
                        fullWidth
                        margin="normal"
                        sx={{
                            borderRadius: '8px',
                            maxWidth: 720,
                            height: 65,
                        }}
                        error={senhaError}
                        helperText={senhaHelperText}
                        inputRef={refSenha}
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
                    <TextField
                        id="senha"
                        label="Confirmar Senha"
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirmar Senha"
                        fullWidth
                        margin="normal"
                        sx={{
                            borderRadius: '8px',
                            maxWidth: 720,
                            height: 65,
                        }}
                        error={senhaError}
                        helperText={senhaHelperText}
                        inputRef={refConfirmSenha}
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
                        Mudar senha
                    </Button>
                </S.LoginForm>
            </S.LoginWrapper>
        </S.Container>
    );
};

export default ForgotPasswordGetEmail;
