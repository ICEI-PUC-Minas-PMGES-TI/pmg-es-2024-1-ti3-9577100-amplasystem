import React, { useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
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
import {
    MRT_Row,
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import {
    Add as AddIcon,
    CloudUpload as CloudUploadIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    FileDownload as FileDownloadIcon,
} from '@mui/icons-material';
import apiFetch from '@/services/api';
import { ClienteFormModel, ClienteModel } from '@/models/ClienteModel';
import { VendedorModel } from '@/models/VendedorModel';
import { useNotification } from '@/hooks/useNotification';
import { Link } from 'react-router-dom';

const ClientesPage = () => {
    const { showNotification } = useNotification();
    const [cliente, setCliente] = useState<ClienteModel | null>(null);
    const [clientes, setClientes] = useState<ClienteModel[]>([]);
    const [tableLoading, setTableLoading] = useState(true);
    const [dialogState, setDialogState] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [vendedores, setVendedores] = useState<VendedorModel[]>([]);
    const [cepData, setCepData] = useState({
        cep: '',
        estado: '',
        cidade: '',
        bairro: '',
        rua: '',
    });

    const cleanFormData = () => {
        setCliente(null);
        setCepData({
            cep: '',
            estado: '',
            cidade: '',
            bairro: '',
            rua: '',
        });
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

    const handleCepChange = async (event: any) => {
        const cepValue = event.target.value;
        if (cepValue.length === 8) {
            try {
                const res = await axios.get(`https://viacep.com.br/ws/${cepValue}/json/`);
                setCepData({
                    cep: res.data.cep || '',
                    estado: res.data.uf || '',
                    cidade: res.data.localidade || '',
                    bairro: res.data.bairro || '',
                    rua: res.data.logradouro || '',
                });
            } catch (error) {
                console.error('Erro ao buscar o CEP', error);
            }
        }
    };

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
            console.log('Erro ao atualizar cliente', err);
        } finally {
            setTableLoading(false);
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
                    <Typography variant="body1">
                        {cell.getValue<string>() ?? 'Não informado'}
                    </Typography>
                ),
            },
            {
                accessorKey: 'cnpj',
                header: 'CNPJ',
                Cell: ({ cell }) => (
                    <Typography variant="body1">
                        {cell.getValue<string>() ?? 'Não informado'}
                    </Typography>
                ),
            },
            {
                accessorKey: 'telefone',
                header: 'Telefone',
                Cell: ({ cell }) => (
                    <Typography variant="body1">
                        {cell.getValue<string>() ?? 'Não informado'}
                    </Typography>
                ),
            },
            {
                accessorKey: 'endereco.cidade',
                header: 'Cidade',
                Cell: ({ cell }) => (
                    <Typography variant="body1">
                        {cell.getValue<string>() ?? 'Não informado'}
                    </Typography>
                ),
            },
            {
                accessorKey: 'endereco.rua',
                header: 'Rua',
                Cell: ({ cell }) => (
                    <Typography variant="body1">
                        {cell.getValue<string>() ?? 'Não informado'}
                    </Typography>
                ),
            },
        ],
        []
    );

    const table = useMaterialReactTable({
        columns,
        data: clientes,
        muiSelectCheckboxProps: {
            color: 'secondary',
        },
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
                    <EditIcon />
                </IconButton>
                <IconButton
                    color="error"
                    onClick={() => {
                        if (row.original.id != null) {
                            deleteCliente(row.original.id);
                        }
                    }}
                >
                    <DeleteIcon />
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

    return (
        <React.Fragment>
            <header className="flex justify-between mb-5">
                <Typography variant="h4">Clientes</Typography>
                <div className="flex gap-3">
                    <Button
                        color="warning"
                        component="label"
                        variant="outlined"
                        startIcon={<CloudUploadIcon />}
                    >
                        Importar cliente
                        <input
                            type="file"
                            hidden
                            onChange={(event) => {
                                if (
                                    event.target.files != null &&
                                    event.target.files[0] != null
                                ) {
                                    setFile(event.target.files[0]);
                                }
                            }}
                        />
                    </Button>
                    <Button startIcon={<FileDownloadIcon />} color="warning">
                        <Link to="/files/clientes.xlsx" target="_blank" download>
                            Baixar modelo
                        </Link>
                    </Button>
                    <Button onClick={handleClickOpen} startIcon={<AddIcon sx={{ fontSize: 5 }} />}>
                        Adicionar cliente
                    </Button>
                </div>
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
                            telefone: formJson.telefone
                                ? String(formJson.telefone)
                                : undefined,
                            endereco: {
                                id: formJson.enderecoId ? Number(formJson.enderecoId) : null,
                                cep: String(formJson.cep),
                                estado: String(formJson.estado),
                                cidade: String(formJson.cidade),
                                bairro: String(formJson.bairro),
                                rua: String(formJson.rua),
                                numero: Number(formJson.numero),
                                complemento: formJson.complemento
                                    ? String(formJson.complemento)
                                    : null,
                            },
                        };

                        _cliente.id ? updateCliente(_cliente) : postCliente(_cliente);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>
                    {cliente ? `Editar ${cliente.nomeFantasia}` : `Adicionar cliente`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {cliente ? 'Edição' : 'Criação'} de cliente
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="normal"
                        id="clienteNomeFantasia"
                        name="nomeFantasia"
                        label="Nome fantasia"
                        fullWidth
                        defaultValue={cliente?.nomeFantasia}
                    />
                    <TextField
                        required
                        margin="normal"
                        id="clienteCnpj"
                        name="cnpj"
                        label="CNPJ"
                        fullWidth
                        defaultValue={cliente?.cnpj}
                    />
                    <FormControl fullWidth margin="normal">
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
                        margin="normal"
                        id="clienteTelefone"
                        name="telefone"
                        label="Telefone"
                        fullWidth
                        defaultValue={cliente?.telefone}
                    />
                    <TextField
                        margin="normal"
                        id="clienteCep"
                        name="cep"
                        label="CEP"
                        fullWidth
                        defaultValue={cliente?.endereco?.cep}
                        onBlur={handleCepChange}
                    />
                    <TextField
                        margin="normal"
                        id="clienteEstado"
                        name="estado"
                        label="Estado"
                        fullWidth
                        value={cepData.estado}
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        margin="normal"
                        id="clienteCidade"
                        name="cidade"
                        label="Cidade"
                        fullWidth
                        value={cepData.cidade}
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        margin="normal"
                        id="clienteBairro"
                        name="bairro"
                        label="Bairro"
                        fullWidth
                        value={cepData.bairro}
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        margin="normal"
                        id="clienteRua"
                        name="rua"
                        label="Rua"
                        fullWidth
                        value={cepData.rua}
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        margin="normal"
                        id="clienteNumero"
                        name="numero"
                        label="Número"
                        fullWidth
                        defaultValue={cliente?.endereco?.numero}
                    />
                    <TextField
                        margin="normal"
                        id="clienteComplemento"
                        name="complemento"
                        label="Complemento"
                        fullWidth
                        defaultValue={cliente?.endereco?.complemento}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button type="submit">Salvar</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default ClientesPage;