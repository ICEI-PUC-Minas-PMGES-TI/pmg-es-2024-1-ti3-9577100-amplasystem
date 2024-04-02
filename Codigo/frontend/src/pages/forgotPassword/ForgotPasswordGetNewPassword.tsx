import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { VisibilityOff } from '@mui/icons-material';
import Visibility from '@mui/icons-material/Visibility';

import { useAuth } from '@/hooks/useAuth.ts';
import * as S from '@/pages/login/LoginPage.styles.ts';

import Logo from '@/assets/logo.png';
import { useNotification } from '@/hooks/useNotification.ts';
import Validade from '@/utils/Validate';
import * as Input from '@/styles/types/InputStyles';
import * as ButtonStyle from '@/styles/types/ButtonsStyles';

const ForgotPasswordGetNewPassword = () => {
    const { passwordWasReset, changePassword } = useAuth();
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const refSenha = useRef<HTMLInputElement>(null);
    const refToken = useRef<HTMLInputElement>(null);
    const refConfirmSenha = useRef<HTMLInputElement>(null);
    const validate = new Validade();
    const [senhaError, setSenhaError] = useState(false);
    const [senhaHelperText, setSenhaHelperText] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (passwordWasReset) {
            navigate('/login');
        }
    });

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const senha = refSenha.current?.value || '';
        const senhaConfirm = refConfirmSenha.current?.value || '';
        const token = refToken.current?.value || '';
        const isSenhaValid = validate.validatePassword(senha) && validate.validatePassword(senhaConfirm);

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
            changePassword(token, senha, senhaConfirm).catch((err) => {
                return showNotification({ message: err.message, type: 'error' });
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
                        sx={Input.input}
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
                        sx={Input.input}
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
                        sx={Input.input}
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

                    <Button variant="contained" type="submit" sx={ButtonStyle.greenButton}>
                        Mudar senha
                    </Button>
                </S.LoginForm>
            </S.LoginWrapper>
        </S.Container>
    );
};

export default ForgotPasswordGetNewPassword;
