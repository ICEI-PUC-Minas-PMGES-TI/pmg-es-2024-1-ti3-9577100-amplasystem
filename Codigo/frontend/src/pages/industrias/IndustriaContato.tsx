import { TextField, Typography } from '@mui/material';
import * as Sx from './IndustriasStyle';
import { ChangeEvent, useEffect, useState } from 'react';
import { ContatoModel } from 'models/ContatoModels';
interface IRegisterModalProps {
    contatoModel: ContatoModel;
    index: number;
    handleChange: (contato: ContatoModel, index: number) => void;
}
const IndustriaContato = (props: IRegisterModalProps) => {
    const [contato, setContato] = useState<ContatoModel>(props.contatoModel);
    useEffect(() => {
        props.handleChange(contato, props.index);
    }, [contato]);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target as HTMLInputElement;
        setContato({ ...contato, [name]: value });
    }
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
                sx={Sx.input}
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
            <TextField
                id="telefone"
                variant="outlined"
                name="telefone"
                placeholder="Telefone"
                fullWidth
                sx={Sx.input}
                value={contato.telefone}
                onChange={handleChange}
            />
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
                id="email"
                name="email"
                variant="outlined"
                placeholder="Email"
                fullWidth
                value={contato.email}
                sx={Sx.input}
                onChange={handleChange}
            />
        </>
    );
};
export default IndustriaContato;
