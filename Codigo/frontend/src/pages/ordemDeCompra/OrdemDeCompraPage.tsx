import { useEffect, useMemo, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import apiFetch from '@/services/api';
import { OrdemDeCompraModel } from '@/models/OrdemDeCompraModel';
import { Box } from '@mui/system';
import { Button, IconButton, Typography } from '@mui/material';
import RegisterModal from './RegisterModal.tsx';
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { Delete, Edit, Email } from '@mui/icons-material';
import { useAuth } from '@/hooks/useAuth';
import { useNotification } from '@/hooks/useNotification';
import { Cargo } from '@/enums/Cargo.ts';
import { OrderStatus } from '@/enums/OrderStatus.ts';

const OrdemDeCompraPage = () => {
    const [ordemDeCompra, setOrdemDeCompra] = useState<OrdemDeCompraModel | undefined>(undefined);
    const [data, setData] = useState<OrdemDeCompraModel[]>([{
        id: 1,
        valor: 1000.0,
        codigoPedido: '123809765',
        totalmenteFaturado: OrderStatus.TOTALMENTEFATURADO,
        industria: {
            id: 1,
            nome:"Baston",
            contatos:[]
        },
        cliente: {
            id: 1,
            cnpj: '',
            telefone: "(31) 97364-3098",
            endereco: undefined,
            nomeFantasia: 'Martins Atacadista',
            vendedor: {
                id: 0,
                nome: 'Vitor',
                email: 'vitor@amplavendas.com',
                cargo: Cargo.ADMINISTRADOR,
                token: undefined
            }
        }
    },
    {
        id: 1,
        valor: 1000.0,
        codigoPedido: '123809765',
        totalmenteFaturado: OrderStatus.NAOFATURADO,
        industria: {
            id: 1,
            nome:"Baston",
            contatos:[]
        },
        cliente: {
            id: 1,
            cnpj: '',
            telefone: "(31) 97364-3098",
            endereco: undefined,
            nomeFantasia: 'Martins Atacadista',
            vendedor: {
                id: 0,
                nome: 'Vitor',
                email: 'vitor@amplavendas.com',
                cargo: Cargo.ADMINISTRADOR,
                token: undefined
            }
        }
    },
    {
        id: 1,
        valor: 1000.0,
        codigoPedido: '123809765',
        totalmenteFaturado: OrderStatus.PARCIALMENTEFATURADO,
        industria: {
            id: 1,
            nome:"Baston",
            contatos:[]
        },
        cliente: {
            id: 1,
            cnpj: '',
            telefone: "(31) 97364-3098",
            endereco: undefined,
            nomeFantasia: 'Martins Atacadista',
            vendedor: {
                id: 0,
                nome: 'Vitor',
                email: 'vitor@amplavendas.com',
                cargo: Cargo.ADMINISTRADOR,
                token: undefined
            }
        }
    }]);
    const [open, setOpen] = useState(false);
    const [reload, setReload] = useState(true);
    useEffect(() => {
        getOrdensDeCompra();
    }, [reload]);
    const { user } = useAuth();
    const { showNotification } = useNotification();
    const ChangeModalState = () => {
        setOpen(!open);
    };

    const getOrdensDeCompra = () => {
        // apiFetch
        //     .get('/vendedor')
        //     .then((data) => {
        //         setData(data.data);
        //         setReload(false);
        //     })
        //     .catch((e) => {
        //         console.log(e);
        //     });
    };
    const deleteOrdemDeCompra = (id: number) => {
        // apiFetch
        //     .delete(`/vendedor/${id}`)
        //     .then((data) => {
        //         setReload(true);
        //         showNotification({
        //             message: data.data.message,
        //             title: data.data.titulo,
        //             type: 'success',
        //         });
        //     })
        //     .catch((e) => {
        //         console.log(e);
        //     });
    };
    const columns = useMemo<MRT_ColumnDef<OrdemDeCompraModel>[]>(
        () => [
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
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
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
                        maxWidth: '9ch',
                        p: '0.25rem',
                      })}
                    >
                      {cell.getValue<OrderStatus>()}
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
