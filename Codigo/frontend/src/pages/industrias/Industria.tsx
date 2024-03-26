import { Fragment, useEffect, useMemo, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import AddIcon from '@mui/icons-material/Add';
import apiFetch from '../../services/api';
import { Box } from '@mui/system';
import { Button, Divider, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import { IndustriaModel } from 'models/IndustriaModel';
import { MRT_ColumnDef, MaterialReactTable } from 'material-react-table';
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
    return (
        <Box display={'grid'}>
            <Typography variant="h2" sx={{ textAlign: 'center' }} color="text.primary">
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
                            backgroundColor: '#788DAA',
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
                        backgroundColor: '#788DAA',
                    }}
                    aria-label="add"
                >
                    <AddIcon />
                </IconButton>
            </Box>
            <Box
                sx={{
                    marginTop: '20px',
                }}
            >
                <MaterialReactTable
                    columns={columns}
                    data={data}
                    columnResizeMode="onChange"
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
                                    deleteIndustria(row.original.id);
                                }}
                            >
                                <Delete />
                            </IconButton>
                        </Box>
                    )}
                    renderDetailPanel={({ row }) => {
                        return (
                            <Box
                                sx={{
                                    alignItems: 'left',
                                    width: '100%',
                                }}
                            >
                                <List sx={{ width: '100%' }}>
                                    {row.original.contatos.map((contato) => {
                                        return (
                                            <>
                                                <ListItem alignItems="flex-start">
                                                    <ListItemText
                                                        primary={contato.tipoContato}
                                                        secondary={
                                                            <Fragment>
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
                                                                        onClick={() =>
                                                                            window.open(
                                                                                `mailto:${contato.email}?subject=Ampla System!`,
                                                                            )
                                                                        }
                                                                    >
                                                                        <Email />
                                                                    </IconButton>{' '}
                                                                </Typography>
                                                            </Fragment>
                                                        }
                                                    />
                                                </ListItem>
                                                <Divider component="li" />
                                            </>
                                        );
                                    })}
                                </List>
                            </Box>
                        );
                    }}
                />
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
                            backgroundColor: '#788DAA',
                        }}
                        aria-label="add"
                    >
                        <HelpOutlineIcon />
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
