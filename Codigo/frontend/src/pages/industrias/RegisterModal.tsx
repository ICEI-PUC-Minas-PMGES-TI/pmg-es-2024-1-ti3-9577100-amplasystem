import {JSX} from 'react/jsx-runtime';
import {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from 'react';
import CheckIcon from '@mui/icons-material/Check';
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Tab,
    Tabs,
    TextField,
    Typography
} from '@mui/material';

import {TipoContato} from '@/enums/TipoContato';
import {useNotification} from '@/hooks/useNotification';
import {IndustriaModel} from '@/models/IndustriaModel';
import {ContatoModel} from '@/models/ContatoModels';
import IndustriaContato from '@/pages/industrias/IndustriaContato';
import apiFetch from '@/services/api';
import Validade from '@/utils/Validate';

interface IRegisterModalProps {
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    openModal: boolean;
    setReload: Dispatch<SetStateAction<boolean>>;
    updateIndustria: IndustriaModel | undefined;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index} = props;

    return (
        <div
            style={ {width: "100%"} }
            role="tabpanel"
            hidden={ value !== index }
            id={ `vertical-tabpanel-${ index }` }
            aria-labelledby={ `vertical-tab-${ index }` }
        >
            { value === index && (
                <Box sx={ {paddingLeft: 3} }>
                    { children }
                </Box>
            ) }
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${ index }`,
        'aria-controls': `vertical-tabpanel-${ index }`,
    };
}

const RegisterModal = (props: IRegisterModalProps) => {
    const [loading, setLoading] = useState(false);
    const tiposContatos = Object.values(TipoContato);
    const {showNotification} = useNotification();
    const [reset, setRest] = useState<boolean>(false);
    const [contatoList, setContatoList] = useState<JSX.Element[]>([]);
    const [industria, setIndustria] = useState<IndustriaModel | undefined>(props.updateIndustria);
    const validade = new Validade();
    const handleClose = () => {
        props.setOpenModal(false);
    };


    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        if (industria != undefined) {
            const {name, value} = e.target as HTMLInputElement;
            setIndustria({...industria, [name]: value});
        }
    }

    function handleChangeContato(contato: ContatoModel, index: number) {
        const aux: IndustriaModel | undefined = industria;
        if (aux != undefined) {
            aux.contatos[index] = contato;
            setIndustria(aux);
            console.log(contato)
        }
    }

    useEffect(() => {
        setIndustria(props.updateIndustria);

    }, [props.updateIndustria]);


    useEffect(() => {
        const aux2: JSX.Element[] = [];
        console.log("eu estodasdasu tenteando");
        industria?.contatos.map((element, index) => {
            console.log("eu estou tenteando");
            aux2.push(
                <IndustriaContato
                    key={ element.tipoContato }
                    contatoModel={element}
                    preenchido ={ element.nome != "" && element.email != "" && element.telefone != ""}
                    index={ index }
                    handleChange={ handleChangeContato }
                    reset={ reset }
                />,
            );
        });
        setContatoList(aux2);
    }, [handleChangeContato])
    useEffect(() => {
        if (industria == undefined || reset) {
            setIndustria({
                id: null,
                nome: '',
                contatos: [
                    {
                        id: null,
                        nome: '',
                        tipoContato: TipoContato.Comercial,
                        telefone: '',
                        email: '',
                    },
                    {
                        id: null,
                        nome: '',
                        tipoContato: TipoContato.Financeiro,
                        telefone: '',
                        email: '',
                    },
                    {
                        id: null,
                        nome: '',
                        tipoContato: TipoContato.Pagamento,
                        telefone: '',
                        email: '',
                    },
                    {
                        id: null,
                        nome: '',
                        tipoContato: TipoContato.Logistica,
                        telefone: '',
                        email: '',
                    },
                ],
            });
            setRest(!reset);
        } else if (industria?.contatos.length < 4) {
            const tiposCadastrados: Array<TipoContato> = new Array<TipoContato>();
            const aux = industria;
            aux.contatos.map((element) => {
                tiposCadastrados.push(element.tipoContato);
            });
            tiposContatos.map((tipo) => {
                if (tiposCadastrados.indexOf(tipo) == -1) {
                    console.log(tipo);
                    aux.contatos.push({
                        nome: '',
                        email: '',
                        id: null,
                        tipoContato: tipo,
                        telefone: '',
                    });
                }
            });
            setIndustria(aux);
        }

    }, [props.updateIndustria, reset]);


    function onSubmit() {
        const obj: IndustriaModel = JSON.parse(JSON.stringify(industria));
        obj.contatos = obj.contatos.filter((contato) => contato.nome != '');
        let wasInvalidEmail = false;
        let wasInvalidCellphoneNumber = false;
        obj.contatos.map((contato) => {
            wasInvalidEmail = !validade.validateEmail(contato.email);
            wasInvalidCellphoneNumber = !validade.validateCellphone(contato.telefone);
        });
        if (wasInvalidEmail) {
            showNotification({
                message: 'confira os emails informados ',
                type: 'error',
                title: 'Emails inválidos',
            });
        } else if (wasInvalidCellphoneNumber) {
            showNotification({
                message: 'confira os telefones informados ',
                type: 'error',
                title: 'Telefones inválidos',
            });
        } else {
            if (props.updateIndustria == undefined) {
                setLoading(true);
                apiFetch
                    .post('industria/', obj)
                    .then((data) => {
                        props.setReload(true);
                        showNotification({
                            message: data.data.message,
                            type: 'success',
                            title: data.data.titulo,
                        });
                        setRest(true);
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
                console.log(obj);
                apiFetch
                    .put(`industria/`, obj)
                    .then((data) => {
                        props.setReload(true);
                        showNotification({message: data.data.message, type: 'success', title: data.data.titulo});
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
        }
    }

    const [value, setValue] = useState(0);

    const changeTab = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Dialog
            open={ props.openModal }
            onClose={ handleClose }
            fullWidth={ true }
            maxWidth={ "md" }
            PaperProps={ {
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                },
            } }
        >

            <DialogTitle>{ props.updateIndustria == undefined ? 'Adicionar industria' : 'Atualizar ' + props?.updateIndustria?.nome } </DialogTitle>
            <DialogContent>
                <CircularProgress
                    sx={ {
                        visibility: loading ? 'visible' : 'hidden',
                        position: 'absolute',
                        top: '40%',
                        left: '45%',
                    } }
                />
                <DialogContentText>{ props.updateIndustria == undefined ? 'Criação' : 'Edição' } de
                    industria</DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="nome"
                    name="nome"
                    label="Nome fantasia"
                    fullWidth
                    value={ industria?.nome }
                    onChange={ handleChange }

                />
                <Typography variant={ 'h6' }>Contatos</Typography>
                <Box
                    sx={ {flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224} }
                >
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={ value }
                        onChange={ changeTab }
                        aria-label="Vertical tabs example"
                        sx={ {borderRight: 1, borderColor: 'divider'} }
                    >
                        {contatoList.map((element, index) => {
                           
                            return <Tab icon={element.props.preenchido ? <CheckIcon sx={{ p: 0, height:1}} /> : ""} iconPosition="start" label={element.key} {...a11yProps(index)} sx={{
                                pt: 0,
                                pb:0
                            }} />
                        }) }

                    </Tabs>
                    { contatoList.map((element, index) => {
                        return <TabPanel value={ value } index={ index }>
                            { element }
                        </TabPanel>
                    }) }

                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={ handleClose }>Cancel</Button>
                <Button onClick={ onSubmit }>Salvar</Button>
            </DialogActions>
        </Dialog>
    );
};
export default RegisterModal;
