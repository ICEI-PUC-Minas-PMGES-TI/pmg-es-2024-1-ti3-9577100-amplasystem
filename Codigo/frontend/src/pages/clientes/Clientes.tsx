import { useEffect, useMemo, useState, useCallback } from 'react';

import axios, { AxiosError } from 'axios';

import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/system';
import { Button, FormControl, IconButton, InputLabel, MenuItem, Modal, Select, Typography } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { Delete, Edit, Email } from '@mui/icons-material';

import apiFetch from '@/services/api';
import { ClienteFormModel, ClienteModel } from '@/models/ClienteModel';
import { VendedorModel } from '@/models/VendedorModel';
import { useAuth } from '@/hooks/useAuth';
import { useNotification } from '@/hooks/useNotification';

const ClientesPage = () => {
    const { showNotification } = useNotification();

    const [cliente, setCliente] = useState<ClienteModel | null>(null);
    const [clientes, setClientes] = useState<ClienteModel[]>([]);
    const [tableLoading, setTableLoading] = useState(true);
    const [dialogState, setDialogState] = React.useState(false);

    const [vendedores, setVendedores] = useState<VendedorModel[]>([]);

    const cleanFormData = () => {
        setCliente(null);
    };

    const handleClickOpen = () => {
        setDialogState(true);
        cleanFormData();
    };
    const handleClose = () => {
        setDialogState(false);
    };

    const getVendedores = useCallback(async () => {
        try {
            const res = await apiFetch.get('/vendedor');
            setVendedores(res.data);
        } catch (err) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        getVendedores();
    }, [getVendedores]);

    const getClientes = useCallback(async () => {
        setTableLoading(true);
        try {
            const res = await apiFetch.get('/cliente/');
            setClientes(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setTableLoading(false);
        }
    }, []);

    useEffect(() => {
        getClientes();
    }, [getClientes]);

    const postCliente = async (novoCliente: ClienteFormModel) => {
        setTableLoading(true);
        try {
            const res = await apiFetch.post('/cliente/', novoCliente);
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
    const updateCliente = async (clienteAtualizado: ClienteFormModel) => {
        setTableLoading(true);
        try {
            const res = await apiFetch.put(`/cliente/${cliente?.id}`, clienteAtualizado);
            showNotification({
                message: res.data.message,
                title: res.data.titulo,
                type: 'success',
            });
            getClientes();
        } catch (err: any | AxiosError) {
            console.log('Update err', err);
            if (axios.isAxiosError(err)) {
                showNotification({
                    message: err ? err.message : 'Erro não especificado',
                    title: 'Erro ao atualizar cliente',
                    type: 'error',
                });
            } else {
                console.log('Update err', err);
            }
        } finally {
            setTableLoading(false);
        }
    };
    const deleteCliente = async (id: number) => {
        setTableLoading(true);
        try {
            const res = await apiFetch.delete(`/cliente/${id}`);
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
                accessorKey: 'nomeFantasia',
                header: 'Nome fantasia',
                Cell: ({ cell }) => (
                    <Typography variant="body1">{cell.getValue<string>() ?? 'Não informado'}</Typography>
                ),
            },
            {
                accessorKey: 'cnpj',
                header: 'CNPJ',
                Cell: ({ cell }) => (
                    <Typography variant="body1">{cell.getValue<string>() ?? 'Não informado'}</Typography>
                ),
            },
            {
                accessorKey: 'telefone',
                header: 'Telefone',
                Cell: ({ cell }) => (
                    <Typography variant="body1">{cell.getValue<string>() ?? 'Não informado'}</Typography>
                ),
            },
            {
                accessorKey: 'endereco.cidade',
                header: 'Cidade',
                Cell: ({ cell }) => (
                    <Typography variant="body1">{cell.getValue<string>() ?? 'Não informado'}</Typography>
                ),
            },
            {
                accessorKey: 'endereco.rua',
                header: 'Rua',
                Cell: ({ cell }) => (
                    <Typography variant="body1">{cell.getValue<string>() ?? 'Não informado'}</Typography>
                ),
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
                    onClick={() => {
                        setDialogState(true);
                        console.log('Row', row.original);
                        setCliente(row.original);
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
            <header className="flex justify-between mb-5">
                <Typography variant="h4">Clientes</Typography>
                <Button onClick={handleClickOpen} endIcon={<AddIcon sx={{ fontSize: 5 }} />}>
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
                        const formJson = Object.fromEntries(formData.entries());

                        let _cliente: ClienteFormModel = {
                            id: cliente?.id ?? null,
                            nomeFantasia: String(formJson?.nomeFantasia),
                            cnpj: String(formJson.cnpj),
                            idVendedor: formJson.idVendedor ? Number(formJson.idVendedor) : 0,
                            telefone: formJson.telefone ? String(formJson.telefone) : undefined,
                            endereco: {
                                id: formJson.enderecoId ? Number(formJson.enderecoId) : null,
                                cidade: formJson.cidade ? String(formJson.cidade) : undefined,
                                rua: formJson.rua ? String(formJson.rua) : undefined,
                            },
                        };

                        console.log('FormJson', formJson);
                        _cliente.id ? updateCliente(_cliente) : postCliente(_cliente);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>{cliente ? `Editar ${cliente.nomeFantasia}` : `Adicionar cliente`}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{cliente ? 'Edição' : 'Criação'} de cliente</DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="clienteNomeFantasia"
                        name="nomeFantasia"
                        label="Nome fantasia"
                        fullWidth
                        defaultValue={cliente?.nomeFantasia}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="clienteCnpj"
                        name="cnpj"
                        label="CNPJ"
                        fullWidth
                        defaultValue={cliente?.cnpj}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="vendedorLabel">Vendedor</InputLabel>
                        <Select
                            labelId="vendedorLabel"
                            label="Vendedor"
                            defaultValue={cliente?.vendedor?.id}
                            name="idVendedor"
                        >
                            {vendedores.map((vendedor) => (
                                <MenuItem key={vendedor.id} value={Number(vendedor.id)}>
                                    {vendedor.nome}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        id="clienteTelefone"
                        name="telefone"
                        label="Telefone"
                        fullWidth
                        defaultValue={cliente?.telefone}
                    />
                    <TextField
                        margin="dense"
                        id="clienteCidade"
                        name="cidade"
                        label="Cidade"
                        fullWidth
                        defaultValue={cliente?.endereco?.cidade}
                    />
                    <TextField
                        margin="dense"
                        id="clienteEndereco"
                        name="rua"
                        label="Rua"
                        fullWidth
                        defaultValue={cliente?.endereco?.rua}
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
