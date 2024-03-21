import { useEffect, useMemo, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import apiFetch from '../../services/api';
import { VendedorModel } from 'models/VendedorModel';
import { Box } from '@mui/system';
import { IconButton, Typography } from '@mui/material';
import RegisterModal from './ModalCadastro';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { Delete, Edit, Email } from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';
const VendedoresPage = () => {
    const [vendedor, setVendedor] = useState<VendedorModel | undefined>(undefined);
    const [data, setData] = useState<VendedorModel[]>([]);
    const [open, setOpen] = useState(false);
    const [reload, setReload] = useState(true);
    useEffect(() => {
        getVendedores();
    }, [reload]);
    const { user } = useAuth();
    const { showNotification } = useNotification();
    const ChangeModalState = () => {
        setOpen(!open);
    };

    const getVendedores = () => {
        apiFetch
            .get('/vendedor')
            .then((data) => {
                setData(data.data);
                setReload(false);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const deleteVendedor = (id: number) => {
        apiFetch
            .delete(`/vendedor/${id}`)
            .then((data) => {
                setReload(true);
                showNotification({
                    message: data.data.message,
                    title: data.data.titulo,
                    type: 'success',
                });
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const columns = useMemo<MRT_ColumnDef<VendedorModel>[]>(
        () => [
            {
                accessorKey: 'nome', //access nested data with dot notation
                header: 'Nome',
            },
            {
                accessorKey: 'email',
                header: 'Email',
            },
            {
                accessorKey: 'cargo', //normal accessorKey
                header: 'Cargo',
                grow: true,
            },
        ],
        [],
    );

    return (
        <Box display={'grid'}>
            <Typography variant="h2" sx={{ textAlign: 'center' }} color="text.primary">
                Vendedores
            </Typography>{' '}
            <Box
                display={'flex'}
                sx={{
                    justifyContent: 'flex-end',
                }}
            >
                <IconButton
                    onClick={ChangeModalState}
                    sx={{
                        backgroundColor: '#788DAA',
                    }}
                    aria-label="add"
                >
                    <AddIcon />
                </IconButton>
            </Box>
            <Box
                sx={{
                    marginTop: '20px',
                }}
            >
                <MaterialReactTable
                    columns={columns}
                    data={data}
                    layoutMode="semantic"
                    enableRowActions
                    displayColumnDefOptions={{
                        'mrt-row-actions': {
                            grow: false,
                        },
                    }}
                    positionActionsColumn="last"
                    renderRowActions={({ row }) => (
                        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                            <IconButton
                                sx={{
                                    color: '#097C9C',
                                }}
                                onClick={() => window.open(`mailto:${row.original.email}?subject=Ampla System!`)}
                            >
                                <Email />
                            </IconButton>
                            <IconButton
                                sx={{
                                    color: '#01437C',
                                }}
                                onClick={() => {
                                    setVendedor(row.original);
                                    ChangeModalState();
                                }}
                            >
                                <Edit />
                            </IconButton>
                            <IconButton
                                color="error"
                                onClick={() => {
                                    if (row.original.email != user.email) {
                                        deleteVendedor(row.original.id);
                                    } else {
                                        <>
                                            {showNotification({
                                                message: 'Nao e possível deletar o vendedor logado',
                                                type: 'error',
                                            })}
                                        </>;
                                    }
                                }}
                            >
                                <Delete />
                            </IconButton>
                        </Box>
                    )}
                />
            </Box>
            <RegisterModal setOpenModal={setOpen} openModal={open} setReload={setReload} updateVendedor={vendedor} />
        </Box>
    );
};

export default VendedoresPage;
