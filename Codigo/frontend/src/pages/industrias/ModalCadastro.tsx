import { Container } from '@mui/system';
import { Box, Button, CircularProgress, Dialog, IconButton, Modal, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IndustriaModel } from 'models/IndustriaModel';
import * as Sx from './IndustriasStyle';
import { TipoContato } from '../../enums/TipoContato';
import IndustriaContato from './IndustriaContato';
import { ContatoModel } from 'models/ContatoModels';
import { JSX } from 'react/jsx-runtime';
import { useNotification } from '../../hooks/useNotification';
import apiFetch from '../../services/api';
import Validade from '../../utils/Validate';
interface IRegisterModalProps {
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    openModal: boolean;
    setReload: Dispatch<SetStateAction<boolean>>;
    updateIndustria: IndustriaModel | undefined;
}

const RegisterModal = (props: IRegisterModalProps) => {
    const [loading, setLoading] = useState(false);
    const tiposContatos = Object.values(TipoContato);
    const { showNotification } = useNotification();
    const [reset, setRest] = useState<boolean>(false);
    const [contatoList, setContatoList] = useState<JSX.Element[]>([]);
    const validade = new Validade();
    const handleClose = () => {
        props.setOpenModal(false);
    };

    function ChangeModalState() {
        props.setOpenModal(!open);
    }
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        if (industria != undefined) {
            setIndustria({ ...industria, [e.target.name]: e.target.value });
        }
    }
    function handleChangeContato(contato: ContatoModel, index: number) {
        const aux: IndustriaModel | undefined = industria;
        if (aux != undefined) {
            aux.contatos[index] = contato;
            setIndustria(aux);
        }
    }
    useEffect(() => {
        setIndustria(props.updateIndustria);
    }, [props.updateIndustria]);
    const [industria, setIndustria] = useState<IndustriaModel | undefined>(props.updateIndustria);
    console.log;

    useEffect(() => {
        if (industria == undefined || reset) {
            setIndustria({
                id: null,
                nome: '',
                contatos: [
                    {
                        id: null,
                        nome: '',
                        tipoContato: TipoContato.Comercial,
                        telefone: '',
                        email: '',
                    },
                    {
                        id: null,
                        nome: '',
                        tipoContato: TipoContato.Financeiro,
                        telefone: '',
                        email: '',
                    },
                    {
                        id: null,
                        nome: '',
                        tipoContato: TipoContato.Pagamento,
                        telefone: '',
                        email: '',
                    },
                    {
                        id: null,
                        nome: '',
                        tipoContato: TipoContato.Logistica,
                        telefone: '',
                        email: '',
                    },
                ],
            });
            setRest(!reset);
        } else if (industria?.contatos.length < 4) {
            const tiposCadastrados: Array<TipoContato> = new Array<TipoContato>();
            const aux = industria;
            aux.contatos.map((element) => {
                tiposCadastrados.push(element.tipoContato);
            });
            tiposContatos.map((tipo) => {
                if (tiposCadastrados.indexOf(tipo) == -1) {
                    console.log(tipo);
                    aux.contatos.push({
                        nome: '',
                        email: '',
                        id: null,
                        tipoContato: tipo,
                        telefone: '',
                    });
                }
            });
            setIndustria(aux);
        }
        const aux2: JSX.Element[] = [];
        industria?.contatos.map((element, index) => {
            aux2.push(
                <IndustriaContato
                    key={element.tipoContato}
                    contatoModel={element}
                    index={index}
                    handleChange={handleChangeContato}
                />,
            );
        });
        setContatoList(aux2);
    }, [props.updateIndustria, reset]);

    function onSubmit() {
        const obj: IndustriaModel = JSON.parse(JSON.stringify(industria));
        obj.contatos = obj.contatos.filter((contato) => contato.nome != '');
        let wasInvalidEmail = false;
        let wasInvalidCellphoneNumber = false;
        obj.contatos.map((contato) => {
            wasInvalidEmail = !validade.validateEmail(contato.email);
            wasInvalidCellphoneNumber = !validade.validateCellphone(contato.telefone);
        });
        if (wasInvalidEmail) {
            showNotification({
                message: 'confira os emails informados ',
                type: 'error',
                title: 'Emails inválidos',
            });
        } else if (wasInvalidCellphoneNumber) {
            showNotification({
                message: 'confira os telefones informados ',
                type: 'error',
                title: 'Telefones inválidos',
            });
        } else {
            if (props.updateIndustria == undefined) {
                setLoading(true);
                apiFetch
                    .post('industria/', obj)
                    .then((data) => {
                        props.setReload(true);
                        showNotification({
                            message: data.data.message,
                            type: 'success',
                            title: data.data.titulo,
                        });
                        setRest(true);
                    })
                    .catch((error) => {
                        showNotification({
                            message: error.response.data.message,
                            type: 'error',
                            title: error.response.data.titulo,
                        });
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            } else {
                setLoading(true);
                console.log(obj);
                apiFetch
                    .put(`industria/`, obj)
                    .then((data) => {
                        props.setReload(true);
                        showNotification({ message: data.data.message, type: 'success', title: data.data.titulo });
                    })
                    .catch((error) => {
                        showNotification({
                            message: error.response.data.message,
                            type: 'error',
                            title: error.response.data.titulo,
                        });
                    })
                    .finally(() => {
                        setLoading(false);
                        props.setOpenModal(false);
                    });
            }
        }
    }

    return (
        <Modal open={props.openModal} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
            <Dialog
                fullWidth={true}
                maxWidth="md"
                open={props.openModal}
                onClose={handleClose}
                sx={{
                    pointerEvents: loading ? 'none' : 'auto',
                }}
            >
                <Box sx={{ ...Sx.MODAL_STYLE }}>
                    <CircularProgress
                        sx={{
                            visibility: loading ? 'visible' : 'hidden',
                            position: 'absolute',
                            top: '40%',
                            left: '45%',
                        }}
                    />
                    <Container>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                            sx={{
                                padding: 0,
                                height: '10px',
                                position: 'fixed',
                                top: 20,
                                left: 20,
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography
                            variant="h3"
                            gutterBottom
                            sx={{
                                color: '#344054',
                            }}
                        >
                            {props.updateIndustria == undefined ? 'Cadastrar' : 'Atualizar '} Industria
                        </Typography>
                    </Container>
                    <Box
                        sx={{
                            maxHeight: '40vh',

                            overflowY: 'scroll',
                            overflowX: 'hidden',
                            paddingRight: 3,

                            listStyle: 'none',

                            '&::-webkit-scrollbar': {
                                width: '0.4em',
                            },
                            '&::-webkit-scrollbar-track': {
                                boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                                webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: 'rgba(0,0,0,.1)',
                                outline: '1px solid slategrey',
                            },
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: '#344054',
                            }}
                            display="block"
                        >
                            Nome da industria
                        </Typography>
                        <TextField
                            id="nome"
                            name="nome"
                            variant="outlined"
                            placeholder="Nome"
                            fullWidth
                            value={industria?.nome}
                            sx={Sx.input}
                            onChange={handleChange}
                        />

                        {props.updateIndustria == undefined
                            ? industria?.contatos.map((element, index) => {
                                  return (
                                      <IndustriaContato
                                          key={element.tipoContato}
                                          contatoModel={element}
                                          index={index}
                                          reset={reset}
                                          handleChange={handleChangeContato}
                                      />
                                  );
                              })
                            : contatoList.map((element) => {
                                  return element;
                              })}
                    </Box>
                    <Container>
                        <Button
                            variant="contained"
                            sx={{
                                mt: 2,
                                maxWidth: 720,
                                backgroundColor: '#788DAA',
                                width: '100%',
                                height: 55,
                            }}
                            onClick={onSubmit}
                        >
                            {props.updateIndustria == undefined ? 'Cadastrar' : 'Atualizar '}
                        </Button>
                        <Button
                            onClick={ChangeModalState}
                            variant="contained"
                            sx={{
                                mt: 2,
                                maxWidth: 720,
                                backgroundColor: '#FFFFFF',
                                color: 'black',
                                width: '100%',
                                height: 55,
                            }}
                        >
                            Cancelar
                        </Button>
                    </Container>
                </Box>
            </Dialog>
        </Modal>
    );
};
export default RegisterModal;
