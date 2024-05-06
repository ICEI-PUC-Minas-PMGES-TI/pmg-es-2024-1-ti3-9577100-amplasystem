import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/system';
import { Button, IconButton, Typography } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { Delete, Edit } from '@mui/icons-material';

import apiFetch from '@/services/api';
import { useNotification } from '@/hooks/useNotification';
import { FinanceiroModel } from '@/models/FinanceiroModel';
import { IndustriaModel } from '@/models/IndustriaModel';
import FinanceiroModal from './FinanceiroModal';

const FinanceiroPage = () => {
    const { showNotification } = useNotification();

    const [financeiro, setFinanceiro] = useState<FinanceiroModel | undefined>(undefined);
    const [financeiros, setFinanceiros] = useState<FinanceiroModel[]>([]);
    const [tableLoading, setTableLoading] = useState(true);
    const [dialogState, setDialogState] = useState(false);
    const [industriasSemCadastro, setIndustriasSemCadastro] = useState<IndustriaModel[]>([]);

    const handleClickOpen = () => {
        setDialogState(true);
    };

    const handleClose = () => {
        setDialogState(false);
        setFinanceiro(undefined);
    };

    useEffect(() => {
        getIndustriasWithOutFinanceiro()
         getFinanceiros();
        setTableLoading(false)
        
    }, [tableLoading]);

     const getIndustriasWithOutFinanceiro = useCallback(async () => {
        try {
            const res = await apiFetch.get('/industria/withOutFinanceiro');
            setIndustriasSemCadastro(res.data);
        } catch (err) {
            console.log(err);
        }
    }, []);

    const getFinanceiros = useCallback(async () => {
        setTableLoading(true);
        try {
            const res = await apiFetch.get('/financeiro/');
            setFinanceiros(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setTableLoading(false);
        }
    }, []);

  

    const deleteFinanceiro = async (id: number) => {
        setTableLoading(true);
        try {
            const res = await apiFetch.delete(`/financeiro/${id}`);
            showNotification({
                message: res.data.message,
                title: res.data.titulo,
                type: 'success',
            });
            getFinanceiros();
        } catch (err) {
            console.log(err);
        } finally {
            setTableLoading(false);
        }
    };

    // const handleTextFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     const { name, value } = event.target;
    //     setFinanceiro({
    //         ...financeiro,
    //         [name]: value,
    //     });
    // };
    
    // const handleSelectChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     const { name, value } = event.target;
    //     setFinanceiro({
    //         ...financeiro,
    //         [name]: value,
    //     });
    // };

    const columns = React.useMemo<MRT_ColumnDef<FinanceiroModel>[]>(
        () => [
            {
                accessorKey: 'industria.nome',
                header: 'Nome da Indústria',
                Cell: ({ cell }) => (
                    <Typography variant="body1">{cell.getValue<string>() ?? 'Não informado'}</Typography>
                ),
            },

            {
                accessorKey: 'comissao',
                header: 'Comissão',
                Cell: ({ cell }) => (
                    <Typography variant="body1">{cell.getValue<string>() ?? 'Não informado'}%</Typography> 
                ),
            },
            {
                accessorKey: 'tipoPagamento',
                header: 'Tipo Pagamento',
                Cell: ({ cell }) => (
                    <Typography variant="body1">{cell.getValue<string>() ?? 'Não informado'}</Typography>
                ),
            },

            {
                accessorKey: 'tipoFiscal',
                header: 'Tipo Fiscal',
                Cell: ({ cell }) => (
                    <Typography variant="body1">{cell.getValue<string>() ?? 'Não informado'}</Typography>
                ),
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns: columns,
        data: financeiros,
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
                        setFinanceiro(row.original);
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
        enableDensityToggle: false,

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
                <Typography variant="h4">Financeiro</Typography>
                <Button onClick={handleClickOpen} endIcon={<AddIcon sx={{ fontSize: 5 }} />}>
                    Adicionar informações
                </Button>
            </header>
            <MaterialReactTable table={table} />
           
            <FinanceiroModal industrias={financeiro != null ? [financeiro.industria] : industriasSemCadastro} open={dialogState} onClose={handleClose} setTableLoading={setTableLoading} financeiro={financeiro}/>
        </React.Fragment>
    );
};

export default FinanceiroPage;
