import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef, type MRT_Row } from 'material-react-table';
import { Delete, Edit } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteConfirm from '@/components/DeleteConfirm';
import { ClienteModel, ClienteFormModel } from '@/models/ClienteModel';
import { VendedorModel } from '@/models/VendedorModel';
import apiFetch from '@/services/api';
import { useNotification } from '@/hooks/useNotification';

const ClientesPage = () => {
    const { showNotification } = useNotification();

    const [cliente, setCliente] = useState<ClienteModel | null>(null);
    const [clientes, setClientes] = useState<ClienteModel[]>([]);
    const [dialogState, setDialogState] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [clientToDeleteId, setClientToDeleteId] = useState<number | null>(null);
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
        try {
            const res = await apiFetch.get('/cliente/');
            setClientes(res.data);
        } catch (err) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        getClientes();
    }, [getClientes]);

    const postCliente = async (novoCliente: ClienteFormModel) => {
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
        }
    };

    const updateCliente = async (clienteAtualizado: ClienteFormModel) => {
        try {
            const res = await apiFetch.put(`/cliente/${cliente?.id}`, clienteAtualizado);
            showNotification({
                message: res.data.message,
                title: res.data.titulo,
                type: 'success',
            });
            getClientes();
        } catch (err) {
            console.log(err);
        }
    };

    const deleteCliente = async (id: number) => {
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
        }
    };

    const confirmDeleteCliente = () => {
        if (clientToDeleteId !== null) {
            deleteCliente(clientToDeleteId);
            setClientToDeleteId(null);
            setDeleteModalOpen(false);
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
        []
    );

    const table = useMaterialReactTable({
        columns,
        data: clientes,
        enableRowActions: true,
        positionActionsColumn: 'last',
        renderRowActions: ({ row }: { row: MRT_Row<ClienteModel> }) => (
            <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                <IconButton
                    onClick={() => {
                        setDialogState(true);
                        setCliente(row.original);
                    }}
                >
                    <Edit />
                </IconButton>
                <IconButton
                    color="error"
                    onClick={() => {
                        if (row.original.id !== null) {
                            setClientToDeleteId(row.original.id);
                            setDeleteModalOpen(true);
                        }
                    }}
                >
                    <Delete />
                </IconButton>
            </Box>
        ),
    });

    return (
        <React.Fragment>
            <header className="flex justify-between mb-5">
                <Typography variant="h4">Clientes</Typography>
                <Button onClick={handleClickOpen} startIcon={<AddIcon />}>
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
                            nomeFantasia: String(formJson.nomeFantasia),
                            cnpj: String(formJson.cnpj),
                            idVendedor: formJson.idVendedor ? Number(formJson.idVendedor) : 0,
                            telefone: formJson.telefone ? String(formJson.telefone) : undefined,
                            endereco: {
                                cidade: String(formJson.cidade),
                                rua: String(formJson.rua),
                            },
                        };

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
                        id="clienteRua"
                        name="rua"
                        label="Rua"
                        fullWidth
                        defaultValue={cliente?.endereco?.rua}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button type="submit">Salvar</Button>
                </DialogActions>
            </Dialog>

            <DeleteConfirm
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDeleteCliente}
            />
        </React.Fragment>
    );
};

export default ClientesPage;
