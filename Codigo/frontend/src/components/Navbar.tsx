import * as React from 'react';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useAuth } from '@/hooks/useAuth.ts';

interface INavBar {
    setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
    openSideBar: boolean;
}

const StyledMenu = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: theme.shape.borderRadius,
        minWidth: 200,
        boxShadow: 'rgb(0 0 0 / 20%) 0px 4px 12px',
        padding: theme.spacing(1),
        marginTop: theme.spacing(4), // Distância do topo
    },
}));

export default function PrimarySearchAppBar(props: INavBar) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);
    const [logoutDialogOpen, setLogoutDialogOpen] = React.useState(false);

    const { user, logout } = useAuth();

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (
        event: React.MouseEvent<HTMLElement>
    ) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (
        event: React.MouseEvent<HTMLElement>
    ) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const openLogoutDialog = () => {
        setLogoutDialogOpen(true);
        handleMenuClose();
    };

    const closeLogoutDialog = () => {
        setLogoutDialogOpen(false);
    };

    const confirmLogout = () => {
        logout();
        closeLogoutDialog();
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <StyledMenu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <Box display="flex" alignItems="center" mb={2}>
                <Avatar sx={{ mr: 1 }}>
                    {user.email ? user.email.charAt(0).toUpperCase() : ''}
                </Avatar>
                <Box>
                    <Typography variant="body1">{user.email}</Typography>
                </Box>
            </Box>
            <MenuItem onClick={openLogoutDialog}>
                <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                Desconectar
            </MenuItem>
        </StyledMenu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <StyledMenu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircleIcon />
                </IconButton>
                <Typography>Perfil</Typography>
            </MenuItem>
        </StyledMenu>
    );

    return (
        <Box>
            <AppBar position="sticky" color="secondary">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={() => {
                            props.setOpenSideBar(!props.openSideBar);
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        <span className="font-base font-sans">Ampla</span>
                        <span className="font-light font-sans tracking-tight">
                            System
                        </span>
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircleIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            <Dialog
                open={logoutDialogOpen}
                onClose={closeLogoutDialog}
            >
                <DialogTitle>Confirmar Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Você tem certeza que deseja desconectar?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="error" variant="outlined" onClick={closeLogoutDialog}>Cancelar</Button>
                    <Button color="error" onClick={confirmLogout}>Confirmar</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
