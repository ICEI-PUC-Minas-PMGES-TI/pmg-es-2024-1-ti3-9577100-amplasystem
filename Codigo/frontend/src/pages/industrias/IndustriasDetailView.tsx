import { IndustriaModel } from '@/models/IndustriaModel';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Grid, Stack } from '@mui/material';
import { Box } from 'lucide-react';
import { Email } from '@mui/icons-material';
import CallIcon from '@mui/icons-material/Call';
import PersonIcon from '@mui/icons-material/Person';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
interface IndustriasDetailViewInterface {
    industria: IndustriaModel;
    handleClose: () => void;
    open: boolean;
}

export const IndustriasDetailView = ({ industria, handleClose, open }: IndustriasDetailViewInterface) => {
    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));

    return (
        <BootstrapDialog
            fullWidth
            maxWidth={'sm'}
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <DialogTitle sx={{ m: 0, p: 2, textAlign: 'center' }} id="customized-dialog-title">
                <Typography variant="h4" color="text.primary">
                    {industria.nome}
                </Typography>
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <div className="grid grid-cols-2 gap-y-8 justify-items-center ">
                    {industria.contatos.map((contato) => {
                        return (
                            <div>
                                <Typography variant="h4" color="text.primary">
                                    {contato.tipoContato}
                                </Typography>
                                <Typography variant="subtitle1" color="text.primary">
                                    <PersonIcon /> {contato.nome}
                                </Typography>
                                <Typography variant="subtitle1" color="text.primary">
                                    <CallIcon /> {contato.telefone}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    color="text.primary"
                                    onClick={() => window.open(`mailto:${contato.email}?subject=Ampla System!`)}
                                >
                                    <Email /> {contato.email}{' '}
                                </Typography>
                            </div>
                        );
                    })}
                </div>
                {industria.contatos.length < 1 ? (
                    <div className="grid grid-cols-1 gap-y-8 justify-items-center ">
                        <Typography variant="h6" color="text.primary">
                            Nenhum contato cadastrado
                        </Typography>
                    </div>
                ) : (
                    ''
                )}
            </DialogContent>
        </BootstrapDialog>
    );
};
