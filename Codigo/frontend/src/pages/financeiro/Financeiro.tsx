import * as React from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/system';
import { Button, IconButton, Typography } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { Delete, Edit } from '@mui/icons-material';

import apiFetch from '@/services/api';
import { useNotification } from '@/hooks/useNotification';
import { FinanceiroModel } from '@/models/FinanceiroModel';

const FinanceiroPage = () => {
    const { showNotification } = useNotification();

    const [financeiro, setFinanceiro] = useState<FinanceiroModel | null>(null);
    const [financeiros, setFinanceiros] = useState<FinanceiroModel[]>([]);
    const [tableLoading, setTableLoading] = useState(true);
    const [dialogState, setDialogState] = useState(false);
    const dialogRef = useRef<HTMLFormElement>(null);

    const handleClickOpen = () => {
        setDialogState(true);
    };

    const handleClose = () => {
        setDialogState(false);
        setFinanceiro(null);
    };

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

    useEffect(() => {
        getFinanceiros();
    }, [getFinanceiros]);

    const postFinanceiro = async (newFinanceiro: any) => {
        setTableLoading(true);
        try {
            const res = await apiFetch.post('/financeiro/', newFinanceiro);
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

    const updateFinanceiro = async () => {
        setTableLoading(true);
        try {
            const res = await apiFetch.put(`/financeiro/${financeiro?.id}`, financeiro);
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

    const deleteFinanceiro = async (id: number|null) => {
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

    const columns = React.useMemo<MRT_ColumnDef<FinanceiroModel>[]>(
        () => [
            {
                accessorKey: 'comissao',
                header: 'Comissão',
                Cell: ({ cell }) => (
                    <Typography variant="body1">{cell.getValue<string>() ?? 'Não informado'}</Typography>
                ),
            },
            {
                accessorKey: 'faturamento',
                header: 'Faturamento',
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
            }
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
                <Button variant="contained" onClick={handleClickOpen} endIcon={<AddIcon sx={{ fontSize: 5 }} />}>
                    Editar informações
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
                        const formData = new FormData(dialogRef.current as HTMLFormElement);
                        const formJson = Object.fromEntries(formData.entries());
                        financeiro ? updateFinanceiro() : postFinanceiro(formJson);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>{financeiro ? `Editar ${financeiro.comissao}` : `Adicionar informações`}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{financeiro ? 'Edição' : 'Criação'} para financeiro</DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="financeiroComissao"
                        name="comissao"
                        label="Comissão"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        id="financeiroFaturamento"
                        name="faturamento"
                        label="Faturamento"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        id="financeiroTipoFiscal"
                        name="tipoFiscal"
                        label="Tipo Fiscal"
                        fullWidth
                        variant="standard"
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

export default FinanceiroPage;
