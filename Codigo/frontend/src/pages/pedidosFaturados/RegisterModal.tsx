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

import { useNotification } from '@/hooks/useNotification';
import apiFetch from '@/services/api';
import Validade from '@/utils/Validate';
import { IndustriaModel } from '@/models/IndustriaModel';
import { ClienteModel } from '@/models/ClienteModel';
import { OrderStatus } from '@/enums/OrderStatus';
import CurrencyInput from '@/components/CurrencyInput';
import { PedidoFaturadoModel } from '@/models/PedidoFaturadoModel';
import { Cargo } from '@/enums/Cargo';
import { DateCalendar, DateField, DatePicker } from '@mui/x-date-pickers';

const emptyPedidoFaturado: PedidoFaturadoModel = {
    id: 0,
    dataFaturamento: new Date(),
    dataVencimento: new Date(),
    valorFaturado: 0,
    valorLiquido: 0,
    notaFiscal: '',
    ordemDeCompra: {
        id: null,
        valor: 0,
        codigoPedido: '',
        totalmenteFaturado: OrderStatus.TOTALMENTEFATURADO,
        industria: {
            id: null,
            nome: '',
            contatos: [],
        },
        cliente: {
            id: null,
            cnpj: '',
            telefone: undefined,
            endereco: {
                id: null,
                cidade: '',
                rua: '',
            },
            nomeFantasia: '',
            vendedor: {
                id: 0,
                nome: '',
                email: '',
                cargo: Cargo.ADMINISTRADOR,
                token: undefined,
            },
        },
    },
    financeiro: {
        id: null,
        comissao: 0,
        tipoPagamento: '',
        tipoFiscal: '',
    },
};
interface IRegisterModalProps {
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    openModal: boolean;
    setReload: Dispatch<SetStateAction<boolean>>;
    updatePedidoFaturado: PedidoFaturadoModel | undefined;
}
const RegisterModal = (props: IRegisterModalProps) => {
    const { showNotification } = useNotification();
    const validate = new Validade();
    const [loading, setLoading] = useState(false);
    const [industrias, setIndustrias] = useState<IndustriaModel[]>([]);
    const [industriasName, setIndustriasName] = useState<string[]>([]);
    const [clientes, setClientes] = useState<ClienteModel[]>([]);
    const [clientesName, setClientesName] = useState<string[]>([]);
    const [pedidoFaturado, setpedidoFaturado] = useState<PedidoFaturadoModel>(emptyPedidoFaturado);
    const handleClose = () => {
        props.setOpenModal(false);
    };
    const getIndustrias = () => {
        apiFetch
            .get('/industria/')
            .then((data) => {
                setIndustrias(data.data);
                const aux: string[] = [];
                industrias.forEach((element) => {
                    aux.push(element.nome);
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
                const aux: string[] = [];
                clientes.forEach((element) => {
                    aux.push(element.nomeFantasia);
                    setClientesName(aux);
                });
            })
            .catch((e) => {
                console.log(e);
            });
    };
    function onSubmit() {

    //    if(pedidoFaturado.cliente.nomeFantasia != '' && pedidoFaturado.industria.nome != '' && pedidoFaturado.codigoPedido != '' && pedidoFaturado.valor.toString() != null) {
            const aux = pedidoFaturado
            const valueStringFormatter = pedidoFaturado?.valorFaturado.toString();
            aux.valorFaturado = parseFloat(valueStringFormatter.replace(/[^\d,.-]/g, '').replace(',', ''));
            console.log(aux.valorFaturado)
            setpedidoFaturado(aux)
            // if (props.updatePedidoFaturado == undefined) {
                setLoading(true);
                apiFetch
                    .post('/pedido/', pedidoFaturado)
                    .then((data) => {
                        props.setReload(true);
                        showNotification({
                            message: data.data.message,
                            type: 'success',
                            title: data.data.titulo,
                        });
                        setpedidoFaturado(emptyPedidoFaturado)
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
            // } else {
            //     setLoading(true);
            //     apiFetch
            //         .put(`/ordem/`, pedidoFaturado)
            //         .then((data) => {
            //             props.setReload(true);
            //             showNotification({ message: data.data.message, type: 'success', title: data.data.titulo });
            //         })
            //         .catch((error) => {
            //             showNotification({
            //                 message: error.response.data.message,
            //                 type: 'error',
            //                 title: error.response.data.titulo,
            //             });
            //         })
            //         .finally(() => {
            //             setLoading(false);
            //             props.setOpenModal(false);
            //         });
            // }
        // } else {
        //     showNotification({
        //         message: "Confira todos os campos ",
        //         type: 'error',
        //         title: "Campos nao preenchidos ",
        //     });
        // }
    }
    function ChangeModalState() {
        props.setOpenModal(!open);
    }
    useEffect(() => {
        getIndustrias();
        getClientes();
        if (props.updatePedidoFaturado != undefined) {
            setpedidoFaturado(props.updatePedidoFaturado);
        } else {
            setpedidoFaturado(emptyPedidoFaturado);
        }
    }, [props.openModal]);

    useEffect(() => {}, [clientesName]);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        if (pedidoFaturado != undefined) {
            const { name, value } = e.target as HTMLInputElement;
            setpedidoFaturado({ ...pedidoFaturado, [name]: value });
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
                {props.updatePedidoFaturado == undefined
                    ? 'Cadastrar Pedido Faturado'
                    : 'Atualizar Pedido ' + pedidoFaturado.notaFiscal}
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
                <div style={{border:"1px black solid", padding:"5px"}}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: '#344054',
                        }}
                        display="block"
                    >
                        Filtros
                    </Typography>
                    <div style={{ display: 'grid', gap: 20}}>
                        <div
                            style={{
                                gridColumnStart: 1,
                                gridColumnEnd: 6,
                            }}
                        >
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    color: '#344054',
                                }}
                                display="block"
                            >
                                Industria
                            </Typography>
                            <Autocomplete
                                disablePortal
                                id="cargo"
                                options={industriasName}
                                 
                                renderInput={(params) => {
                                    return <TextField {...params} name="industria" placeholder="Selecione uma Industria" />;
                                }}
                                onSelect={(e: SyntheticEvent<HTMLDivElement, Event>) => {}}
                            />
                        </div>
                        <div
                            style={{
                                gridColumnStart: 6,
                                gridColumnEnd: 12,
                            }}
                        >
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    color: '#344054',
                                }}
                                display="block"
                            >
                                Cliente
                            </Typography>
                            <Autocomplete
                                disablePortal
                                id="cliente"
                                options={clientesName}
                                renderInput={(params) => <TextField {...params} name="cliente" placeholder="Selecione um Cliente" />}
                                onSelect={(e: SyntheticEvent<HTMLDivElement, Event>) => {
                                    const { value } = e.target as HTMLInputElement;
                                    const cliente: ClienteModel | undefined = clientes.find((element) => {
                                        return element.nomeFantasia == value;
                                    });
                                    if (cliente != undefined) {
                                    }
                                }}
                            />
                        </div>
                        <div
                            style={{
                                gridColumnStart: 8,
                                gridColumnEnd: 12,
                            }}
                        ></div>
                    </div>
                </div>

                <Typography
                    variant="subtitle1"
                    sx={{
                        color: '#344054',
                    }}
                    display="block"
                >
                    Ordens cadastradas *
                </Typography>
                <Autocomplete
                    disablePortal
                    id="cliente"
                    options={clientesName}
                    fullWidth
                    renderInput={(params) => <TextField {...params} name="idOrdem" placeholder="Selecione uma ordem " />}
                    onSelect={(e: SyntheticEvent<HTMLDivElement, Event>) => {
                        const { value } = e.target as HTMLInputElement;
                        const cliente: ClienteModel | undefined = clientes.find((element) => {
                            return element.nomeFantasia == value;
                        });
                        if (cliente != undefined) {
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
                    Nota fiscal*
                </Typography>
                <TextField
                    id="nome"
                    variant="outlined"
                    placeholder="Ex: 12311231134213"
                    fullWidth
                    name="codigoPedido"
                    value={pedidoFaturado?.notaFiscal}
                    onChange={handleChange}
                />

                <div style={{ display: 'grid', gap: 20 }}>
                    <div
                        style={{
                            gridColumnStart: 1,
                            gridColumnEnd: 8,
                        }}
                    >
                        <Typography
                            variant="subtitle2"
                            sx={{
                                color: '#344054',
                            }}
                            display="block"
                        >
                            Data de Faturamento
                        </Typography>
                        <TextField
                            id="nome"
                            variant="outlined"
                            placeholder="Ex: 25/02/2024"
                            fullWidth
                            name="codigoPedido"
                            value={pedidoFaturado?.notaFiscal}
                            onChange={handleChange}
                        />
                    </div>
                    <div
                        style={{
                            gridColumnStart: 8,
                            gridColumnEnd: 12,
                        }}
                    >
                        <Typography
                            variant="subtitle2"
                            sx={{
                                color: '#344054',
                            }}
                            display="block"
                        >
                            Prazo em dias
                        </Typography>
                        <TextField
                            id="nome"
                            variant="outlined"
                            placeholder="Ex: 45"
                            fullWidth
                            name="codigoPedido"
                            value={pedidoFaturado?.notaFiscal}
                            onChange={handleChange}
                        />
                    </div>
                    <div
                        style={{
                            gridColumnStart: 8,
                            gridColumnEnd: 12,
                        }}
                    ></div>
                </div>
                <Typography
                    variant="subtitle1"
                    sx={{
                        color: '#344054',
                    }}
                    display="block"
                >
                    Valor Faturado*
                </Typography>

                <CurrencyInput
                    placeholder="R$0.00"
                    type="text"
                    value={pedidoFaturado?.valorFaturado}
                    name="valor"
                    onChange={handleChange}
                    maskOptions={undefined}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={ChangeModalState} variant="contained">
                    Cancelar
                </Button>
                <Button variant="contained">
                    {props.updatePedidoFaturado == undefined ? 'Cadastrar' : 'Atualizar '}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default RegisterModal;
