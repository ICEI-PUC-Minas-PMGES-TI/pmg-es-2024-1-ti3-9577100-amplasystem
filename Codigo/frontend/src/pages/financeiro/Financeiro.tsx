import { useEffect, useMemo, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Delete } from '@mui/icons-material';
import apiFetch from '@/services/api';
import { FinanceiroModel } from 'models/FinanceiroModel';
import { Box } from '@mui/system';
import { Button, IconButton, Typography } from '@mui/material';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { Edit } from '@mui/icons-material';
import { useAuth } from '@/hooks/useAuth';
import { useNotification } from '@/hooks/useNotification';
import ModalFinanceiro from './ModalFinanceiro';

const FinanceiroPage = () => {
    const [data, setData] = useState<FinanceiroModel[]>([]);
    const [open, setOpen] = useState(false);
    const [reload, setReload] = useState(true);
    useEffect(() => {
        getFinanceiros();
    }, [reload]);
    const { user } = useAuth();
    const { showNotification } = useNotification();

    const ChangeModalState = () => {
        setOpen(!open);
    };

    const getFinanceiros = () => {
        apiFetch
            .get('/financeiro')
            .then((response) => {
                setData(response.data);
                setReload(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const deleteFinanceiro = (id: number) => {
        apiFetch
            .delete(`/financeiro/${id}`)
            .then((response) => {
                setReload(true);
                showNotification({
                    message: response.data.message,
                    title: response.data.titulo,
                    type: 'success',
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const columns = useMemo<MRT_ColumnDef<FinanceiroModel>[]>(
        () => [
            {
                accessorKey: 'comissao',
                header: 'Comissão',
            },
            {
                accessorKey: 'faturamento',
                header: 'Faturamento',
            },
            {
                accessorKey: 'tipoFiscal',
                header: 'Tipo Fiscal',
                grow: true,
            },
            {
                accessorKey: 'industria',
                header: 'Indústria',
                grow: true,
            },
            {
                accessorKey: 'id',
                header: 'Ações',
                renderCell: ({ value }: { value: number }) => (
                    <IconButton
                        sx={{
                            color: '#01437C',
                        }}
                        onClick={() => deleteFinanceiro(value)}
                    >
                        <DeleteIcon />
                    </IconButton>
                ),
            },
        ],
        [],
    );

    const table = MaterialReactTable({
        columns,
        data,
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
                        setOpen(true);
                        // getFinanceiros(JSON.parse(JSON.stringify(row.original))); // This line seems unnecessary here
                    }}
                >
                    <Edit />
                </IconButton>
                <IconButton
                    color="error"
                    onClick={() => {
                        if (row.original.id != null) {
                            deleteFinanceiro(row.original.id);
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
        <div>
            <header className="flex justify-between">
                <Typography variant="h4">Financeiro</Typography>
                <Button onClick={ChangeModalState} endIcon={<AddIcon />}>
                    Adicionar informações
                </Button>
            </header>
            <Box
                display={'grid'}
                sx={{
                    marginTop: '20px',
                }}
            >
                {table} {/* Render the MaterialReactTable component */}
            </Box>
            {/* <ModalFinanceiro
                setOpenModal={setOpen}
                openModal={open}
                setReload={setReload}
                // updateVendedor={() => {}} // This seems unnecessary here
            /> */}
        </div>
    );
};

export default FinanceiroPage;
