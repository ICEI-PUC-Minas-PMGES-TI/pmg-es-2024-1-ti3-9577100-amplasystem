import { useEffect, useMemo, useState, useCallback } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import * as React from 'react';
import InputMask from 'react-input-mask';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import * as Input from '@/styles/types/InputStyles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/system';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
    Button,
    ButtonGroup,
    FormControl,
    IconButton,
    InputLabel,
    Menu,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { Delete, Edit } from '@mui/icons-material';

import apiFetch from '@/services/api';
import { ClienteFormModel, ClienteModel } from '@/models/ClienteModel';
import { VendedorModel } from '@/models/VendedorModel';
import { useNotification } from '@/hooks/useNotification';
import DeleteConfirm from '@/components/DeleteConfirm';
import { Link } from 'react-router-dom';

const ClientesPage = () => {
    const { showNotification } = useNotification();

    const [cliente, setCliente] = useState<ClienteModel | null>(null);
    const [clientes, setClientes] = useState<ClienteModel[]>([]);
    const [tableLoading, setTableLoading] = useState<boolean>(true);
    const [dialogState, setDialogState] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const [reload, setReload] = useState<boolean>(true);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
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
            const res: AxiosResponse<VendedorModel[]> = await apiFetch.get('/vendedor');
            setVendedores(res.data);
        } catch (err: any) {
            console.log(err);
        }
    }, []);

    

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenuOption = Boolean(anchorEl);
    const handleDropDownClose = () => {
        setAnchorEl(null);
    };

    const handleDropDownClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    useEffect(() => {
        getVendedores();
    }, [getVendedores]);

    useEffect(() => {
        console.log(file);
        if (file !== undefined && file !== null) {
            apiFetch
                .post(
                    '/cliente/tabela',
                    {
                        file,
                    },
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    },
                )
                .then((data) => {
                    console.log(data);
                })
                .catch((e) => {
                    console.log(e);
                })
                .finally(() => {
                    window.location.reload();
                    //setReload(true);
                });
        }
    }, [file]);

    const getClientes = useCallback(async () => {
        setTableLoading(true);
        try {
            const res: AxiosResponse<ClienteModel[]> = await apiFetch.get('/cliente/');
            setClientes(res.data);
        } catch (err: any) {
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
            const res: AxiosResponse<any> = await apiFetch.post('/cliente/', novoCliente);
            showNotification({
                message: res.data.message,
                title: res.data.titulo,
                type: 'success',
            });
            getClientes();
        } catch (err: any) {
            console.log(err);
        } finally {
            setTableLoading(false);
        }
    };

    const updateCliente = async (clienteAtualizado: ClienteFormModel) => {
        setTableLoading(true);
        try {
            const res: AxiosResponse<any> = await apiFetch.put(`/cliente/${cliente?.id}`, clienteAtualizado);
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
            const res: AxiosResponse<any> = await apiFetch.delete(`/cliente/${id}`);
            showNotification({
                message: res.data.message,
                title: res.data.titulo,
                type: 'success',
            });
            getClientes();
        } catch (err: any) {
            console.log(err);
        } finally {
            setTableLoading(false);
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
        [],
    );

    const table = useMaterialReactTable({
        columns: columns,
        data: clientes,

        muiSelectCheckboxProps: {
            color: 'secondary',
        },
        enableRowActions: true,
        columnResizeMode: 'onChange',
        positionActionsColumn: 'last',
        displayColumnDefOptions: {
            'mrt-row-select': {
                size: 50,
                grow: false,
            },
            'mrt-row-numbers': {
                size: 40,
                grow: true,
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
        enableDensityToggle: false,
    });

    const CNPJMask = ({ inputRef, ...props }: any) => (
        <InputMask {...props} mask="99.999.999/9999-99" placeholder="__.___.___/____-__" ref={inputRef} />
    );

    const PhoneMask = ({ inputRef, ...props }: any) => (
        <InputMask {...props} mask="(99) 99999-9999" placeholder="(__) _____-____" ref={inputRef} />
    );

    return (
        <React.Fragment>
            <header className="flex justify-between mb-5">
                <Typography variant="h4">Clientes</Typography>
                <ButtonGroup variant="contained" aria-label="Basic button group">
                    <Button onClick={handleClickOpen} startIcon={<AddIcon sx={{ fontSize: 5 }} />}>
                        Adicionar cliente
                    </Button>
                    <Button
                        aria-controls={openMenuOption ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openMenuOption ? 'true' : undefined}
                        onClick={handleDropDownClick}
                        role={undefined}
                    >
                        <ArrowDropDownIcon />
                    </Button>
                </ButtonGroup>
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
                        InputProps={{
                            inputComponent: CNPJMask,
                        }}
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
                        InputProps={{
                            inputComponent: PhoneMask,
                        }}
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

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenuOption}
                onClose={handleClose}
                sx={{
                    margin: '5px',
                    padding: 0,
                    '& .css-6hp17o-MuiList-root-MuiMenu-list': {
                        padding: 0,
                    },
                }}
            >
                <MenuItem
                    sx={{
                        margin: 0,
                        padding: 0,
                    }}
                >
                    <Button component="label" variant="contained" fullWidth startIcon={<CloudUploadIcon />}>
                        Importar cliente
                        <Input.VisuallyHiddenInput
                            type="file"
                            onChange={(event) => {
                                if (event.target.files != null && event.target.files[0] != null) {
                                    setFile(event.target.files[0]);
                                }
                            }}
                        />
                    </Button>
                </MenuItem>
                <MenuItem
                    onClick={handleClose}
                    sx={{
                        margin: 0,
                        padding: 0,
                    }}
                >
                    <Button component="label" fullWidth variant="contained" startIcon={<FileDownloadIcon />}>
                        <Link to="/files/clientes.xlsx" target="_blank" download>
                            Baixar modelo
                        </Link>
                    </Button>
                </MenuItem>
            </Menu>

            <DeleteConfirm
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDeleteCliente}
            />
        </React.Fragment>
    );
};

export default ClientesPage;
