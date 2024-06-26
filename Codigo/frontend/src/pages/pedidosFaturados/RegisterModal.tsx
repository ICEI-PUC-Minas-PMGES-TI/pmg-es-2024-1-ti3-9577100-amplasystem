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
import { OrdemDeCompraModel } from '@/models/OrdemDeCompraModel';

const emptyPedidoFaturado: PedidoFaturadoModel = {
    id: null,
    dataFaturamento: '',
    dataVencimento: '',
    valorFaturado: 0,
    notaFiscal: '',
    valorLiquido: 0,
    financeiro: {
        id: null,
        comissao: 0,
        tipoPagamento: '',
        tipoFiscal: '',
        industria: {
            id: null,
            nome: '',
            contatos: [],
        },
    },
    ordemDeCompra: {
        id: null,
        valor: 0,
        codigoPedido: '',
        totalmenteFaturado: OrderStatus.TOTALMENTEFATURADO,
        dataCadastro: '',
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
                cep: '',
                estado: '',
                bairro: '',
                numero: -1,
                complemento: '',
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
    const [ordens, setOrdens] = useState<OrdemDeCompraModel[]>([]);
    const [ordensCodigo, setOrdensCodigo] = useState<string[]>([]);

    const [prazoEmDias, setPrazoEmDias] = useState<string>("0");

    //filtro
    const [industria, setIndustria] = useState<IndustriaModel | undefined>(undefined);
    const [cliente, setCliente] = useState<ClienteModel | undefined>(undefined);

    const [pedidoFaturado, setpedidoFaturado] = useState<PedidoFaturadoModel>({ ...emptyPedidoFaturado });
    const handleClose = () => {
        props.setOpenModal(false);
        setIndustria(undefined)
        setCliente(undefined)
        setpedidoFaturado({ ...emptyPedidoFaturado })
        setPrazoEmDias("")
    };
    const getIndustrias = () => {
        apiFetch
            .get('/industria')
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
            .get('/cliente')
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
    const getOrdens = () => {
        const filter = {
            'clienteId': cliente?.id || null,
            'industriaId': industria?.id || null
        }
        console.log(filter)
        apiFetch
            .post('/ordem_de_compra/filtered', filter)
            .then((data) => {
                setOrdens(data.data);
                setOrdensCodigo([])
                console.log(data.data)
                const aux: string[] = [];
                data.data.forEach((element: OrdemDeCompraModel) => {
                    aux.push(element.codigoPedido);
                });
                console.log(aux)
                setOrdensCodigo(aux);
            })
            .catch((e) => {
                console.log(e);
            });
    }
    const getDays = () => {
        if (props.updatePedidoFaturado !== undefined) {
            const aux = { ...pedidoFaturado }
            const dataVencimento = new Date(props.updatePedidoFaturado.dataVencimento);
            const dataFaturamento = new Date(props.updatePedidoFaturado.dataFaturamento);
            var diferencaEmMilissegundos = dataVencimento.getTime() - dataFaturamento.getTime();
            var diferencaEmDias = Math.ceil(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));
            setPrazoEmDias(String(diferencaEmDias))


            aux.dataFaturamento = dataFaturamento.toLocaleDateString()
            setpedidoFaturado(aux)
        }
    }
    function onSubmit() {

        if (pedidoFaturado && pedidoFaturado.dataFaturamento && pedidoFaturado.notaFiscal && pedidoFaturado.valorFaturado) {
            const aux = { ...pedidoFaturado }
            const prazo = parseInt(prazoEmDias)
            console.log("AUX")
            console.log(aux)

            var partes = String(aux.dataFaturamento).split('/');
            var dia: number = Number(partes[0]) + 1;
            var mes: number = Number(partes[1]) - 1;
            var ano: number = Number(partes[2]);



            aux.dataFaturamento = new Date(ano, mes, dia)
            const year = aux.dataFaturamento.getFullYear();
            const month = String(aux.dataFaturamento.getMonth() + 1).padStart(2, "0");
            const day = String(aux.dataFaturamento.getDate()).padStart(2, "0");

            if (prazoEmDias != "") {
                aux.dataVencimento = new Date(ano, mes, dia)
                aux.dataVencimento.setDate(aux.dataFaturamento.getDate() + (prazo == undefined ? 0 : prazo));
                const year = aux.dataVencimento.getFullYear();
                const month = String(aux.dataVencimento.getMonth() + 1).padStart(2, "0");
                const day = String(aux.dataVencimento.getDate()).padStart(2, "0");
                aux.dataVencimento = year + "-" + month + "-" + day
                console.log(prazoEmDias)
            } else {
                aux.dataVencimento = year + "-" + month + "-" + day
            }
            aux.dataFaturamento = year + "-" + month + "-" + day

            const valueStringFormatter = aux?.valorFaturado.toString();
            aux.valorFaturado = parseFloat(valueStringFormatter.replace(/[^\d,.-]/g, '').replace(',', ''));

            setLoading(true);
            if (props.updatePedidoFaturado) {
                apiFetch
                    .put('/pedido_faturado', aux)
                    .then((data) => {
                        props.setReload(true);
                        showNotification({
                            message: data.data.message,
                            type: 'success',
                            title: data.data.titulo,
                        });
                        setpedidoFaturado({ ...emptyPedidoFaturado })
                        setPrazoEmDias('')
                    })
                    .catch((error) => {
                        console.log(error)
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
                apiFetch
                    .post('/pedido_faturado', aux)
                    .then((data) => {
                        props.setReload(true);
                        showNotification({
                            message: data.data.message,
                            type: 'success',
                            title: data.data.titulo,
                        });
                        setpedidoFaturado({ ...emptyPedidoFaturado })
                        setPrazoEmDias('')
                    })
                    .catch((error) => {
                        console.log(error)
                        showNotification({
                            message: error.response.data.message,
                            type: 'error',
                            title: error.response.data.titulo,
                        });
                    })
                    .finally(() => {
                        setLoading(false);


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
        props.setOpenModal(false);
        setIndustria(undefined)
        setCliente(undefined)
        setpedidoFaturado({ ...emptyPedidoFaturado })
        setPrazoEmDias("")
        props.updatePedidoFaturado = undefined
    }
    useEffect(() => {
        getIndustrias();
        getClientes();
        getOrdens();
        console.log(props.updatePedidoFaturado)
        console.log(pedidoFaturado)
        if (props.updatePedidoFaturado != undefined) {
            var aux: PedidoFaturadoModel = { ...pedidoFaturado }
            pedidoFaturado.dataFaturamento = props.updatePedidoFaturado.dataFaturamento;
            pedidoFaturado.dataVencimento = props.updatePedidoFaturado.dataVencimento;
            pedidoFaturado.id = props.updatePedidoFaturado.id
            pedidoFaturado.notaFiscal = props.updatePedidoFaturado.notaFiscal
            pedidoFaturado.ordemDeCompra = props.updatePedidoFaturado.ordemDeCompra
            pedidoFaturado.valorFaturado = props.updatePedidoFaturado.valorFaturado
            getDays()

        } else {
            setpedidoFaturado({ ...emptyPedidoFaturado });
            setPrazoEmDias('')
        }
    }, [props.openModal]);

    useEffect(() => {
        getOrdens()
    }, [cliente, industria]);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        if (pedidoFaturado != undefined) {
            const { name, value } = e.target as HTMLInputElement;
            console.log(name, value)
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
                <div style={{ border: "1px black solid", padding: "5px" }}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: '#344054',
                        }}
                        display="block"
                    >
                        Filtros
                    </Typography>
                    <div style={{ display: 'grid', gap: 20 }}>
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
                                value={pedidoFaturado?.ordemDeCompra.industria.nome || industria?.nome}
                                renderInput={(params) => {
                                    return <TextField {...params} name="industria" placeholder="Selecione uma Industria" />;
                                }}
                                onSelect={(e: SyntheticEvent<HTMLDivElement, Event>) => {
                                    const { value } = e.target as HTMLInputElement;
                                    const industria: IndustriaModel | undefined = industrias.find((element) => {
                                        return element.nome == value;
                                    });
                                    setIndustria(industria)
                                }}
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
                                value={pedidoFaturado.ordemDeCompra.cliente.nomeFantasia || cliente?.nomeFantasia}
                                renderInput={(params) => <TextField {...params} name="cliente" placeholder="Selecione um Cliente" />}
                                onSelect={(e: SyntheticEvent<HTMLDivElement, Event>) => {
                                    const { value } = e.target as HTMLInputElement;
                                    const cliente: ClienteModel | undefined = clientes.find((element) => {
                                        return element.nomeFantasia == value;
                                    });
                                    setCliente(cliente)
                                }}
                            />
                        </div>

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
                    options={ordensCodigo}
                    value={pedidoFaturado.ordemDeCompra.codigoPedido}
                    fullWidth
                    renderInput={(params) => <TextField {...params} name="idOrdem" placeholder="Selecione uma ordem " />}
                    onSelect={(e: SyntheticEvent<HTMLDivElement, Event>) => {
                        const { value } = e.target as HTMLInputElement;
                        const ordem: OrdemDeCompraModel | undefined = ordens.find((element) => {
                            return element.codigoPedido == value;
                        });
                        if (ordem != undefined) {
                            console.log(pedidoFaturado)
                            setpedidoFaturado({ ...pedidoFaturado, [`ordemDeCompra`]: ordem });
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
                    name="notaFiscal"
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
                            name="dataFaturamento"
                            value={pedidoFaturado?.dataFaturamento}
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
                            value={prazoEmDias}
                            onChange={(e) => setPrazoEmDias(e.target.value)}
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
                    value={pedidoFaturado?.valorFaturado == 0 ? '': pedidoFaturado?.valorFaturado} 
                    name="valorFaturado"
                    onChange={handleChange}
                    maskOptions={undefined}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={ChangeModalState} variant="contained">
                    Cancelar
                </Button>
                <Button variant="contained" onClick={onSubmit}>
                    {props.updatePedidoFaturado == undefined ? 'Cadastrar' : 'Atualizar '}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default RegisterModal;
