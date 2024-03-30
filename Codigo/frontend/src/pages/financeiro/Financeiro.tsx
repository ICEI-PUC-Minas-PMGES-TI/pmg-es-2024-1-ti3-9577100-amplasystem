import { useEffect, useMemo, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import apiFetch from '../../services/api';
import { FinanceiroModel } from 'models/FinanceiroModel';
import { Box } from '@mui/system';
import { IconButton, Typography } from '@mui/material';
import ModalCadastroFinanceiro from './ModalCadastroFinanceiro';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { Delete, Edit, Email } from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';

const FinanceiroPage = () => {
    const [financeiro, setFinanceiro] = useState<FinanceiroModel | undefined>(undefined);
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
            .then((data) => {
                setData(data.data);
                setReload(false);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    // const deleteFinanceiro = (id: number) => {
    //     apiFetch
    //         .delete(`/financeiro/${id}`)
    //         .then((data) => {
    //             setReload(true);
    //             showNotification({
    //                 message: data.data.message,
    //                 title: data.data.titulo,
    //                 type: 'success',
    //             });
    //         })
    //         .catch((e) => {
    //             console.log(e);
    //         });
    // };
    const columns = useMemo<MRT_ColumnDef<FinanceiroModel>[]>(
        () => [
            {
                accessorKey: 'comissao', //access nested data with dot notation
                header: 'Comissão',
            },
            {
                accessorKey: 'faturamento',
                header: 'Faturamento',
            },
            {
                accessorKey: 'tipoFiscal', //normal accessorKey
                header: 'tipoFisacal',
                grow: true,
            },
            {
                accessorKey: 'industria', //normal accessorKey
                header: 'Industria',
                grow: true,
            },
        ],
        [],
    );

    return (
        <Box display={'grid'}>
            <Typography variant="h2" sx={{ textAlign: 'center' }} color="text.primary">
                Financeiro
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
                                    color: '#01437C',
                                }}
                                onClick={() => {
                                    setFinanceiro(row.original);
                                    ChangeModalState();
                                }}
                            >
                                <Edit />
                            </IconButton>
                        </Box>
                    )}
                />
            </Box>
            <ModalCadastroFinanceiro
                setOpenModal={setOpen}
                openModal={open}
                setReload={setReload}
                updateVendedor={financeiro}
            />
        </Box>
    );
};

export default FinanceiroPage;
