import * as React from 'react';
import { Box } from '@mui/system';
import { Autocomplete, Button, Dialog, IconButton, Modal, TextField, Typography } from '@mui/material';
import apiFetch from '../../services/api';
import { useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { VendedorModel } from 'models/VendedorModel';

interface IRegisterModalProps {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    openModal: boolean;
    setReload: React.Dispatch<React.SetStateAction<boolean>>;
    updateVendedor: VendedorModel | undefined;
}
const RegisterModal = (props: IRegisterModalProps) => {
    const optionCargo = ['ADMINISTRADOR', 'VENDEDOR'];
    const [refNome, setRefNome] = React.useState('');
    const [refEmail, setRefEmail] = React.useState('');
    const [refCargo, setRefCargo] = React.useState('');

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

        if (props.updateVendedor == undefined) {
            apiFetch.post('/vendedor/admin/save', obj).then((data) => {
                console.log(data);
                props.setReload(true);
            });
        } else {
            apiFetch.put(`/vendedor/admin/update/${obj.id}`, obj).then((data) => {
                console.log(data);
                props.setReload(true);
            });
        }
        setRefCargo('');
        setRefEmail('');
        setRefNome('');
    }
    function ChangeModalState() {
        props.setOpenModal(!open);
    }
    React.useEffect(() => {
        setRefCargo(props.updateVendedor?.cargo || '');
        setRefEmail(props.updateVendedor?.email || '');
        setRefNome(props.updateVendedor?.nome || '');
    }, [props.updateVendedor]);
    const MODAL_STYLE = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        padding: '50px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        color: 'black',
    };
    return (
        <Modal open={props.openModal} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
            <Dialog fullWidth={true} maxWidth="md" open={props.openModal} onClose={handleClose}>
                <Box sx={{ ...MODAL_STYLE }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                        sx={{
                            padding: 0,
                            height: '10px',
                            position: 'absolute',
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
                        {props.updateVendedor == undefined ? 'Cadastrar' : 'Atualizar '} vendedor
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
                        sx={{
                            marginBottom: '20px',
                            borderRadius: '8px',
                            maxWidth: 720,
                            height: 65,
                        }}
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
                        sx={{
                            marginBottom: '20px',
                            borderRadius: '8px',
                            maxWidth: 720,
                            height: 65,
                        }}
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
                        onSelect={(event: React.SyntheticEvent<HTMLDivElement, Event>) => {
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

                    <Button
                        onClick={onSubmit}
                        variant="contained"
                        sx={{
                            mt: 2,
                            maxWidth: 720,
                            backgroundColor: '#788DAA',
                            width: '100%',
                            height: 55,
                        }}
                    >
                        {props.updateVendedor == undefined ? 'Cadastrar' : 'Atualizar '}
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
                </Box>
            </Dialog>
        </Modal>
    );
};
export default RegisterModal;
