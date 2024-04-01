import { useEffect, useMemo, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Delete } from '@mui/icons-material';
import apiFetch from '@/services/api';
import { FinanceiroModel } from '@/models/FinanceiroModel';
import { Box } from '@mui/system';
import { Button, IconButton, Typography } from '@mui/material';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { Edit } from '@mui/icons-material';
import { useAuth } from '@/hooks/useAuth';
import { useNotification } from '@/hooks/useNotification';
import ModalCorrigido from '@/pages/financeiro/ModalCorrigido';

const FinanceiroPage = () => {
    const [financeiro, setFinanceiro] = useState<FinanceiroModel[]>([]);
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
            .get('/financeiro/')
            .then((response) => {
                setFinanceiro(response.data);
                setReload(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const deleteFinanceiro = (id: number|null) => {
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
                accessorKey: 'id',
                header: 'Ações',
                renderCell: ({ value }: { value: number|null }) => (
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

    const table = MaterialReactTable({
        columns: columns,
        data: financeiro,
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
                        //  getFinanceiros((row.original)); // This line seems unnecessary here
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
                    Adicionar dados
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
            <ModalCorrigido open={open} handleClose={() => setOpen(false)} handleClickOpen={() => setOpen(true)} />
        </div>
    );
};

export default FinanceiroPage;


// import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
// import { Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
// import apiFetch from '@/services/api';
// import { useNotification } from '@/hooks/useNotification';
// import { SelectChangeEvent } from '@mui/material';

// interface Industry {
//     id: number;
//     nome: string;
// }

// const financeiroPage = () => {
//     const [industrias, setIndustrias] = useState<Industry[]>([]);
//     const [formData, setFormData] = useState({
//         comissao: null as number | null,
//         faturamento: '',
//         tipoFiscal: '',
//         industriaId: '',
//     });
//     const { showNotification } = useNotification();

//     useEffect(() => {
//         fetchIndustrias();
//     }, []);

//     const fetchIndustrias = () => {
//         apiFetch
//             .get('/industrias')
//             .then((response) => {
//                 setIndustrias(response.data);
//             })
//             .catch((error) => {
//                 console.error('Error fetching industries:', error);
//                 showNotification({
//                     message: 'Erro ao buscar indústrias.',
//                     title: 'Erro',
//                     type: 'error',
//                 });
//             });
//     };

//     const handleChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
//         setFormData({ ...formData, [e.target.name as string]: e.target.value });
//     };

//     const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         apiFetch
//             .post('/financeiro', formData)
//             .then((response) => {
//                 showNotification({
//                     message: 'Dados financeiros cadastrados com sucesso!',
//                     title: 'Sucesso',
//                     type: 'success',
//                 });
//                 setFormData({
//                     comissao: null,
//                     faturamento: '',
//                     tipoFiscal: '',
//                     industriaId: '',
//                 });
//             })
//             .catch((error) => {
//                 console.error('Error creating financeiro:', error);
//                 showNotification({
//                     message: 'Erro ao cadastrar dados financeiros.',
//                     title: 'Erro',
//                     type: 'error',
//                 });
//             });
//     };

//     return (
//         <div>
//             <Typography variant="h4">Cadastro de Dados Financeiros</Typography>
//             <form onSubmit={handleSubmit}>
//                 <TextField
//                     required
//                     fullWidth
//                     label="Comissão"
//                     type="number"
//                     name="comissao"
//                     value={formData.comissao || ''}
//                     onChange={handleChange}
//                 />
//                 <FormControl fullWidth required>
//                     <InputLabel id="faturamento-label">Faturamento</InputLabel>
//                     <Select
//                         labelId="faturamento-label"
//                         id="faturamento"
//                         name="faturamento"
//                         value={formData.faturamento}
//                         onChange={handleChange as (event: SelectChangeEvent<string>, child: React.ReactNode) => void}
//                     >
//                         <MenuItem value="liquidez">Liquidez</MenuItem>
//                         <MenuItem value="faturamento">Faturamento</MenuItem>
//                     </Select>
//                 </FormControl>
//                 <FormControl fullWidth required>
//                     <InputLabel id="tipoFiscal-label">Tipo Fiscal</InputLabel>
//                     <Select
//                         labelId="tipoFiscal-label"
//                         id="tipoFiscal"
//                         name="tipoFiscal"
//                         value={formData.tipoFiscal}
//                         onChange={handleChange as (event: SelectChangeEvent<string>, child: React.ReactNode) => void}
//                     >
//                         <MenuItem value="representação">Representação</MenuItem>
//                         <MenuItem value="promoção de vendas">Promoção de Vendas</MenuItem>
//                     </Select>
//                 </FormControl>
//                 <FormControl fullWidth required>
//                     <InputLabel id="industriaId-label">Indústria</InputLabel>
//                     <Select
//                         labelId="industriaId-label"
//                         id="industriaId"
//                         name="industriaId"
//                         value={formData.industriaId}
//                         onChange={handleChange as (event: SelectChangeEvent<string>, child: React.ReactNode) => void}
//                     >
//                         {industrias.map((industria) => (
//                             <MenuItem key={industria.id} value={industria.id}>
//                                 {industria.nome}
//                             </MenuItem>
//                         ))}
//                     </Select>
//                 </FormControl>
//                 <Box mt={2}>
//                     <Button variant="contained" type="submit">
//                         Cadastrar
//                     </Button>
//                 </Box>
//             </form>
//         </div>
//     );
// };

// export default financeiroPage;

