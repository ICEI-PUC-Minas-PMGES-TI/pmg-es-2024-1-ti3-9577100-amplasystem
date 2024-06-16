import { Dispatch, SetStateAction, SyntheticEvent, useEffect, useState } from 'react';

import { Box } from '@mui/system';
import {
    Autocomplete,
    Button,
    CircularProgress,
    Dialog,
    IconButton,
    Modal,
    TextField,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { Cargo } from '@/enums/Cargo';
import { useNotification } from '@/hooks/useNotification';
import { ClienteModel } from '@/models/ClienteModel';
import apiFetch from '@/services/api';
import * as ButtonStyle from '@/styles/types/ButtonsStyles';
import * as Input from '@/styles/types/InputStyles';
import * as ModalStyle from '@/styles/types/ModalStyles';
import Validade from '@/utils/Validate';
interface IRegisterModalProps {
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    openModal: boolean;
    setReload: Dispatch<SetStateAction<boolean>>;
    updateCliente: ClienteModel | undefined;
}
const RegisterModal = (props: IRegisterModalProps) => {
    const optionCargo = [Cargo.ADMINISTRADOR, Cargo.VENDEDOR];
    const [refNome, setRefNome] = useState('');
    const [refEmail, setRefEmail] = useState('');
    const [refCargo, setRefCargo] = useState('');
    const [loading, setLoading] = useState(false);
    const { showNotification } = useNotification();
    const validate = new Validade();
    const handleClose = () => {
        props.setOpenModal(false);
    };

    function onSubmit() {
        const obj = {
            id: props.updateCliente?.id || null,
            nome: refNome,
            cnpj: refEmail,
            nome_fantasia: refCargo,
        };

        if (refEmail != '' && refNome != '' && refCargo != '') {
            if (validate.validateEmail(refEmail)) {
                if (props.updateCliente == undefined) {
                    setLoading(true);
                    apiFetch
                        .post('/cliente', obj)
                        .then((data) => {
                            props.setReload(true);
                            showNotification({
                                message: data.data.message,
                                type: 'success',
                                title: data.data.titulo,
                            });
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
                    apiFetch
                        .put(`/cliente/${obj.id}`, obj)
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
                setRefCargo('');
                setRefEmail('');
                setRefNome('');
            } else {
                showNotification({ message: 'informe um cnpj valido', type: 'error', title: 'Email invalido' });
            }
        } else {
            showNotification({ message: 'preencha todos os campos', type: 'error' });
        }
    }
    function ChangeModalState() {
        props.setOpenModal(!open);
    }
    useEffect(() => {
        setRefCargo(props.updateCliente?.nomeFantasia || '');
        setRefEmail(props.updateCliente?.cnpj || '');
        setRefNome(props.updateCliente?.endereco?.toString() || '');
    }, [props.updateCliente]);
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
                <Box sx={{ ...ModalStyle.Modal }}>
                    <CircularProgress
                        sx={{
                            visibility: loading ? 'visible' : 'hidden',
                            position: 'absolute',
                            top: '40%',
                            left: '45%',
                        }}
                    />
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                        sx={ButtonStyle.closeButton}
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
                        {props.updateCliente == undefined ? 'Cadastrar' : 'Atualizar '} cliente
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: '#344054',
                        }}
                        display="block"
                    >
                        Nome *
                    </Typography>
                    <TextField
                        id="nome"
                        variant="outlined"
                        placeholder="Nome"
                        fullWidth
                        value={refNome}
                        sx={Input.input}
                        onChange={(event) => {
                            setRefNome(event.target.value);
                        }}
                    />
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: '#344054',
                        }}
                        display="block"
                    >
                        Email *
                    </Typography>
                    <TextField
                        id="cnpj"
                        variant="outlined"
                        placeholder="Email"
                        fullWidth
                        value={refEmail}
                        sx={Input.input}
                        onChange={(event) => {
                            setRefEmail(event.target.value);
                        }}
                    />
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: '#344054',
                        }}
                        display="block"
                    >
                        Cargo *
                    </Typography>
                    <Autocomplete
                        disablePortal
                        id="nome_fantasia"
                        options={optionCargo}
                        fullWidth
                        value={refCargo}
                        renderInput={(params) => <TextField {...params} placeholder="Cargo" />}
                        onSelect={(event: SyntheticEvent<HTMLDivElement, Event>) => {
                            setRefCargo((event.target as HTMLInputElement).value || '');
                        }}
                    />
                    <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                        sx={{
                            color: '#344054',
                        }}
                    >
                        apenas administradores, podem cadastrar novos clientees
                    </Typography>

                    <Button onClick={onSubmit} variant="contained" sx={ButtonStyle.greenButton}>
                        {props.updateCliente == undefined ? 'Cadastrar' : 'Atualizar '}
                    </Button>

                    <Button onClick={ChangeModalState} variant="contained" sx={ButtonStyle.whiteButton}>
                        Cancelar
                    </Button>
                </Box>
            </Dialog>
        </Modal>
    );
};
export default RegisterModal;