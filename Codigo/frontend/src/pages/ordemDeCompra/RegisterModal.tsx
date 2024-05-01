import { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent, useEffect, useState } from 'react';

import {
    Autocomplete,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
} from '@mui/material';

import { useNotification } from '@/hooks/useNotification';
import { OrdemDeCompraModel } from '@/models/OrdemDeCompraModel';
import apiFetch from '@/services/api';
import Validade from '@/utils/Validate';
import { IndustriaModel } from '@/models/IndustriaModel';
import { ClienteModel } from '@/models/ClienteModel';
import { OrderStatus } from '@/enums/OrderStatus';
import CurrencyInput from '@/components/CurrencyInput';

const emptyOrdemDeCompra:OrdemDeCompraModel =  {
    id: null,
    valor: '',
    codigoPedido: '',
    totalmenteFaturado: OrderStatus.NAOFATURADO,
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
            .get('/industria/withFinanceiro')
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
    
        if(ordemDeCompra.cliente.nomeFantasia != '' && ordemDeCompra.industria.nome != '' && ordemDeCompra.codigoPedido != '' && ordemDeCompra.valor.toString() != null) {
            const aux = ordemDeCompra
            const valueStringFormatter = ordemDeCompra?.valor.toString();
            aux.valor = parseFloat(valueStringFormatter.replace(/[^\d,.-]/g, '').replace(',', ''));
            console.log(aux.valor)
            setOrdemDeCompra(aux)
            if (props.updateOrdemDeCompra == undefined) {
                setLoading(true);
                apiFetch
                    .post('/ordem/', ordemDeCompra)
                    .then((data) => {
                        props.setReload(true);
                        showNotification({
                            message: data.data.message,
                            type: 'success',
                            title: data.data.titulo,
                        });
                        setOrdemDeCompra(emptyOrdemDeCompra)
                    })
                    .catch((error) => {
                        showNotification({
                            message: error.response.data.message,
                            type: 'error',
                            title: error.response.data.titulo,
                        });
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            } else {
                setLoading(true);
                apiFetch
                    .put(`/ordem/`, ordemDeCompra)
                    .then((data) => {
                        props.setReload(true);
                        showNotification({ message: data.data.message, type: 'success', title: data.data.titulo });
                    })
                    .catch((error) => {
                        showNotification({
                            message: error.response.data.message,
                            type: 'error',
                            title: error.response.data.titulo,
                        });
                    })
                    .finally(() => {
                        setLoading(false);
                        props.setOpenModal(false);
                    });
            }
        } else {
            showNotification({
                message: "Confira todos os campos ",
                type: 'error',
                title: "Campos nao preenchidos ",
            });
        }
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
                    onSelect={(e: SyntheticEvent<HTMLDivElement, Event>) => {
                        const {value} = e.target as HTMLInputElement;
                        const cliente:ClienteModel | undefined = clientes.find((element) => {
                            return element.nomeFantasia == value
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
                    placeholder="Codigo"
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
            
                <CurrencyInput placeholder="R$0.00"  type="text" value={ordemDeCompra?.valor} name="valor" onChange={handleChange} maskOptions={undefined}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={ChangeModalState} variant="contained">
                    Cancelar
                </Button>
                <Button onClick={onSubmit} variant="contained">
                    {props.updateOrdemDeCompra == undefined ? 'Cadastrar' : 'Atualizar '}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default RegisterModal;
