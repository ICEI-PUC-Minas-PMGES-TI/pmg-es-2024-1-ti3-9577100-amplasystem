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


const VendedoresPage = () => {
    const [data, setData] = React.useState<[VendedorModel]>([{}]);
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        getVendedores()
    }, []);


    function ChangeModalState() {
        setOpen(!open);
    }

    function getVendedores() {
        apiFetch
            .get('/vendedor')
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
        color: 'black'
    }

    const optionCargo = ["ADIMINISTRADOR", "VENDEDOR"]

    const refNome = useRef<HTMLInputElement>(null);
    const refEmail = useRef<HTMLInputElement>(null);
    const [refCargo, setRefCargo] = React.useState("")

    function onSubmit() {
        const obj = {
            "nome": refNome.current?.value || '',
            "email": refEmail.current?.value || '',
            "cargo": refCargo
        }

        apiFetch.post("/vendedor/admin/save", obj)
            .then(data => {
                console.log(data)
                getVendedores();
            })


    }



    return (
        <Box display={'flex'}>
            <TableContainer component={Paper} sx={{ marginTop: '70px' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Nome</TableCell>
                            <TableCell align="center">email</TableCell>
                            <TableCell align="center">Cargo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((vendedor) => (
                            <TableRow key={vendedor.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {vendedor.nome}
                                </TableCell>
                                <TableCell align="center">{vendedor.email}</TableCell>
                                <TableCell align="center">{vendedor.cargo}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Fab onClick={ChangeModalState} color="primary" aria-label="add">
                <AddIcon />
            </Fab>

            <Modal
                open={open}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...MODAL_STYLE }}>
                    <h2 id="parent-modal-title">Cadastrar vendedor</h2>

                    <TextField
                        id="nome"
                        label="Nome"
                        variant="outlined"
                        placeholder="Nome"
                        fullWidth
                        margin="normal"
                        sx={{
                            borderRadius: '8px',
                            maxWidth: 720,
                            height: 65,
                        }}
                        inputRef={refNome}
                    />

                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        placeholder="Email"
                        fullWidth
                        margin="normal"
                        sx={{
                            borderRadius: '8px',
                            maxWidth: 720,
                            height: 65,
                        }}
                        inputRef={refEmail}
                    />

                    <Autocomplete
                        disablePortal
                        id="cargo"
                        options={optionCargo}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Cargo" />}
                        onSelect={(event) => {
                            setRefCargo(event.target.value)
                        }}
                    />

                    <Button
                        onClick={onSubmit}
                        variant="contained"
                        sx={{
                            mt: 2,
                            maxWidth: 720,
                            backgroundColor: '#45BCEF',
                            width: '100%',
                            height: 55,
                        }}
                    >
                        Confirmar
                    </Button>

                    <Button
                        onClick={ChangeModalState}
                        variant="contained"
                        sx={{
                            mt: 2,
                            maxWidth: 720,
                            backgroundColor: '#45BCEF',
                            width: '100%',
                            height: 55,
                        }}
                    >
                        Cancelar
                    </Button>

                    <button onClick={ChangeModalState}>Fechar</button>
                </Box>
            </Modal>

        </Box>
    );
};

export default VendedoresPage;
