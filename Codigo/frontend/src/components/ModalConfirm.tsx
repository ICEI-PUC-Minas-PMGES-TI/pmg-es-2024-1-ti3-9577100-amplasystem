import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FC } from 'react';

interface ModalConfirmProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    message: string;
    onConfirm: () => void;
    confirmButtonText?: string;
    cancelButtonText?: string;

    onCancel?: () => void;
}

/*
 * Example usage:
    const [open, setOpen] = React.useState(false);
    <ModalConfirm
        open={open}
        setOpen={setOpen}
        message="Are you sure you want to delete this item?"
        onConfirm={() => {
            // call function to confirm
            // deleteItem();
            setOpen(false);
        }}
    />
 *
 * */
const ModalConfirm: FC<ModalConfirmProps> = ({
    open,
    setOpen,
    message,
    confirmButtonText = 'Confirmar',
    onConfirm,
    cancelButtonText = 'Cancelar',
    onCancel,
}) => {
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="confirm-modal-title"
            aria-describedby="confirm-modal-description"
        >
            <DialogTitle id="confirm-modal-title">{"Use Google's location service?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="confirm-modal-description">
                    Let Google help apps determine location. This means sending anonymous location data to Google, even
                    when no apps are running.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => (onCancel ? onCancel() : setOpen(false))}>{cancelButtonText}</Button>
                <Button onClick={onConfirm} autoFocus>
                    {confirmButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalConfirm;
