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
import { Button, IconButton, Typography, Select } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { Delete, Edit } from '@mui/icons-material';

import apiFetch from '@/services/api';
import { useNotification } from '@/hooks/useNotification';
import { FinanceiroModel } from '@/models/FinanceiroModel';
import { IndustriaModel } from '@/models/IndustriaModel';

const FinanceiroPage = () => {
    const { showNotification } = useNotification();

    const [financeiro, setFinanceiro] = useState<FinanceiroModel | null>(null);
    const [financeiros, setFinanceiros] = useState<FinanceiroModel[]>([]);
    const [tableLoading, setTableLoading] = useState(true);
    const [dialogState, setDialogState] = useState(false);
    const dialogRef = useRef<HTMLFormElement>(null);
    const [industrias, setIndustrias] = useState<IndustriaModel[]>([]);
    const [industriasSemCadastro, setIndustriasSemCadastro] = useState<IndustriaModel[]>([]);

    const handleClickOpen = () => {
        setDialogState(true);
    };

    const handleClose = () => {
        setDialogState(false);
        setFinanceiro(null);
    };

    const getIndustrias = useCallback(async () => {
        try {
            const res = await apiFetch.get('/industria/');
            setIndustrias(res.data);
        } catch (err) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        getIndustrias();
    }, [getIndustrias]);

    useEffect(() => {
        const industriasSemCad = industrias.filter(
            (industria) => !financeiros.some((financeiro) => financeiro.Industrias_id === industria.id),
        );
        setIndustriasSemCadastro(industriasSemCad);
    }, [financeiros, industrias]);

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
            if (financeiro && financeiro.id) {
                const res = await apiFetch.put(`/financeiro/${financeiro.id}`, financeiro);
                showNotification({
                    message: res.data.message,
                    title: res.data.titulo,
                    type: 'success',
                });
                getFinanceiros();
            }
        } catch (err) {
            console.log(err);
        } finally {
            setTableLoading(false);
        }
    };

    const deleteFinanceiro = async (id: number | null) => {
        setTableLoading(true);
        try {
            if (id) {
                const res = await apiFetch.delete(`/financeiro/${id}`);
                showNotification({
                    message: res.data.message,
                    title: res.data.titulo,
                    type: 'success',
                });
                getFinanceiros();
            }
        } catch (err) {
            console.log(err);
        } finally {
            setTableLoading(false);
        }
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (financeiro) {
            setFinanceiro({
                ...financeiro,
                [e.target.name]: e.target.value,
            });
        }
    };

    const columns = React.useMemo<MRT_ColumnDef<FinanceiroModel>[]>(
        () => [
            {
                accessorKey: 'industria',
                header: 'Nome da Industria',
                Cell: ({ cell }) => (
                    <Typography variant="body1">{cell.getValue<string>() ?? 'Não informado'}</Typography>
                ),
            },

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
            <Dialog
                open={dialogState}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries()) as FinanceiroModel;
                        financeiro ? updateFinanceiro() : postFinanceiro(formJson);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>{financeiro ? `Adicionar ${financeiro.comissao}` : `Adicionar informações`}</DialogTitle>

                <DialogContent>
                    <DialogContentText>{financeiro ? 'Edição' : 'Informações'} para o financeiro</DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="financeiroComissao"
                        name="comissao"
                        label="Comissão"
                        fullWidth
                        defaultValue={financeiro && financeiro.comissao !== null ? financeiro.comissao.toString() : ''}
                        onChange={handleFormChange}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="financeiroFaturamento"
                        name="faturamento"
                        label="Faturamento"
                        fullWidth
                        value={financeiro && financeiro.faturamento !== null ? financeiro.faturamento : ''}
                        onChange={handleFormChange}
                    />
                    <Select fullWidth value={financeiro?.Industrias_id} name="IndustriaId">
                        {industrias.map((industria) => (
                            <option key={industria.id} value={Number(industria.id)}>
                                {industria.nome}
                            </option>
                        ))}
                    </Select>
                    <TextField
                        required
                        margin="dense"
                        id="financeiroTipoFiscal"
                        name="tipoFiscal"
                        label="Tipo Fiscal"
                        fullWidth
                        value={financeiro && financeiro.tipoFiscal !== null ? financeiro.tipoFiscal : ''}
                        onChange={handleFormChange}
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



// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   IconButton,
//   Select,
//   TextField,
//   Typography,
// } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import { Box } from '@mui/system';
// import { Delete, Edit } from '@mui/icons-material';
// import { MaterialReactTable, useMaterialReactTable, MRT_ColumnDef } from 'material-react-table';
// import apiFetch from '@/services/api';
// import { useNotification } from '@/hooks/useNotification';
// import { FinanceiroModel } from '@/models/FinanceiroModel';
// import { IndustriaModel } from '@/models/IndustriaModel';

// const FinanceiroPage = () => {
//   const { showNotification } = useNotification();

//   const [financeiro, setFinanceiro] = useState<FinanceiroModel | null>(null);
//   const [financeiros, setFinanceiros] = useState<FinanceiroModel[]>([]);
//   const [tableLoading, setTableLoading] = useState(true);
//   const [dialogState, setDialogState] = useState(false);
//   const [industrias, setIndustrias] = useState<IndustriaModel[]>([]);
//   const [industriasSemCadastro, setIndustriasSemCadastro] = useState<IndustriaModel[]>([]);

//   const handleClickOpen = () => {
//     setDialogState(true);
//   };

//   const handleClose = () => {
//     setDialogState(false);
//     setFinanceiro(null);
//   };

//   const getIndustrias = useCallback(async () => {
//     try {
//       const res = await apiFetch.get('/industria/');
//       setIndustrias(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   }, []);

//   useEffect(() => {
//     getIndustrias();
//   }, [getIndustrias]);

//   useEffect(() => {
//
//     const industriasSemCad = industrias.filter(industria => !financeiros.some(financeiro => financeiro.Industrias_id === industria.id));
//     setIndustriasSemCadastro(industriasSemCad);
//   }, [financeiros, industrias]);

//   const getFinanceiros = useCallback(async () => {
//     setTableLoading(true);
//     try {
//       const res = await apiFetch.get('/financeiro/');
//       setFinanceiros(res.data);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setTableLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     getFinanceiros();
//   }, [getFinanceiros]);

//   const postFinanceiro = async (newFinanceiro: FinanceiroModel) => {
//     setTableLoading(true);
//     try {
//       const res = await apiFetch.post('/financeiro/', newFinanceiro);
//       showNotification({
//         message: res.data.message,
//         title: res.data.titulo,
//         type: 'success',
//       });
//       getFinanceiros();
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setTableLoading(false);
//     }
//   };

//   const updateFinanceiro = async () => {
//     setTableLoading(true);
//     try {
//       if (financeiro && financeiro.id) {
//         const res = await apiFetch.put(`/financeiro/${financeiro.id}`, financeiro);
//         showNotification({
//           message: res.data.message,
//           title: res.data.titulo,
//           type: 'success',
//         });
//         getFinanceiros();
//       }
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setTableLoading(false);
//     }
//   };

//   const deleteFinanceiro = async (id: number) => {
//     setTableLoading(true);
//     try {
//       const res = await apiFetch.delete(`/financeiro/${id}`);
//       showNotification({
//         message: res.data.message,
//         title: res.data.titulo,
//         type: 'success',
//       });
//       getFinanceiros();
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setTableLoading(false);
//     }
//   };

//   const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFinanceiro(prevState => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const columns = [
//     {
//       accessorKey: 'industria',
//       header: 'Nome da Indústria',
//       Cell: ({ cell }) => (
//         <Typography variant="body1">{cell.getValue<string>() ?? 'Não informado'}</Typography>
//       ),
//     },
//     {
//       accessorKey: 'comissao',
//       header: 'Comissão',
//       Cell: ({ cell }) => (
//         <Typography variant="body1">{cell.getValue<string>() ?? 'Não informado'}</Typography>
//       ),
//     },
//     {
//       accessorKey: 'faturamento',
//       header: 'Faturamento',
//       Cell: ({ cell }) => (
//         <Typography variant="body1">{cell.getValue<string>() ?? 'Não informado'}</Typography>
//       ),
//     },
//     {
//       accessorKey: 'tipoFiscal',
//       header: 'Tipo Fiscal',
//       Cell: ({ cell }) => (
//         <Typography variant="body1">{cell.getValue<string>() ?? 'Não informado'}</Typography>
//       ),
//     },
//   ];

//   const table = useMaterialReactTable({
//         columns: columns,
//         data: financeiros,
//         muiSelectCheckboxProps: {
//             color: 'secondary',
//         },
//         enableRowActions: true,
//         columnResizeMode: 'onChange',
//         positionActionsColumn: 'last',
//         displayColumnDefOptions: {
//             'mrt-row-select': {
//                 size: 50,
//                 grow: false,
//             },
//             'mrt-row-numbers': {
//                 size: 40,
//                 grow: true,
//             },
//         },
//         renderRowActions: ({ row }) => (
//             <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
//                 <IconButton
//                     onClick={() => {
//                         setDialogState(true);
//                         setFinanceiro(row.original);
//                     }}
//                 >
//                     <Edit />
//                 </IconButton>
//                 <IconButton
//                     color="error"
//                     onClick={() => {
//                         if (row.original.id != null) {
//                             deleteFinanceiro(row.original.id);
//                         }
//                     }}
//                 >
//                     <Delete />
//                 </IconButton>
//             </Box>
//         ),

//         muiTableContainerProps: {
//             sx: { maxWidth: '100%' },
//         },
//         muiTopToolbarProps: {
//             sx: {
//                 fontWeight: 'bold',
//                 fontSize: '16px',
//             },
//         },
//         muiBottomToolbarProps: {
//             sx: {
//                 fontWeight: 'bold',
//                 fontSize: '16px',
//             },
//         },
//         muiTableHeadCellProps: {
//             sx: {
//                 fontWeight: 'bold',
//                 fontSize: '16px',
//             },
//         },
//         muiTableBodyCellProps: {
//             sx: {
//                 fontWeight: 'normal',
//                 fontSize: '16px',
//             },
//         },
//     });

//   return (
//     <React.Fragment>
//       <header className="flex justify-between">
//         <Typography variant="h4">Financeiro</Typography>
//         <Button onClick={handleClickOpen} endIcon={<AddIcon sx={{ fontSize: 5 }} />}>
//           Adicionar informações
//         </Button>
//       </header>
//       <MaterialReactTable table={table} />
//       <Dialog
//         open={dialogState}
//         onClose={handleClose}
//         PaperProps={{
//           component: 'form',
//           onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
//             event.preventDefault();
//             const formData = new FormData(event.currentTarget);
//             const formJson: any = {};
//             formData.forEach((value, key) => formJson[key as keyof FinanceiroModel] = value);
//             financeiro ? updateFinanceiro() : postFinanceiro(formJson as FinanceiroModel);
//             handleClose();
//           },
//         }}
//       >
//         <DialogTitle>{financeiro ? `Editar ${financeiro.comissao}` : `Adicionar informações`}</DialogTitle>
//         <DialogContent>
//           <DialogContentText>{financeiro ? 'Edição' : 'Informações'} para o financeiro</DialogContentText>
//           <TextField
//             autoFocus
//             required
//             margin="dense"
//             id="financeiroComissao"
//             name="comissao"
//             label="Comissão"
//             fullWidth
//             defaultValue={financeiro?.comissao ?? ''}
//             onChange={handleFormChange}
//           />
//           <TextField
//             required
//             select
//             margin="dense"
//             id="financeiroIndustria"
//             name="Industrias_id"
//             label="Indústria"
//             fullWidth
//             value={financeiro?.Industrias_id ?? ''}
//             onChange={handleFormChange}
//           >
//             {industriasSemCadastro.map(industria => (
//               <option key={industria.id} value={industria.id}>
//                 {industria.nome}
//               </option>
//             ))}
//           </TextField>
//           <TextField
//             required
//             margin="dense"
//             id="financeiroFaturamento"
//             name="faturamento"
//             label="Faturamento"
//             fullWidth
//             defaultValue={financeiro?.faturamento ?? ''}
//             onChange={handleFormChange}
//           />
//           <Select
//             required
//             fullWidth
//             id="financeiroTipoFiscal"
//             name="tipoFiscal"
//             label="Tipo Fiscal"
//             defaultValue={financeiro?.tipoFiscal ?? ''}
//             onChange={handleFormChange}
//           >
//             <option value="representação">Representação</option>
//             <option value="promoção de vendas">Promoção de Vendas</option>
//           </Select>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancelar</Button>
//           <Button type="submit">Salvar</Button>
//         </DialogActions>
//       </Dialog>
//     </React.Fragment>
//   );
// };

// export default FinanceiroPage;
