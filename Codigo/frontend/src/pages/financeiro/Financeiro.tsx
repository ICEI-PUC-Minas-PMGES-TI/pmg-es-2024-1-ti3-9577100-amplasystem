/* eslint-disable */

import { useEffect, useMemo, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import apiFetch from '../../services/api';
import { FinanceiroModel } from 'models/FinanceiroModel';
import { Box, IconButton, Typography } from '@mui/material';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { Delete, Edit, Email } from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';
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
                console.error(error);
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
        ],
        [],
    );

    return (
        <Box display={'grid'}>
            <Typography variant="h2" sx={{ textAlign: 'center' }} color="text.primary">
                Financeiro
            </Typography>
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
                                    color: '#01437C',
                                }}
                                onClick={() => {}}
                            >
                                <Edit />
                            </IconButton>
                        </Box>
                    )}
                />
            </Box>
            <ModalCadastroFinanceiro setOpenModal={setOpen} openModal={open} setReload={setReload} updateVendedor={() => {}} /> {/* Pass a function */}
        </Box>
    );
};

export default FinanceiroPage;
