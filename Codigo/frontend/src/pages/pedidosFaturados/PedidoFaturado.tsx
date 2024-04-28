import { useEffect, useMemo, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import apiFetch from '@/services/api';
import { Box } from '@mui/system';
import { Button, IconButton, Typography } from '@mui/material';
import RegisterModal from './RegisterModal.tsx';
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { Delete, Edit } from '@mui/icons-material';
import { useNotification } from '@/hooks/useNotification';
import { PedidoFaturadoModel } from '@/models/PedidoFaturadoModel.ts';

const PedidoFaturado = () => {
    const [data, setData] = useState<PedidoFaturadoModel[]>([]);

    const [ordemDeCompra, setOrdemDeCompra] = useState<PedidoFaturadoModel | undefined>(undefined);
    const [open, setOpen] = useState(false);
    const [reload, setReload] = useState(true);
    useEffect(() => {
        getOrdensDeCompra();
        setReload(false);
    }, [reload]);
    const { showNotification } = useNotification();
    const ChangeModalState = () => {
        setOpen(!open);
    };

    const getOrdensDeCompra = () => {
        // apiFetch
        // .get('/pedido/')
        // .then((data) => {
        //     console.log(data.data)
        //     setData(data.data);
        // })
        // .catch((e) => {
        //     console.log(e);
        // });
    };
    const deleteOrdemDeCompra = (id: number) => {
        // apiFetch
        // .delete(`/pedido/${id}`)
        // .then((data) => {
        //     setReload(true);
        //     console.log(data)
        //     showNotification({
        //         message: data.data.message,
        //         title: data.data.titulo,
        //         type: 'success',
        //     });
        // })
        // .catch((e) => {
        //     console.log(e);
        // });
    };
    useEffect(() => {
        if(!open){
            setOrdemDeCompra(undefined)
        }
    }, [open])

    const columns = useMemo<MRT_ColumnDef<PedidoFaturadoModel>[]>(
        () => [
            {
                accessorKey: 'ordemDeCompra',
                header: 'Ordem de compra',
            },
            {
                accessorKey: 'codigoPedido', 
                header: 'Nota fiscal',
            },
            
            {
                accessorKey: 'dataFaturamento', 
                header: 'data Faturamento',
            },
            {
                accessorKey: 'financeiro.tipoPagamento', 
                header: 'Tipo Pagamento',
            },
            {
                accessorKey: 'dataVencimento', 
                header: 'data Vencimento',
            },
            {
                accessorKey: 'valorFaturado',
                header: 'Valor Faturado',
                Cell: ({ cell }) => (
                    <Box
                      component="span"
                                         >
                      {cell.getValue<number>()?.toLocaleString?.('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                       
                      })}
                    </Box>)
            },
            {
                accessorKey:'financeiro.comissao', 
                header: 'Porcentagem de comissão ',
            },
            {
                accessorKey: 'valorLiquido',
                header: 'Valor Liquido',
                Cell: ({ cell }) => (
                    <Box
                      component="span"
                                         >
                      {cell.getValue<number>()?.toLocaleString?.('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                       
                      })}
                    </Box>)
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
                    onClick={() => {
                        setOpen(true);
                        setOrdemDeCompra(row.original);
                    }}
                >
                    <Edit />
                </IconButton>
                <IconButton
                    color="error"
                    onClick={() => {
                        if (row.original.id != null) {
                            deleteOrdemDeCompra(row.original.id);
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
        <>
            <header className="flex justify-between">
                <Typography variant="h4">Pedidos Faturados</Typography>
                <Button variant="contained" onClick={ChangeModalState} endIcon={<AddIcon />}>
                    Adicionar pedido
                </Button>
            </header>

            <Box display={'grid'} className="my-5">
                <MaterialReactTable table={table} />
               {/* {     <RegisterModal
                        setOpenModal={setOpen}
                        openModal={open}
                        setReload={setReload}
                        updateOrdemDeCompra={ordemDeCompra}
                    />} */}
            </Box>
        </>
    );
};

export default PedidoFaturado;
