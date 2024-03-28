import { Fragment, useEffect, useMemo, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import apiFetch from '../../services/api';
import { Box } from '@mui/system';
import {
    Button,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Stack,
    ThemeProvider,
    Typography,
    createTheme,
} from '@mui/material';
import { IndustriaModel } from 'models/IndustriaModel';
import { MRT_ColumnDef, MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { TipoContato } from '../../enums/TipoContato';
import { Delete, Edit, Email } from '@mui/icons-material';
import * as Sx from './IndustriasStyle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Link } from 'react-router-dom';
import RegisterModal from './ModalCadastro';
import { useNotification } from '../../hooks/useNotification';
const IndustriaPage = () => {
    const [data, setData] = useState<IndustriaModel[]>([]);
    const [open, setOpen] = useState(false);
    const [reload, setRelaod] = useState(true);
    const [file, setFile] = useState<File | null>();
    const [industria, setIndustria] = useState<IndustriaModel | undefined>(undefined);
    const { showNotification } = useNotification();
    useEffect(() => {
        getIndustrias();
        setRelaod(false);
    }, [reload]);
    useEffect(() => {
        if (!open) {
            console.log(industria);
            setIndustria(undefined);
        }
    }, [open]);

    function ChangeModalState() {
        setOpen(!open);
    }

    const getIndustrias = () => {
        apiFetch
            .get('/industria/')
            .then((data) => {
                setData(data.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const deleteIndustria = (id: number) => {
        apiFetch
            .delete(`/industria/${id}`)
            .then((data) => {
                setRelaod(true);
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
    const sendIndustriasFile = () => {
        apiFetch
            .post(
                '/industria/tabela',
                {
                    data: {
                        file: file,
                    },
                },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            )
            .then((data) => {
                setData(data.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const columns = useMemo<MRT_ColumnDef<IndustriaModel>[]>(
        () => [
            {
                accessorKey: 'nome',
                header: 'Nome',
            },

            {
                accessorFn: (row) => {
                    return row.contatos.map((contato) => {
                        if (contato.tipoContato == TipoContato.Financeiro) {
                            return contato.nome;
                        }
                    });
                },
                header: 'Contato Financeiro',
            },
            {
                accessorFn: (row) => {
                    return row.contatos.map((contato) => {
                        if (contato.tipoContato == TipoContato.Financeiro) {
                            return contato.telefone;
                        }
                    });
                },
                header: 'Telefone Financeiro',
            },
            {
                accessorFn: (row) => {
                    return row.contatos.map((contato) => {
                        if (contato.tipoContato == TipoContato.Comercial) {
                            return contato.nome;
                        }
                    });
                },
                header: 'Contato Comercial',
            },
            {
                accessorFn: (row) => {
                    return row.contatos.map((contato) => {
                        if (contato.tipoContato == TipoContato.Comercial) {
                            return contato.telefone;
                        }
                    });
                },
                header: 'Telefone Comercial',
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
        layoutMode: 'grid',
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
        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                <IconButton
                    onClick={() => {
                        setOpen(true);
                        setIndustria(JSON.parse(JSON.stringify(row.original)));
                    }}
                >
                    <Edit />
                </IconButton>
                <IconButton
                    color="error"
                    onClick={() => {
                        if (row.original.id != null) {
                            deleteIndustria(row.original.id);
                        }
                    }}
                >
                    <Delete />
                </IconButton>
            </Box>
        ),
        renderDetailPanel: ({ row }) => {
            return (
                <Stack spacing={2} direction="row">
                    {row.original.contatos.map((contato) => {
                        return (
                            <>
                                <Box>
                                    <Typography variant="h6" color="text.primary">
                                        {contato.tipoContato}
                                    </Typography>
                                    <Typography variant="body2" color="text.primary">
                                        Nome: {contato.nome}
                                    </Typography>
                                    <Typography variant="body2" color="text.primary">
                                        telefone: {contato.telefone}
                                    </Typography>
                                    <Typography variant="body2" color="text.primary">
                                        Email: {contato.email}{' '}
                                        <IconButton
                                            color="primary"
                                            onClick={() => window.open(`mailto:${contato.email}?subject=Ampla System!`)}
                                        >
                                            <Email />
                                        </IconButton>{' '}
                                    </Typography>
                                </Box>
                            </>
                        );
                    })}
                </Stack>
            );
        },
        muiTopToolbarProps: {
            sx: {
                fontWeight: 'bold',
                fontSize: '16px',
                background: '#CACACA',
            },
        },
        muiBottomToolbarProps: {
            sx: {
                fontWeight: 'bold',
                fontSize: '16px',
                background: '#CACACA',
            },
        },
        muiTableHeadCellProps: {
            sx: {
                fontWeight: 'bold',
                fontSize: '16px',
                background: '#CACACA',
            },
        },

        muiTableBodyRowProps: {
            sx: {
                background: '#CACACA',
            },
        },
        muiTableBodyProps: {
            sx: {
                background: '#CACACA',
            },
        },
        muiTableBodyCellProps: {
            sx: {
                fontWeight: 'normal',
                fontSize: '16px',
                background: '#CACACA',
            },
        },
    });

    return (
        <Box display={'grid'} sx={{ maxHeight: '100vh' }}>
            <Typography variant="h2" sx={{ textAlign: 'center' }} color="white">
                Industrias
            </Typography>
            <Box
                display={'flex'}
                sx={{
                    justifyContent: 'space-between',
                }}
            >
                <Box>
                    {' '}
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        sx={{
                            backgroundColor: '#00747C',
                        }}
                        startIcon={<CloudUploadIcon />}
                    >
                        Cadastro automático
                        <Sx.VisuallyHiddenInput
                            type="file"
                            onChange={(event) => {
                                setFile(event?.target?.files[0]);
                                sendIndustriasFile();
                            }}
                        />
                    </Button>
                </Box>
                <IconButton
                    onClick={ChangeModalState}
                    sx={{
                        backgroundColor: '#00747C',
                    }}
                    aria-label="add"
                >
                    <AddOutlinedIcon sx={{ color: 'white' }} />
                </IconButton>
            </Box>
            <Box
                sx={{
                    marginTop: '20px',
                }}
            >
                <MaterialReactTable table={table} />
            </Box>{' '}
            <Box>
                <Link to="../../files/modelo.xlsx" target="_blank" download>
                    <IconButton
                        sx={{
                            right: '30px',
                            bottom: '30px',
                            position: 'absolute',
                            height: '45px',
                            width: '45px',
                            backgroundColor: '#00747C',
                        }}
                        aria-label="add"
                    >
                        <HelpOutlineIcon sx={{ color: 'white' }} />
                    </IconButton>
                </Link>
            </Box>
            {open ? (
                <RegisterModal
                    openModal={open}
                    setOpenModal={setOpen}
                    updateIndustria={industria}
                    setReload={setRelaod}
                />
            ) : (
                ''
            )}
        </Box>
    );
};
export default IndustriaPage;
