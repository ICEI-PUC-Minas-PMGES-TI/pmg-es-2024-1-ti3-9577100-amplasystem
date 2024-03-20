import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import apiFetch from '../../services/api';
import { VendedorModel } from 'models/VendedorModel';
import { Box } from '@mui/system';
import { Autocomplete, Button, Fab, Modal, TextField, Typography } from '@mui/material';
import constructWithOptions from 'styled-components/dist/constructors/constructWithOptions';
import { useRef } from 'react';
import styled from 'styled-components';

const IndustriaPage = () => {
    const [data, setData] = React.useState<[any]>([{}]);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        getVendedores();
    }, []);

    function ChangeModalState() {
        setOpen(!open);
    }

    function getVendedores() {
        apiFetch
            .get('/industria/')
            .then((data) => {
                setData(data.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    const MODAL_STYLE = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        padding: '150px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        color: 'black',
    };

    const optionCargo = ['ADIMINISTRADOR', 'VENDEDOR'];

    const refNome = useRef<HTMLInputElement>(null);
    const refEmail = useRef<HTMLInputElement>(null);
    const [refCargo, setRefCargo] = React.useState('');

    function onSubmit() {
        const obj = {
            nome: refNome.current?.value || '',
            email: refEmail.current?.value || '',
            cargo: refCargo,
        };

        apiFetch.post('/vendedor/admin/save', obj).then((data) => {
            console.log(data);
            getVendedores();
        });
    }
    const tipos = ['Financeiro', 'Comercial', 'Logistica', 'Pagamento'];
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    return (
        <Box display={'flex'}>
            <TableContainer component={Paper} sx={{ marginTop: '70px' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Nome</TableCell>
                            {tipos.map((tipo) => {
                                return (
                                    <>
                                        <TableCell align="center">Nome {tipo}</TableCell>
                                        <TableCell align="center">Telefone {tipo} </TableCell>
                                        <TableCell align="center">Email {tipo} </TableCell>
                                    </>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((vendedor) => (
                            <TableRow key={vendedor.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {vendedor.nome}
                                    {console.log(vendedor)}
                                </TableCell>
                                {vendedor?.contatos?.map((contato: any) => {
                                    return (
                                        <>
                                            <TableCell align="center">{contato.nome}</TableCell>
                                            <TableCell align="center">{contato.telefone}</TableCell>
                                            <TableCell align="center">{contato.email}</TableCell>
                                        </>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Fab onClick={ChangeModalState} color="primary" aria-label="add">
                <AddIcon />
            </Fab>

            <Modal open={open} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
                <Box sx={{ ...MODAL_STYLE }}>
                    <Button component="label" role={undefined} variant="contained" tabIndex={-1}>
                        Upload file
                        <VisuallyHiddenInput type="file" onChange={(e) => console.log(e)} />
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default IndustriaPage;
