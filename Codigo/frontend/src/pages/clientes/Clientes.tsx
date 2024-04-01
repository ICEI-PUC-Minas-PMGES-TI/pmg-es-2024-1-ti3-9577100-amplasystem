import { useEffect, useMemo, useState } from 'react';

import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import AddIcon from '@mui/icons-material/Add';
import apiFetch from '@/services/api';
import { ClienteModel } from '@/models/ClienteModel';
import { Box } from '@mui/system';
import { Button, IconButton, Typography } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { Delete, Edit, Email } from '@mui/icons-material';
import { useAuth } from '@/hooks/useAuth';
import { useNotification } from '@/hooks/useNotification';

const ClientesPage = () => {
    const { showNotification } = useNotification();

    const [cliente, setCliente] = useState<ClienteModel | null>(null);
    const [clientes, setClientes] = useState<ClienteModel[]>([]);
    const [tableLoading, setTableLoading] = useState(true);
    const [dialogState, setDialogState] = React.useState(false);

    const handleClickOpen = () => {
        setDialogState(true);
    };
    const handleClose = () => {
        setDialogState(false);
    };

    const getClientes = async () => {
        setTableLoading(true);
        try {
            const res = await apiFetch.get('/clientes');
            setClientes(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setTableLoading(false);
        }
    };
    const postCliente = async (novoCliente: any) => {
        setTableLoading(true);
        try {
            const res = await apiFetch.post('/clientes/', novoCliente);
            showNotification({
                message: res.data.message,
                title: res.data.titulo,
                type: 'success',
            });
            getClientes();
        } catch (err) {
            console.log(err);
        } finally {
            setTableLoading(false);
        }
    };
    const updateCliente = async () => {
        setTableLoading(true);
        try {
            const res = await apiFetch.put(`/clientes/${cliente?.id}`, cliente);
            showNotification({
                message: res.data.message,
                title: res.data.titulo,
                type: 'success',
            });
            getClientes();
        } catch (err) {
            console.log(err);
        } finally {
            setTableLoading(false);
        }
    };
    const deleteCliente = async (id: number) => {
        setTableLoading(true);
        try {
            const res = await apiFetch.delete(`/clientes/${id}`);
            showNotification({
                message: res.data.message,
                title: res.data.titulo,
                type: 'success',
            });
            getClientes();
        } catch (err) {
            console.log(err);
        } finally {
            setTableLoading(false);
        }
    };
    const columns = useMemo<MRT_ColumnDef<ClienteModel>[]>(
        () => [
            {
                accessorKey: 'nome_fantasia',
                header: 'Nome fantasia',
            },
            {
                accessorKey: 'cnpj',
                header: 'CNPJ',
            },
            {
                accessorKey: 'telefone',
                header: 'Telefone',
            },
            {
                accessorKey: 'cidade',
                header: 'Cidade',
            },
            {
                accessorKey: 'endereco',
                header: 'Endereço',
            },
        ],
        [],
    );
    const table = useMaterialReactTable({
        columns: columns,
        data: clientes,
        //passing the static object variant if no dynamic logic is needed
        muiSelectCheckboxProps: {
            color: 'secondary', //makes all checkboxes use the secondary color
        },
        enableRowActions: true,
        columnResizeMode: 'onChange',
        positionActionsColumn: 'last',
        displayColumnDefOptions: {
            'mrt-row-select': {
                size: 50, //adjust the size of the row select column
                grow: false, //new in v2.8 (default is false for this column)
            },
            'mrt-row-numbers': {
                size: 40,
                grow: true, //new in v2.8 (allow this column to grow to fill in remaining space)
            },
        },
        renderRowActions: ({ row }) => (
            <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                <IconButton
                    sx={{
                        color: '#097C9C',
                    }}
                    onClick={() => window.open(`mailto:${row.original.cnpj}?subject=Ampla System!`)}
                >
                    <Email />
                </IconButton>
                <IconButton
                    onClick={() => {
                        setDialogState(true);
                        setCliente(JSON.parse(JSON.stringify(row.original)));
                    }}
                >
                    <Edit />
                </IconButton>
                <IconButton
                    color="error"
                    onClick={() => {
                        if (row.original.id != null) {
                            deleteCliente(row.original.id);
                        }
                    }}
                >
                    <Delete />
                </IconButton>
            </Box>
        ),

        muiTableContainerProps: {
            sx: { maxWidth: '100%' },
        },
        muiTopToolbarProps: {
            sx: {
                fontWeight: 'bold',
                fontSize: '16px',
            },
        },
        muiBottomToolbarProps: {
            sx: {
                fontWeight: 'bold',
                fontSize: '16px',
            },
        },
        muiTableHeadCellProps: {
            sx: {
                fontWeight: 'bold',
                fontSize: '16px',
            },
        },
        muiTableBodyCellProps: {
            sx: {
                fontWeight: 'normal',
                fontSize: '16px',
            },
        },
    });
    return (
        <React.Fragment>
            <header className="flex justify-between">
                <Typography variant="h4">Clientes</Typography>
                <Button variant="contained" onClick={handleClickOpen} endIcon={<AddIcon sx={{ fontSize: 5 }} />}>
                    Adicionar cliente
                </Button>
            </header>
            <MaterialReactTable table={table} />
            <Dialog
                open={dialogState}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        console.log('FormJson', formJson);
                        postCliente(formJson);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>{cliente ? `Editar ${cliente.nome_fantasia}` : `Adicionar cliente`}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{cliente ? 'Edição' : 'Criação'} de cliente</DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="clienteNomeFantasia"
                        name="nome_fantasia"
                        label="Nome fantasia"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        id="clienteCnpj"
                        name="cnpj"
                        label="CNPJ"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        id="clienteTelefone"
                        name="telefone"
                        label="Telefone"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        id="clienteCidade"
                        name="cidade"
                        label="Cidade"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        id="clienteEndereco"
                        name="endereco"
                        label="Endereço"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Salvar</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default ClientesPage;
