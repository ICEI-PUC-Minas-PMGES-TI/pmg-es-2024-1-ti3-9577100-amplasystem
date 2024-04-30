import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

interface DeleteConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={onConfirm} color="error">
                    Excluir
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmationModal;
