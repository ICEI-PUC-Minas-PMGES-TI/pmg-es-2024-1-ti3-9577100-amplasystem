/* eslint-disable */
import React, { useState, useEffect, ChangeEvent, Dispatch, SetStateAction } from 'react';
import {
    TextField,
    Button,
    CircularProgress,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    SelectChangeEvent
} from '@mui/material';
import { FinanceiroModel } from 'models/FinanceiroModel';
import { IndustriaModel } from '@/models/IndustriaModel';
import apiFetch from '@/services/api';
import { useNotification } from '@/hooks/useNotification';
interface FinanceiroModalProps {
    open: boolean;
    onClose: () => void;
    setTableLoading: Dispatch<SetStateAction<boolean>>;
    financeiro?: FinanceiroModel;
    industrias: IndustriaModel[];
}

const FinanceiroModal: React.FC<FinanceiroModalProps> = ({
    open,
    onClose,
    setTableLoading,
    financeiro,
    industrias,
}) => {
    const [newFinanceiro, setNewFinanceiro] = useState<FinanceiroModel>();
    const [loading, setLoading] = useState(false);
    const { showNotification } = useNotification();

    // TODO: Criar funcao para select
    // function handleChange(e: SelectChangeEvent<number>) {
    function handleChange(e: any) {
        if (newFinanceiro != undefined) {
            const { name, value } = e.target as HTMLInputElement;
            if (name == 'comissao') {
                setNewFinanceiro({ ...newFinanceiro, [name]: parseFloat(value) });
            } else if (name == 'industria') {

                let industriaSetada = industrias.find((element) => {
                    return element.id = Number(value)
                });

                setNewFinanceiro({
                    ...newFinanceiro, [name]: industriaSetada || {
                        id: null,
                        nome: '',
                        contatos: []
                    }
                });
            } else {
                setNewFinanceiro({ ...newFinanceiro, [name]: value });
            }
            console.log(newFinanceiro);
        }
    }
    useEffect(() => {
        if (financeiro != undefined) {
            setNewFinanceiro(financeiro);
            console.log(industrias);
            console.log(financeiro);
        } else {
            setNewFinanceiro({
                id: null,
                comissao: 0,
                tipoFiscal: '',
                tipoPagamento: '',
                industria: {
                    id: null,
                    nome: '',
                    contatos: []
                }
            });
        }
    }, [financeiro]);
    document.getElementById('sistema-organico');
    const handleSave = async () => {
        if (
            !newFinanceiro?.comissao ||
            !newFinanceiro?.tipoPagamento ||
            !newFinanceiro?.tipoFiscal ||
            !newFinanceiro?.industria
        ) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        setLoading(true);
        try {
            if (financeiro != undefined) {
                await updateFinanceiro();
            } else {
                await postFinanceiro();
            }
        } catch (error) {
            console.error('Erro ao salvar:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;
    const postFinanceiro = async () => {
        try {
            console.log(newFinanceiro);
            const res = await apiFetch.post('/financeiro', newFinanceiro);
            showNotification({
                message: res.data.message,
                title: res.data.titulo,
                type: 'success',
            });
        } catch (err) {
            console.log(err);
        } finally {
            setTableLoading(true);
        }
    };

    const updateFinanceiro = async () => {
        try {
            if (newFinanceiro && newFinanceiro.id) {
                const res = await apiFetch.put(`/financeiro/${newFinanceiro.id}`, newFinanceiro);
                showNotification({
                    message: res.data.message,
                    title: res.data.titulo,
                    type: 'success',
                });
            }
        } catch (err) {
            console.log(err);
        } finally {
            setTableLoading(true);
        }
    };
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth={true}
            maxWidth={'sm'}
            PaperProps={{
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                },
            }}
        >
            <DialogTitle>{financeiro ? 'Editar Financeiro' : 'Novo Financeiro'} </DialogTitle>
            <DialogContent>
                <CircularProgress
                    sx={{
                        visibility: loading ? 'visible' : 'hidden',
                        position: 'absolute',
                        top: '40%',
                        left: '45%',
                    }}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Comissão"
                    name="comissao"
                    type="number"
                    value={newFinanceiro?.comissao || ''}
                    onChange={handleChange}
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel id="tipo-pagamento-label">Tipo Pagamento</InputLabel>
                    <Select
                        labelId="tipo-pagamento-label"
                        value={newFinanceiro?.tipoPagamento || ''}
                        name="tipoPagamento"
                        label="Tipo Pagamento"
                        onChange={handleChange}
                    >
                        <MenuItem value="Faturamento">Faturamento</MenuItem>
                        <MenuItem value="Liquidez">Liquidez</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel id="tipo-fiscal-label">Tipo Fiscal</InputLabel>
                    <Select
                        labelId="tipo-fiscal-label"
                        value={newFinanceiro?.tipoFiscal || ''}
                        name="tipoFiscal"
                        label="Tipo Fiscal"
                        onChange={handleChange}
                    >
                        <MenuItem value="REPRESENTACAO">Representação</MenuItem>
                        <MenuItem value="PROMOCAO_DE_VENDAS">Promoção de Vendas</MenuItem>
                    </Select>
                </FormControl>

                {industrias && (
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="industria-label">Indústria</InputLabel>
                        <Select
                            labelId="industria-label"
                            value={newFinanceiro?.industria.id || ''}
                            name="industria"
                            label="Indústria"
                            onChange={handleChange}
                        >
                            {industrias.map((industria) => (
                                industria.id != null ? <MenuItem value={industria.id} key={industria.id} >
                                {industria.nome}
                            </MenuItem>:""
                            ))}
                        </Select>
                    </FormControl>
                )}

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave}>Salvar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default FinanceiroModal;
