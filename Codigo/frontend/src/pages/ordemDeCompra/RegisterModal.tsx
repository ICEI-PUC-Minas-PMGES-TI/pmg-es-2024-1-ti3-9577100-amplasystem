import { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent, useEffect, useState } from 'react';

import { Box } from '@mui/system';
import {
    Autocomplete,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Modal,
    TextField,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { Cargo } from '@/enums/Cargo';
import { useNotification } from '@/hooks/useNotification';
import { OrdemDeCompraModel } from '@/models/OrdemDeCompraModel';
import apiFetch from '@/services/api';
import * as ButtonStyle from '@/styles/types/ButtonsStyles';
import * as Input from '@/styles/types/InputStyles';
import * as ModalStyle from '@/styles/types/ModalStyles';
import Validade from '@/utils/Validate';
import { IndustriaModel } from '@/models/IndustriaModel';
import { Update } from '@mui/icons-material';
import { ClienteModel } from '@/models/ClienteModel';

const emptyOrdemDeCompra:OrdemDeCompraModel =  {
    id: null,
    valor: '',
    codigoPedido: '',
    totalmenteFaturado: '',
    industria: {
        id: null,
        nome:"",
        contatos:[]
    },
    cliente: {
        id: null,
        cnpj: '',
        telefone: "",
        endereco: undefined,
        nomeFantasia: '',
        vendedor: {
            id: null,
            nome: '',
            email: '',
            cargo: '',
            token: undefined
        }
    }
}
interface IRegisterModalProps {
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    openModal: boolean;
    setReload: Dispatch<SetStateAction<boolean>>;
    updateOrdemDeCompra: OrdemDeCompraModel | undefined;
}
const RegisterModal = (props: IRegisterModalProps) => {
    const { showNotification } = useNotification();
    const validate = new Validade();
    const [loading, setLoading] = useState(false);
    const [industrias, setIndustrias] = useState<IndustriaModel[]>([])
    const [industriasName, setIndustriasName] = useState<string[]>([])
    const [clientes, setClientes] = useState<ClienteModel[]>([])
    const [clientesName, setClientesName] = useState<string[]>([])
    const [ordemDeCompra, setOrdemDeCompra] =  useState<OrdemDeCompraModel>(emptyOrdemDeCompra);
    const handleClose = () => {
        props.setOpenModal(false);
    };
    const getIndustrias = () => {
        apiFetch
            .get('/industria/')
            .then((data) => {
                setIndustrias(data.data);
                const aux:string[] = [];
                industrias.forEach(element => {
                    aux.push(element.nome)
                    setIndustriasName(aux);
                });
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const getClientes = () => {
        apiFetch
            .get('/cliente/')
            .then((data) => {
                setClientes(data.data);
                const aux:string[] = [];
                clientes.forEach(element => {
                    aux.push(element.nomeFantasia)
                    setClientesName(aux);
                });
            })
            .catch((e) => {
                console.log(e); 
            });
    };
    function onSubmit() {
        console.log(ordemDeCompra)
    }
    function ChangeModalState() {
        props.setOpenModal(!open);
    }
    useEffect(() => {
        getIndustrias()
        getClientes()
        if(props.updateOrdemDeCompra != undefined){
            setOrdemDeCompra(props.updateOrdemDeCompra)
        } else{
            setOrdemDeCompra(emptyOrdemDeCompra)
        }
    }, [props.openModal]);

    useEffect(() => {
    }, [clientesName])


    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        if (ordemDeCompra != undefined) {
            const {name, value} = e.target as HTMLInputElement;
            setOrdemDeCompra({...ordemDeCompra, [name]: value});
        }
    }
    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            open={props.openModal}
            onClose={handleClose}
            sx={{
                pointerEvents: loading ? 'none' : 'auto',
            }}
        >
            <DialogTitle>
                {props.updateOrdemDeCompra == undefined ? 'Cadastrar Ordem de Compra' : 'Atualizar Ordem ' + ordemDeCompra.codigoPedido} 
            </DialogTitle>
            <DialogContent>
                <CircularProgress
                    sx={{
                        visibility: loading ? 'visible' : 'hidden',
                        position: 'absolute',
                        top: '40%',
                        left: '45%',
                    }}
                />
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                    sx={ButtonStyle.closeButton}
                >
                    <CloseIcon />
                </IconButton>
                <Typography
                    variant="subtitle1"
                    sx={{
                        color: '#344054',
                    }}
                    display="block"
                >
                    Industria *
                </Typography>
                <Autocomplete
                    disablePortal
                    id="cargo"
                    options={industriasName}
                    fullWidth
                    value={ordemDeCompra?.industria.nome}
                    renderInput={(params) => {
                        return<TextField {...params} name='industria' placeholder="Industria" />
                    }}
                    onSelect={(e: SyntheticEvent<HTMLDivElement, Event>) => {
                        const {value} = e.target as HTMLInputElement;
                        const industria:IndustriaModel | undefined = industrias.find((element) => {
                            return element.nome == value
                        })
                        if(industria != undefined){
                            console.log(ordemDeCompra)
                            setOrdemDeCompra({...ordemDeCompra, [`industria`]:industria}); 
                            console.log(industria)
                            console.log(ordemDeCompra)
                        }  
                    }}
                
                />
                  <Typography
                    variant="subtitle1"
                    sx={{
                        color: '#344054',
                    }}
                    display="block"
                >
                    Cliente *
                </Typography>
                <Autocomplete
                    disablePortal
                    id="cliente"
                    options={clientesName}
                    fullWidth
                    value={ordemDeCompra?.cliente.nomeFantasia}
                    renderInput={(params) => <TextField {...params} name="cliente" placeholder="Cliente" />}
                    onSelect={(event: SyntheticEvent<HTMLDivElement, Event>) => {
                        const {value} = e.target as HTMLInputElement;
                        const cliente:ClienteModel | undefined = clientes.find((element) => {
                            return element.nome == value
                        })
                        if(cliente != undefined){
                            setOrdemDeCompra({...ordemDeCompra, [`cliente`]:cliente}); 
                        }  
                    }}
                />
                 <Typography
                    variant="subtitle1"
                    sx={{
                        color: '#344054',
                    }}
                    display="block"
                >
                    Codigo da Ordem *
                </Typography>
                <TextField
                    id="nome"
                    variant="outlined"
                    placeholder="Nome"
                    fullWidth
                    name='codigoPedido'
                    value={ordemDeCompra?.codigoPedido}
                    onChange={handleChange}
                />
                 <Typography
                    variant="subtitle1"
                    sx={{
                        color: '#344054',
                    }}
                    display="block"
                >
                    Valor *
                </Typography>
                <TextField
                    id="nome"
                    variant="outlined"
                    placeholder="Nome"
                    name='valor'
                    fullWidth
                    value={ordemDeCompra?.valor}
                   onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={ChangeModalState} variant="contained">
                    Cancelar
                </Button>
                <Button onClick={onSubmit} variant="contained">
                    {ordemDeCompra == undefined ? 'Cadastrar' : 'Atualizar '}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default RegisterModal;
