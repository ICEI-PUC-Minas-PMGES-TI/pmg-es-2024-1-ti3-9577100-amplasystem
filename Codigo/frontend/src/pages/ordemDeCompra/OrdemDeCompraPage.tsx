import { useEffect, useMemo, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import apiFetch from '@/services/api';
import { OrdemDeCompraModel } from '@/models/OrdemDeCompraModel';
import { Box } from '@mui/system';
import { Button, IconButton, Typography } from '@mui/material';
import RegisterModal from './RegisterModal.tsx';
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { Delete, Edit, Email } from '@mui/icons-material';
import { useNotification } from '@/hooks/useNotification';
import { OrderStatus } from '@/enums/OrderStatus.ts';

const OrdemDeCompraPage = () => {
    const [data, setData] = useState<OrdemDeCompraModel[]>([]);

    const [ordemDeCompra, setOrdemDeCompra] = useState<OrdemDeCompraModel | undefined>(undefined);
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
        apiFetch
        .get('/ordem/')
        .then((data) => {
            console.log(data.data)
            setData(data.data);
        })
        .catch((e) => {
            console.log(e);
        });
    };
    const deleteOrdemDeCompra = (id: number) => {
        apiFetch
        .delete(`/ordem/${id}`)
        .then((data) => {
            setReload(true);
            console.log(data)
            showNotification({
                message: data.data.message,
                title: data.data.titulo,
                type: 'success',
            });
        })
        .catch((e) => {
            console.log(e);
            showNotification({
                message: e.response.data.message,
                title: e.response.data.titulo,
                type: 'error',
            });
        });
    };
    useEffect(() => {
        if(!open){
            setOrdemDeCompra(undefined)
        }
    }, [open])

    const columns = useMemo<MRT_ColumnDef<OrdemDeCompraModel>[]>(
        () => [
            {
                accessorKey: 'dataCadastro',
                header: 'Data do Cadastro',
                Cell: ({ cell }) => {
                    const date = new Date(cell.getValue<string>())
                    console.log(date)
                    return <Box
                    component="span"
                                       >
                    {date.toLocaleDateString()}
                  </Box>
                }
            },
            {
                accessorKey: 'industria.nome',
                header: 'Industria',
            },
            {
                accessorKey: 'cliente.nomeFantasia',
                header: 'Cliente',
            },
            {
                accessorKey: 'cliente.vendedor.nome',
                header: 'Vendedor',
            },
            {
                accessorKey: 'codigoPedido', 
                header: 'Codigo do Pedido',
            },
            {
                accessorKey: 'valor',
                header: 'Valor da Ordem',
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
                accessorKey: 'totalmenteFaturado',
                header: 'Status ',
                Cell: ({ cell }) => (
                    <Box
                      component="span"
                      sx={(theme) => ({
                        backgroundColor:
                          cell.getValue<OrderStatus>() == OrderStatus.TOTALMENTEFATURADO
                              ? theme.palette.success.dark
                              :  cell.getValue<OrderStatus>() == OrderStatus.PARCIALMENTEFATURADO ?theme.palette.warning.dark :theme.palette.error.dark,
                        borderRadius: '0.25rem',
                        color: '#fff',
                        p: '0.25rem',
                      })}
                    >
                    {   cell.getValue<OrderStatus>() == OrderStatus.TOTALMENTEFATURADO ? `Totalmente faturado` :  
                        cell.getValue<OrderStatus>() == OrderStatus.PARCIALMENTEFATURADO ? `Parcialmente faturado` : 
                        `Nao faturado` 
                    }
                    </Box>
                  ),
    
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
                <Typography variant="h4">Ordens de Compra</Typography>
                <Button variant="contained" onClick={ChangeModalState} endIcon={<AddIcon />}>
                    Adicionar ordem de compra
                </Button>
            </header>

            <Box display={'grid'} className="my-5">
                <MaterialReactTable table={table} />
                <RegisterModal
                    setOpenModal={setOpen}
                    openModal={open}
                    setReload={setReload}
                    updateOrdemDeCompra={ordemDeCompra}
                />
            </Box>
        </>
    );
};

export default OrdemDeCompraPage;
