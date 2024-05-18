import { Dispatch, SetStateAction, SyntheticEvent, useEffect, useState } from 'react';

import { Box } from '@mui/system';
import {
    Autocomplete,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Modal,
    TextField,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { Cargo } from '@/enums/Cargo';
import { useNotification } from '@/hooks/useNotification';
import { VendedorModel } from '@/models/VendedorModel';
import apiFetch from '@/services/api';
import * as ButtonStyle from '@/styles/types/ButtonsStyles';
import * as Input from '@/styles/types/InputStyles';
import * as ModalStyle from '@/styles/types/ModalStyles';
import Validade from '@/utils/Validate';
interface IRegisterModalProps {
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    openModal: boolean;
    setReload: Dispatch<SetStateAction<boolean>>;
    updateVendedor: VendedorModel | undefined;
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
            id: props.updateVendedor?.id || null,
            nome: refNome,
            email: refEmail,
            cargo: refCargo,
        };

        if (refEmail != '' && refNome != '' && refCargo != '') {
            if (validate.validateEmail(refEmail)) {
                if (props.updateVendedor == undefined) {
                    setLoading(true);
                    apiFetch
                        .post('/vendedor/admin/save', obj)
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
                        .put(`/vendedor/admin/update/${obj.id}`, obj)
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
                showNotification({ message: 'informe um email valido', type: 'error', title: 'Email invalido' });
            }
        } else {
            showNotification({ message: 'preencha todos os campos', type: 'error' });
        }
    }
    function ChangeModalState() {
        props.setOpenModal(!open);
    }
    useEffect(() => {
        setRefCargo(props.updateVendedor?.cargo || '');
        setRefEmail(props.updateVendedor?.email || '');
        setRefNome(props.updateVendedor?.nome || '');
    }, [props.updateVendedor]);
    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            open={props.openModal}
            onClose={handleClose}
            sx={{
                pointerEvents: loading ? 'none' : 'auto',
            }}
        >
            <DialogTitle>
                {props.updateVendedor == undefined ? 'Cadastrar vendedor' : 'Atualizar ' + props.updateVendedor.nome}
            </DialogTitle>
            <DialogContent>
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
                    id="email"
                    variant="outlined"
                    placeholder="Email"
                    fullWidth
                    value={refEmail}
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
                    id="cargo"
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
                    apenas administradores, podem cadastrar novos vendedores
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={ChangeModalState} variant="outlined">
                    Cancelar
                </Button>
                <Button onClick={onSubmit} variant="contained">
                    {props.updateVendedor == undefined ? 'Cadastrar' : 'Atualizar '}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default RegisterModal;
