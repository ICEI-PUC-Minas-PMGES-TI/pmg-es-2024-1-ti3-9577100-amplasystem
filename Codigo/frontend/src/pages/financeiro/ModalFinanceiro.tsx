/* eslint-disable */
import React, { useState, useEffect } from 'react';

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

import { FinanceiroModel } from '@/models/FinanceiroModel';

interface FinanceiroModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: FinanceiroModel) => void;
    financeiro?: FinanceiroModel;
    industrias: string[];
}

const FinanceiroModal: React.FC<FinanceiroModalProps> = ({ open, onClose, onSave, financeiro, industrias }) => {
    const [comissao, setComissao] = useState<string>('');
    const [faturamento, setFaturamento] = useState<string>('');
    const [tipoFiscal, setTipoFiscal] = useState<string>('');
    const [industria, setIndustria] = useState<string>('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (financeiro) {
            setComissao(financeiro.comissao.toString());
            setFaturamento(financeiro.faturamento);
            setTipoFiscal(financeiro.tipoFiscal);
            setIndustria(financeiro.industria);
        } else {
            setComissao('');
            setFaturamento('');
            setTipoFiscal('');
            setIndustria('');
        }
    }, [financeiro]);

    const handleSave = async () => {
        if (!comissao || !faturamento || !tipoFiscal || !industria) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        setLoading(true);
        try {
            const newFinanceiro: FinanceiroModel = {
                id: financeiro ? financeiro.id : 0,
                comissao: parseFloat(comissao),
                faturamento,
                tipoFiscal,
                industria,
            };
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
                    value={comissao}
                    onChange={(e) => setComissao(e.target.value)}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Faturamento"
                    value={faturamento}
                    onChange={(e) => setFaturamento(e.target.value)}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Tipo Fiscal</InputLabel>
                    <Select value={tipoFiscal} onChange={(e) => setTipoFiscal(e.target.value as string)}>
                        <MenuItem value="representação">Representação</MenuItem>
                        <MenuItem value="promoção de vendas">Promoção de Vendas</MenuItem>
                    </Select>
                </FormControl>
                {industrias && (
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Indústria</InputLabel>
                        <Select value={industria} onChange={(e) => setIndustria(e.target.value as string)}>
                            {industrias.map((industria) => (
                                <MenuItem key={industria} value={industria}>
                                    {industria}
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
