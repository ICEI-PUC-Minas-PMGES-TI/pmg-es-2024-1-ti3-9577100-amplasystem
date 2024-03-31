import { useEffect, useMemo, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CallIcon from '@mui/icons-material/Call';
import PersonIcon from '@mui/icons-material/Person';
import { Box } from '@mui/system';
import { Button, IconButton, Stack, Typography, Menu, MenuItem } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { MRT_ColumnDef, MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Delete, Edit, Email } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { useNotification } from '../../hooks/useNotification';
import apiFetch from '../../services/api';

import { IndustriaModel } from 'models/IndustriaModel';
import { TipoContato } from '../../enums/TipoContato';

import RegisterModal from './ModalCadastro';

import * as Input from '../../styles/InputStyles';
import * as ButtonStyle from '../../styles/ButtonsStyles';
const IndustriaPage = () => {
    const [data, setData] = useState<IndustriaModel[]>([]);
    const [open, setOpen] = useState(false);
    const [reload, setReload] = useState(true);
    const [file, setFile] = useState<File | null>(null);
    const [industria, setIndustria] = useState<IndustriaModel | undefined>(undefined);

    const { showNotification } = useNotification();
    useEffect(() => {
        getIndustrias();
        setReload(false);
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
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenuOption = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
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
                setReload(true);
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
                                        <PersonIcon /> {contato.nome}
                                    </Typography>
                                    <Typography variant="body2" color="text.primary">
                                        <CallIcon /> {contato.telefone}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.primary"
                                        onClick={() => window.open(`mailto:${contato.email}?subject=Ampla System!`)}
                                    >
                                        <Email /> {contato.email}{' '}
                                    </Typography>
                                </Box>
                            </>
                        );
                    })}
                </Stack>
            );
        },
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
        <Box display={'grid'} sx={{ maxHeight: '100vh' }}>
            <Typography variant="h4" sx={{ textAlign: 'left', paddingBottom: '20px' }} color="#202022">
                Industrias
            </Typography>
            <Box
                display={'flex'}
                sx={{
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                }}
            >
                <Box>
                    {' '}
                    <Button
                        aria-controls={openMenuOption ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openMenuOption ? 'true' : undefined}
                        onClick={handleClick}
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        sx={ButtonStyle.optionMenu}
                        startIcon={<ArrowDropDownIcon />}
                    >
                        Opções
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openMenuOption}
                        onClose={handleClose}
                        sx={{
                            margin: '5px',
                            padding: 0,
                            '& .css-6hp17o-MuiList-root-MuiMenu-list': {
                                padding: 0,
                            },
                        }}
                    >
                        <MenuItem
                            onClick={handleClose}
                            sx={{
                                margin: 0,
                                padding: 0,
                            }}
                        >
                            <Button
                                component="label"
                                variant="contained"
                                sx={ButtonStyle.menuButton}
                                startIcon={<CloudUploadIcon />}
                            >
                                Cadastro automático
                                <Input.VisuallyHiddenInput
                                    type="file"
                                    onChange={(event) => {
                                        // setFile(event.target.files[0]);
                                        console.log(event);
                                        sendIndustriasFile();
                                    }}
                                />
                            </Button>
                        </MenuItem>
                        <MenuItem onClick={handleClose} sx={{ margin: 0, padding: 0 }}>
                            <Link to="../../files/modelo.xlsx" target="_blank" download>
                                {' '}
                                <Button
                                    component="label"
                                    variant="contained"
                                    sx={ButtonStyle.menuButton}
                                    startIcon={<FileDownloadIcon />}
                                >
                                    Baixar a tabela modelo
                                </Button>
                            </Link>
                        </MenuItem>
                    </Menu>
                </Box>
                <IconButton onClick={ChangeModalState} sx={ButtonStyle.addButton} aria-label="add">
                    <AddOutlinedIcon sx={ButtonStyle.iconButton} />
                </IconButton>
            </Box>

            <MaterialReactTable table={table} />
            {open ? (
                <RegisterModal
                    openModal={open}
                    setOpenModal={setOpen}
                    updateIndustria={industria}
                    setReload={setReload}
                />
            ) : (
                ''
            )}
        </Box>
    );
};
export default IndustriaPage;
