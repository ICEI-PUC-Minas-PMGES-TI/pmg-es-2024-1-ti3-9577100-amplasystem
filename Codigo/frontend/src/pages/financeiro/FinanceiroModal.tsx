/* eslint-disable */
import React, { useState, useEffect, ChangeEvent } from 'react';
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    CircularProgress,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FinanceiroModel } from 'models/FinanceiroModel';
import { IndustriaModel } from '@/models/IndustriaModel';

interface FinanceiroModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: FinanceiroModel) => void;
    financeiro?: FinanceiroModel;
    industrias: IndustriaModel[];
}

const FinanceiroModal: React.FC<FinanceiroModalProps> = ({ open, onClose, onSave, financeiro, industrias }) => {
    const [newFinanceiro, setNewFinanceiro] = useState<FinanceiroModel>()
    const [loading, setLoading] = useState(false);

     function handleChange(e: ChangeEvent<HTMLInputElement>) {
        if (newFinanceiro != undefined) {
            const {name, value} = e.target as HTMLInputElement;
            if (name == "comissao") {
                setNewFinanceiro({ ...newFinanceiro, [name]: parseFloat(value) })
            } else {
                setNewFinanceiro({ ...newFinanceiro, [name]: value });
            }
            console.log(newFinanceiro)
        }
    }
    useEffect(() => {
        if (financeiro != undefined) {
            setNewFinanceiro(financeiro)
            console.log(industrias)
            console.log(financeiro)
        } else {
            setNewFinanceiro({
                id: null,
                comissao: 0.0,
                tipoFiscal: "",
                tipoPagamento: "",
                industria:{}
            })
        }
    },[financeiro])
    const handleSave = async () => {
        if (!newFinanceiro.comissao || !newFinanceiro.tipoPagamento || !newFinanceiro.tipoFiscal || !newFinanceiro.industria) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        setLoading(true);
        try {
            await onSave(newFinanceiro);
        } catch (error) {
            console.error('Erro ao salvar:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    minWidth: 400,
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h5">{financeiro ? 'Editar Financeiro' : 'Novo Financeiro'}</Typography>
                    <CloseIcon onClick={onClose} style={{ cursor: 'pointer' }} />
                </Box>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Comissão"
                    name="comissao"
                    value={financeiro?.comissao}
                    onChange={handleChange}
                />
                 <FormControl fullWidth margin="normal">
                    <InputLabel>Tipo Pagamento</InputLabel>
                    <Select value={financeiro?.tipoPagamento}name="tipoPagamento" onChange={handleChange}>
                        <MenuItem value="Faturamento">Faturamento</MenuItem>
                        <MenuItem value="Liquidez">liquidez</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Tipo Fiscal</InputLabel>
                    <Select value={financeiro?.tipoFiscal} name='tipoFiscal' onChange={handleChange}>
                        <MenuItem value="REPRESENTACAO">Representação</MenuItem>
                        <MenuItem value="PROMOCAO_DE_VENDAS">Promoção de Vendas</MenuItem>
                    </Select>
                </FormControl>
                {industrias && (
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Indústria</InputLabel>
                        <Select value={financeiro?.industria} name='industria' onChange={handleChange}>
                            {industrias.map((industria) => (
                                <MenuItem key={industria.id} value={industria}>
                                    {industria.nome}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
                <Button variant="contained" onClick={handleSave} disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Salvar'}
                </Button>
            </Box>
        </Modal>
    );
};

export default FinanceiroModal;
