import { useEffect, useMemo, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/system';
import { Button, IconButton, Typography, Menu, MenuItem, ButtonGroup } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { MRT_ColumnDef, MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Delete, Edit, Tune } from '@mui/icons-material';

import { useNotification } from '@/hooks/useNotification';
import apiFetch from '@/services/api';

import { IndustriaModel } from 'models/IndustriaModel';
import { TipoContato } from '@/enums/TipoContato';

import RegisterModal from './RegisterModal.tsx';

import * as Input from '@/styles/types/InputStyles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import { IndustriasDetailView } from './IndustriasDetailView.tsx';

const IndustriaPage = () => {
    const [data, setData] = useState<IndustriaModel[]>([]);
    const [open, setOpen] = useState(false);
    const [openDetailView, setOpenDetailView] = useState(false);
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

    useEffect(() => {
        console.log(file);
        if (file != undefined) {
            apiFetch
                .post(
                    '/industria/tabela',
                    {
                        file,
                    },
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    },
                )
                .then((data) => {
                    console.log(data);
                })
                .catch((e) => {
                    console.log(e);
                })
                .finally(() => {
                    setReload(true);
                });
        }
    }, [file]);
    const columns = useMemo<MRT_ColumnDef<IndustriaModel>[]>(
        () => [
            {
                accessorKey: 'nome',
                header: 'Nome',
            },
            {
                accessorFn: (row) => {
                    return row.contatos?.map((contato) => {
                        if (contato.tipoContato === TipoContato.Comercial) {
                            return contato.nome;
                        }
                        return null;
                    }).filter(Boolean).join(', ');
                },
                header: 'Contato Comercial',
            },
            {
                accessorFn: (row) => {
                    return row.contatos?.map((contato) => {
                        if (contato.tipoContato === TipoContato.Comercial) {
                            return contato.telefone;
                        }
                        return null;
                    }).filter(Boolean).join(', ');
                },
                header: 'Telefone Comercial',
            },
            {
                accessorFn: (row) => {
                    return row.contatos?.map((contato) => {
                        if (contato.tipoContato === TipoContato.Financeiro) {
                            return contato.nome;
                        }
                        return null;
                    }).filter(Boolean).join(', ');
                },
                header: 'Contato Financeiro',
            },
            {
                accessorFn: (row) => {
                    return row.contatos?.map((contato) => {
                        if (contato.tipoContato === TipoContato.Financeiro) {
                            return contato.telefone;
                        }
                        return null;
                    }).filter(Boolean).join(', ');
                },
                header: 'Telefone Financeiro',
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data,
        enableDensityToggle: false,
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
                        setOpenDetailView(true);
                        setIndustria(JSON.parse(JSON.stringify(row.original)));
                    }}
                >
                    <VisibilityIcon />
                </IconButton>
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
            <header className="flex justify-between mb-5">
                <Typography variant="h4">Industrias</Typography>
                <div className="flex gap-3">
                    <Button color="warning" component="label" variant="outlined" startIcon={<CloudUploadIcon />}>
                        Importar industria
                        <Input.VisuallyHiddenInput
                            type="file"
                            onChange={(event) => {
                                if (event.target.files[0] != null) {
                                    setFile(event.target.files[0]);
                                }
                            }}
                        />
                    </Button>
                    <Button startIcon={<FileDownloadIcon />} color="warning">
                        <Link to="/files/modelo.xlsx" target="_blank" download>
                            Baixar modelo
                        </Link>
                    </Button>
                    <Button onClick={ChangeModalState} startIcon={<AddIcon sx={{ fontSize: 5 }} />}>
                        Adicionar industria
                    </Button>
                </div>
            </header>
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
                    sx={{
                        margin: 0,
                        padding: 0,
                    }}
                >
                    <Button component="label" variant="contained" fullWidth startIcon={<CloudUploadIcon />}>
                        Importar industria
                        <Input.VisuallyHiddenInput
                            type="file"
                            onChange={(event) => {
                                if (event.target.files[0] != null) {
                                    setFile(event.target.files[0]);
                                }
                            }}
                        />
                    </Button>
                </MenuItem>
                <MenuItem
                    onClick={handleClose}
                    sx={{
                        margin: 0,
                        padding: 0,
                    }}
                >
                    <Button component="label" fullWidth variant="contained" startIcon={<FileDownloadIcon />}>
                        <Link to="/files/modelo.xlsx" target="_blank" download>
                            Baixar modelo
                        </Link>
                    </Button>
                </MenuItem>
            </Menu>
            {openDetailView && industria != undefined ? (
                <IndustriasDetailView
                    industria={industria}
                    open={openDetailView}
                    handleClose={() => {
                        setOpenDetailView(false);
                        setIndustria(undefined);
                    }}
                />
            ) : (
                ''
            )}
        </Box>
    );
};
export default IndustriaPage;
