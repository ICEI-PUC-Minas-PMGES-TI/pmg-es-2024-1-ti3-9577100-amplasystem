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
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal.tsx';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';




const PedidoFaturado = () => {
    const [data, setData] = useState<PedidoFaturadoModel[]>([]);

    const [PedidoFaturado, setPedidoFaturado] = useState<PedidoFaturadoModel | undefined>(undefined);
    const [open, setOpen] = useState(false);
    const [reload, setReload] = useState(true);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [id, setid] = useState<number | null>(null);
    useEffect(() => {
        getPedidoFaturado();
        setReload(false);
    }, [reload]);
    const { showNotification } = useNotification();
    const ChangeModalState = () => {
        setOpen(!open);
    };

    const getPedidoFaturado = () => {
        apiFetch
            .get('/pedido_faturado')
            .then((data) => {
                console.log(data.data)
                setData(data.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const handleDownload = (url:string) => {
        apiFetch.get(url, {
            responseType: 'blob', 
        }).then (
            (response) => {
                const blob = new Blob([response.data], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                });
    
                const link = document.createElement('a');
    
                link.href = window.URL.createObjectURL(blob);
                link.download = 'purchaseOrdersReport.xlsx';
    
                document.body.appendChild(link);
    
                link.click();
    
                if(link.parentNode != undefined){
                    link.parentNode.removeChild(link);
                }
            }
        ).catch((e) => {
            console.log(e);
        });;        
};
    const deletePedidoFaturado = (id: number | null) => {
        apiFetch
            .delete(`/pedido_faturado/${id}`)
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
            });
    };
    useEffect(() => {
        if (!open) {
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
                Cell: ({ cell }) => {
                    const date = new Date(cell.getValue<string>())
                    return <Box
                        component="span"
                    >
                        {date.toLocaleDateString()}
                    </Box>
                }
            },
            {
                accessorKey: 'financeiro.tipoPagamento',
                header: 'Tipo Pagamento',
            },
            {
                accessorKey: 'dataVencimento',
                header: 'data Vencimento',
                Cell: ({ cell }) => {
                    const date = new Date(cell.getValue<string>())
                    return <Box
                        component="span"
                    >
                        {date.toLocaleDateString()}
                    </Box>
                }
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
                accessorKey: 'financeiro.comissao',
                header: 'Porcentagem de comissão ',
                Cell: ({ cell }) => (
                    <Box
                        component="span"
                    >
                        {cell.getValue<string>()}%
                    </Box>)
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
        enableDensityToggle: false,
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
                            setid(row.original.id)
                            setOpenConfirmModal(true)
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
                <div className="flex gap-3">
                    <Button color="warning" component="label" variant="outlined" startIcon={<DownloadForOfflineIcon />} onClick={() => {handleDownload("pedido_faturado/exportLastMonth")}} >
                        Exportar pedidos do mes anterior
                    </Button>
                    <Button color="warning" startIcon={<DownloadForOfflineIcon />} onClick={() => {handleDownload("pedido_faturado/exportAll")}} >
                        Exportar todas as pedidos
                    </Button>

                    <Button startIcon={<AddIcon sx={{ fontSize: 5 }} />} onClick={ChangeModalState}>
                        Adicionar pedido
                    </Button>
                </div>
            </header>

            <Box display={'grid'} className="my-5">
                <MaterialReactTable table={table} />
                {<RegisterModal
                    setOpenModal={setOpen}
                    openModal={open}
                    setReload={setReload}
                    updatePedidoFaturado={PedidoFaturado}
                />}
            </Box>


            <DeleteConfirmationModal open={openConfirmModal}
                onClose={() => {
                    setOpenConfirmModal(false)
                }}
                onConfirm={() => {
                    deletePedidoFaturado(id)
                }} />
        </>
    );
};

export default PedidoFaturado;
