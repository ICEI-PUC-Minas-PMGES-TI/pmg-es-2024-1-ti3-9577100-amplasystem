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
import { Cargo } from '@/enums/Cargo.ts';
import { OrderStatus } from '@/enums/OrderStatus.ts';
const dataMck:PedidoFaturadoModel[] = [
    {
        id: 1,
        dataFaturamento: new Date('2024-04-28'),
        dataVencimento: new Date('2024-05-15'),
        valorFaturado: 1500.00,
        valorLiquido: 1400.00,
        notaFiscal: 'NF123456',
        ordemDeCompra: {
            id: 98765,
            valor: 2000.00,
            codigoPedido: '789012',
            totalmenteFaturado: OrderStatus.TOTALMENTEFATURADO,
            industria: {
                id: 123,
                nome: 'Indústria ABC',
                contatos: [],
            },
            cliente: {
                id: 456,
                cnpj: '12.345.678/0001-90',
                telefone: '(99) 9999-9999',
                endereco: {
                    id: 789,
                    cidade: 'São Paulo',
                    rua: 'Rua das Flores, 123',
                },
                nomeFantasia: 'Cliente XYZ',
                vendedor: {
                    id: 789,
                    nome: 'Carlos Rodrigues',
                    email: 'carlos@empresa.com',
                    cargo: Cargo.VENDEDOR,
                    token: 'token_de_acesso',
                },
            },
        },
        financeiro: {
            id: 123,
            comissao: 100.00,
            tipoPagamento: 'Faturamento',
            tipoFiscal: 'NF-e',
        },
    },
    {
        id: 2,
        dataFaturamento: new Date('2024-04-29'),
        dataVencimento: new Date('2024-05-16'),
        valorFaturado: 2200.00,
        valorLiquido: 2000.00,
        notaFiscal: 'NF789012',
        ordemDeCompra: {
            id: 54321,
            valor: 3000.00,
            codigoPedido: '345678',
            totalmenteFaturado: OrderStatus.TOTALMENTEFATURADO,
            industria: {
                id: 456,
                nome: 'Indústria XYZ',
                contatos: [],
            },
            cliente: {
                id: 789,
                cnpj: '98.765.432/0001-21',
                telefone: '(88) 8888-8888',
                endereco: {
                    id: 987,
                    cidade: 'Rio de Janeiro',
                    rua: 'Av. das Palmeiras, 456',
                },
                nomeFantasia: 'Cliente ABC',
                vendedor: {
                    id: 123,
                    nome: 'Maria Oliveira',
                    email: 'maria@empresa.com',
                    cargo: Cargo.VENDEDOR,
                    token: 'token_de_acesso_2',
                },
            },
        },
        financeiro: {
            id: 456,
            comissao: 150.00,
            tipoPagamento: 'Faturamento',
            tipoFiscal: 'NF-e',
        },
    },
    {
        id: 3,
        dataFaturamento: new Date('2024-04-30'),
        dataVencimento: new Date('2024-05-17'),
        valorFaturado: 1800.00,
        valorLiquido: 1700.00,
        notaFiscal: 'NF345678',
        ordemDeCompra: {
            id: 98765,
            valor: 2500.00,
            codigoPedido: '012345',
            totalmenteFaturado: OrderStatus.TOTALMENTEFATURADO,
            industria: {
                id: 789,
                nome: 'Indústria DEF',
                contatos: [],
            },
            cliente: {
                id: 321,
                cnpj: '54.321.098/0001-76',
                telefone: '(77) 7777-7777',
                endereco: {
                    id: 654,
                    cidade: 'Belo Horizonte',
                    rua: 'Rua das Pedras, 789',
                },
                nomeFantasia: 'Cliente DEF',
                vendedor: {
                    id: 456,
                    nome: 'João Santos',
                    email: 'joao@empresa.com',
                    cargo: Cargo.VENDEDOR,
                    token: 'token_de_acesso_3',
                },
            },
        },
        financeiro: {
            id: 789,
            comissao: 120.00,
            tipoPagamento: 'Liquidez',
            tipoFiscal: 'NF-e',
        },
    },
    {
        id: 4,
        dataFaturamento: new Date('2024-05-01'),
        dataVencimento: new Date('2024-05-18'),
        valorFaturado: 1300.00,
        valorLiquido: 1200.00,
        notaFiscal: '901234',
        ordemDeCompra: {
            id: 23456,
            valor: 1800.00,
            codigoPedido: 'CP567890',
            totalmenteFaturado: OrderStatus.TOTALMENTEFATURADO,
            industria: {
                id: 987,
                nome: 'Indústria GHI',
                contatos: [],
            },
            cliente: {
                id: 654,
                cnpj: '21.098.765/0001-32',
                telefone: '(66) 6666-6666',
                endereco: {
                    id: 321,
                    cidade: 'Curitiba',
                    rua: 'Av. das Árvores, 890',
                },
                nomeFantasia: 'Cliente GHI',
                vendedor: {
                    id: 789,
                    nome: 'Ana Rodrigues',
                    email: 'ana@empresa.com',
                    cargo: Cargo.VENDEDOR,
                    token: 'token_de_acesso_4',
                },
            },
        },
        financeiro: {
            id: 987,
            comissao: 90.00,
            tipoPagamento: 'Liquidez',
            tipoFiscal: 'NF-e',
        },
    },
    {
        id: 5,
        dataFaturamento: new Date('2024-05-02'),
        dataVencimento: new Date('2024-05-19'),
        valorFaturado: 2400.00,
        valorLiquido: 2200.00,
        notaFiscal: 'NF567890',
        ordemDeCompra: {
            id: 76543,
            valor: 3500.00,
            codigoPedido: '678901',
            totalmenteFaturado: OrderStatus.TOTALMENTEFATURADO,
            industria: {
                id: 654,
                nome: 'Indústria JKL',
                contatos: [],
            },
            cliente: {
                id: 987,
                cnpj: '34.567.890/0001-43',
                telefone: '(55) 5555-5555',
                endereco: {
                    id: 987,
                    cidade: 'Porto Alegre',
                    rua: 'Rua das Flores, 456',
                },
                nomeFantasia: 'Cliente JKL',
                vendedor: {
                    id: 123,
                    nome: 'Pedro Silva',
                    email: 'pedro@empresa.com',
                    cargo: Cargo.VENDEDOR,
                    token: 'token_de_acesso_5',
                },
            },
        },
        financeiro: {
            id: 654,
            comissao: 180.00,
            tipoPagamento: 'Liquidez',
            tipoFiscal: 'NF-e',
        },
    },
];


        
        
