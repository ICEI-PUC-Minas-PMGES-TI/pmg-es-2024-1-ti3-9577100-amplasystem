import { useEffect, useMemo, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import apiFetch from '../../services/api';
import { VendedorModel } from 'models/VendedorModel';
import { Box } from '@mui/system';
import { IconButton, Typography } from '@mui/material';
import RegisterModal from './RegisterModal';
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { Delete, Edit, Email } from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';

import * as ButtonStyle from '../../styles/ButtonsStyles';
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
    const table = useMaterialReactTable({
        columns,
        data,
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
                    onClick={() => window.open(`mailto:${row.original.email}?subject=Ampla System!`)}
                >
                    <Email />
                </IconButton>
                <IconButton
                    onClick={() => {
                        setOpen(true);
                        setVendedor(JSON.parse(JSON.stringify(row.original)));
                    }}
                >
                    <Edit />
                </IconButton>
                <IconButton
                    color="error"
                    onClick={() => {
                        if (row.original.id != null) {
                            deleteVendedor(row.original.id);
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
        <Box display={'grid'}>
            <Typography variant="h4" sx={{ textAlign: 'left', paddingBottom: '20px' }} color="#202022">
                Vendedores
            </Typography>
            <Box
                display={'flex'}
                sx={{
                    marginBottom: '20px',
                    justifyContent: 'flex-end',
                }}
            >
                <IconButton onClick={ChangeModalState} sx={ButtonStyle.addButton} aria-label="add">
                    <AddIcon sx={ButtonStyle.iconButton} />
                </IconButton>
            </Box>

            <MaterialReactTable table={table} />
            <RegisterModal setOpenModal={setOpen} openModal={open} setReload={setReload} updateVendedor={vendedor} />
        </Box>
    );
};

export default VendedoresPage;