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

    const [senhalError, setSenhaError] = useState(false);
    const [senhaHelperText, setSenhaHelperText] = useState('');

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
                        inputRef={refToken}
                    />
                    <TextField
                        id="senha"
                        label="Informe sua senha"
                        variant="outlined"
                        placeholder="Senha"
                        error={senhalError}
                        helperText={senhaHelperText}
                        fullWidth
                        margin="normal"
                        inputRef={refSenha}
                    />
                    <TextField
                        id="confirmSenha"
                        label="Confirme sua senha"
                        variant="outlined"
                        placeholder="Senha"
                        error={senhalError}
                        helperText={senhaHelperText}
                        fullWidth
                        margin="normal"
                        inputRef={refConfirmSenha}
                    />

                    <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                        Mudar senha
                    </Button>
                </S.LoginForm>
            </S.LoginWrapper>
        </S.Container>
    );
};

export default ForgotPasswordGetEmail;
