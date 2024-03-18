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
import { Fab } from '@mui/material';

const VendedoresPage = () => {
    const [data, setData] = React.useState<[VendedorModel]>([{}]);

    React.useEffect(() => {
        apiFetch
            .get('/vendedor')
            .then((data) => {
                setData(data.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

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
            <Fab color="primary" aria-label="add">
                <AddIcon />
            </Fab>
        </Box>
    );
};

export default VendedoresPage;