const PedidoFaturado = () => {
    const [data, setData] = useState<PedidoFaturadoModel[]>(dataMck);

    const [PedidoFaturado, setPedidoFaturado] = useState<PedidoFaturadoModel | undefined>(undefined);
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
    const deletePedidoFaturado = (id: number) => {
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
            setPedidoFaturado(undefined)
        }
    }, [open])

    const columns = useMemo<MRT_ColumnDef<PedidoFaturadoModel>[]>(
        () => [
            {
                accessorKey: 'ordemDeCompra.codigoPedido',
                header: 'Ordem de compra',
            },
            {
                accessorKey: 'notaFiscal', 
                header: 'Nota fiscal',
            },
            
            {
                accessorKey: 'dataFaturamento', 
                header: 'data Faturamento',
                Cell: ({ cell }) => (
                    <Box
                      component="span"
                                         >
                      {cell.getValue<Date>().toLocaleDateString()}
                    </Box>)
            },
            {
                accessorKey: 'financeiro.tipoPagamento', 
                header: 'Tipo Pagamento',
            },
            {
                accessorKey: 'dataVencimento', 
                header: 'data Vencimento',
                Cell: ({ cell }) => (
                    <Box
                      component="span"
                                         >
                      {cell.getValue<Date>().toLocaleDateString()}
                    </Box>)
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
                        setPedidoFaturado(row.original);
                    }}
                >
                    <Edit />
                </IconButton>
                <IconButton
                    color="error"
                    onClick={() => {
                        if (row.original.id != null) {
                            deletePedidoFaturado(row.original.id);
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
               {     <RegisterModal
                        setOpenModal={setOpen}
                        openModal={open}
                        setReload={setReload}
                        updatePedidoFaturado={PedidoFaturado}
                    />}
            </Box>
        </>
    );
};

export default PedidoFaturado;
