import {Stack, TextField} from '@mui/material';
import {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from 'react';
import {ContatoModel} from 'models/ContatoModels';
import Validade, {formatPhoneNumber} from '@/utils/Validate';


interface IRegisterModalProps {
    contatoModel: ContatoModel;
    index: number;
    reset: boolean;
    preenchido: boolean;
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


    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target as HTMLInputElement;
        if (name == "telefone") {
            setContato({...contato, [name]: formatPhoneNumber(value)});
        } else {
            setContato({...contato, [name]: value});
        }
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
            <Stack spacing={ 2 } direction="row">
                <div style={ {width: "50%"} }>
                    <TextField
                        margin="dense"
                        id="nome"
                        placeholder="Nome"
                        name="nome"
                        label="Nome"
                        fullWidth
                        value={ contato.nome }
                        onChange={ handleChange }

                    />

                </div>
                <div style={ {width: "50%"} }>
                    <TextField
                        margin="dense"
                        id="telefone"
                        name="telefone"
                        label="Telefone"
                        fullWidth
                        value={ contato.telefone }
                        onChange={ handleChange }

                    />

                </div>
            </Stack>

            <TextField
                error={ wrong }

                margin="dense"
                id="email"
                name="email"
                label="email"
                fullWidth
                value={ contato.email }
                onChange={ handleChange }
                onBlur={ () => {
                    if (contato.email != '') {
                        setWrong(!validade.validateEmail(contato.email));
                    }
                } }
                helperText={ helperText }

            />

        </>
    );
};
export default IndustriaContato;
