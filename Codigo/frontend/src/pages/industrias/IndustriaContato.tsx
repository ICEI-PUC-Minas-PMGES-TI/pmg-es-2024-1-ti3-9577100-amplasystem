import { TextField, Typography } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { ContatoModel } from 'models/ContatoModels';
import { IMaskInput } from 'react-imask';
import Validade from '@/utils/Validate';
import * as Input from '@/styles/InputStyles';

interface IRegisterModalProps {
    contatoModel: ContatoModel;
    index: number;
    reset: boolean;
    handleChange: (contato: ContatoModel, index: number) => void;
}

const IndustriaContato = (props: IRegisterModalProps) => {
    const [wrong, setWrong] = useState<boolean>(false);
    const [helperText, setHelperText] = useState<string>('');
    const [contato, setContato] = useState<ContatoModel>(props.contatoModel);
    const validade = new Validade();
    useEffect(() => {
        props.handleChange(contato, props.index);
    }, [contato]);

    useEffect(() => {
        if (props.reset) {
            const emptyContact: ContatoModel = {
                email: '',
                id: null,
                nome: '',
                tipoContato: contato.tipoContato,
                telefone: '',
            };
            setContato(emptyContact);
        }
    }, [props.reset]);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target as HTMLInputElement;
        setContato({ ...contato, [name]: value });
    }

    function handleNumberChange(value: string) {
        setContato({ ...contato, ['telefone']: value });
    }

    useEffect(() => {
        if (wrong) {
            setHelperText('email invaido');
        } else {
            setHelperText('');
        }
    }, [wrong]);
    return (
        <>
            <Typography
                variant="h6"
                gutterBottom
                sx={{
                    color: '#344054',
                }}
            >
                Contato {props.contatoModel?.tipoContato}
            </Typography>
            <Typography
                variant="subtitle1"
                sx={{
                    color: '#344054',
                }}
                display="block"
            >
                Nome
            </Typography>
            <TextField
                id="nome"
                variant="outlined"
                placeholder="Nome"
                name="nome"
                fullWidth
                value={contato.nome}
                sx={Input.input}
                onChange={handleChange}
            />
            <Typography
                variant="subtitle1"
                sx={{
                    color: '#344054',
                }}
                display="block"
            >
                Telefone
            </Typography>

            <div
                style={{ marginBottom: '20px' }}
                className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-md26zr-MuiInputBase-root-MuiOutlinedInput-root"
            >
                <IMaskInput
                    style={{ width: '100%' }}
                    className="MuiInputBase-input MuiOutlinedInput-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input"
                    id="telefone"
                    name="telefone"
                    placeholder="Telefone"
                    mask="(00) 00000-0000"
                    value={contato.telefone}
                    onAccept={(value) => {
                        handleNumberChange(value);
                    }}
                    onChange={handleChange}
                />
                <fieldset
                    aria-hidden="true"
                    className="MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline"
                >
                    <legend className="css-ihdtdm">
                        <span className="notranslate" />
                    </legend>
                </fieldset>
            </div>
            <Typography
                variant="subtitle1"
                sx={{
                    color: '#344054',
                }}
                display="block"
            >
                Email
            </Typography>
            <TextField
                error={wrong}
                id="email"
                name="email"
                variant="outlined"
                placeholder="Email"
                fullWidth
                value={contato.email}
                sx={Input.input}
                onChange={handleChange}
                onBlur={() => {
                    if (contato.email != '') {
                        setWrong(!validade.validateEmail(contato.email));
                    }
                }}
                helperText={helperText}
            />
        </>
    );
};
export default IndustriaContato;
