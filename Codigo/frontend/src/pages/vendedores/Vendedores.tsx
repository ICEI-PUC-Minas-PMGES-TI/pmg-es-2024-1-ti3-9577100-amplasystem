import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import apiFetch from '../../services/api';
import { VendedorModel } from 'models/VendedorModel';
import { Box } from '@mui/system';
import { IconButton } from '@mui/material';
import RegisterModal from './ModalCadastro';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { Delete, Edit, Email } from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotificaion';
const VendedoresPage = () => {
    const [vendedor, setVendedor] = React.useState<VendedorModel | undefined>(undefined);
    const [data, setData] = React.useState<VendedorModel[]>([]);
    const [open, setOpen] = React.useState(false);
    const [reload, setReload] = React.useState(true);
    React.useEffect(() => {
        getVendedores();
    }, [reload]);
    const { user } = useAuth();
    function ChangeModalState() {
        setOpen(!open);
    }
    const { showNotification } = useNotification();
    function getVendedores() {
        apiFetch
            .get('/vendedor')
            .then((data) => {
                setData(data.data);
                setReload(false);
            })
            .catch((e) => {
                console.log(e);
            });
    }
    const deleteVendedor = (id: number) => {
        apiFetch
            .delete(`/vendedor/${id}`)
            .then((data) => {
                setReload(true);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const columns = React.useMemo<MRT_ColumnDef<VendedorModel>[]>(
        () => [
            {
                accessorKey: 'nome', //access nested data with dot notation
                header: 'Nome',
            },
            {
                accessorKey: 'email',
                header: 'Email',
            },
            {
                accessorKey: 'cargo', //normal accessorKey
                header: 'Cargo',
                grow: true,
            },
        ],
        [],
    );

    return (
        <Box display={'grid'}>
            <IconButton
                onClick={ChangeModalState}
                sx={{
                    top: 20,
                    right: 20,
                    position: 'absolute',
                    marginRight: '10px',
                    backgroundColor: '#788DAA',
                }}
                aria-label="add"
            >
                <AddIcon />
            </IconButton>
            <Box
                sx={{
                    marginTop: '50px',
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
                    renderRowActions={({ row, table }) => (
                        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                            <IconButton
                                color="primary"
                                onClick={() => window.open(`mailto:${row.original.email}?subject=Ampla System!`)}
                            >
                                <Email />
                            </IconButton>
                            <IconButton
                                color="secondary"
                                onClick={() => {
                                    setVendedor(row.original);
                                    ChangeModalState();
                                }}
                            >
                                <Edit />
                            </IconButton>
                            <IconButton
                                color="error"
                                onClick={() => {
                                    if (row.original.email != user.email) {
                                        deleteVendedor(row.original.id);
                                        <>
                                            {showNotification({
                                                message: 'vendedor deletado',
                                                type: 'success',
                                            })}
                                        </>;
                                    } else {
                                        <>
                                            {showNotification({
                                                message: 'Nao e possível deletar o vendedor logado',
                                                type: 'error',
                                            })}
                                        </>;
                                    }
                                }}
                            >
                                <Delete />
                            </IconButton>
                        </Box>
                    )}
                />
            </Box>

            <RegisterModal setOpenModal={setOpen} openModal={open} setReload={setReload} updateVendedor={vendedor} />
        </Box>
    );
};

export default VendedoresPage;
