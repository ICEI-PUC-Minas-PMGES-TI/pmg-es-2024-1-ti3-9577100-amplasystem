import * as React from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowRight from '@mui/icons-material/ArrowRight';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Home from '@mui/icons-material/Home';
import Settings from '@mui/icons-material/Settings';
import Dashboard from '@mui/icons-material/Dashboard';
import Handshake from '@mui/icons-material/Handshake';
import Factory from '@mui/icons-material/Factory';
import { useNavigate } from 'react-router-dom';
import { PaletteMode } from '@mui/material';

const currentMode: PaletteMode = 'dark';
const primaryColor = 'rgb(102, 157, 246)';
// const secondaryColor = 'rgb(71, 98, 130)';
const backgroundColor = 'rgb(5, 30, 52)';

const data = [
    { icon: <Dashboard />, label: 'Dashboard', location: '/dashboard' },
    { icon: <Handshake />, label: 'Vendedor', location: '/vendedores' },
    { icon: <Factory />, label: 'Indústria', location: '/industrias' },
];

const FireNav = styled(List)<{ component?: React.ElementType }>({
    '& .MuiListItemButton-root': {
        paddingLeft: 24,
        paddingRight: 24,
    },
    '& .MuiListItemIcon-root': {
        minWidth: 0,
        marginRight: 16,
    },
    '& .MuiSvgIcon-root': {
        fontSize: 20,
    },
});

export const Aside = () => {
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();
    return (
        <Box sx={{ display: 'flex', height: '100svh', borderRadiusTopEnd: '50px', borderRadius: 0 }}>
            <ThemeProvider
                theme={createTheme({
                    // components: {
                    //     MuiListItemButton: {
                    //         defaultProps: {
                    //             disableTouchRipple: true,
                    //         },
                    //     },
                    // },
                    palette: {
                        mode: currentMode,
                        primary: { main: primaryColor },
                        background: { paper: backgroundColor },
                    },
                })}
            >
                <Paper elevation={0} sx={{ maxWidth: 256, borderRadiusTopEnd: '50px', borderRadius: 0 }}>
                    <FireNav component="nav" disablePadding>
                        <ListItemButton component="a" href="#customized-list">
                            <ListItemIcon sx={{ fontSize: 20 }}>🐙</ListItemIcon>
                            <ListItemText
                                sx={{ my: 0 }}
                                primary="Amplasystem"
                                primaryTypographyProps={{
                                    fontSize: 20,
                                    fontWeight: 'medium',
                                    letterSpacing: 0,
                                }}
                            />
                        </ListItemButton>
                        <Divider />
                        <ListItem component="div" disablePadding>
                            <ListItemButton sx={{ height: 56 }}>
                                <ListItemIcon>
                                    <Home color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Project Overview"
                                    primaryTypographyProps={{
                                        color: 'primary',
                                        fontWeight: 'medium',
                                        variant: 'body2',
                                    }}
                                />
                            </ListItemButton>
                            <Tooltip title="Project Settings">
                                <IconButton
                                    size="large"
                                    sx={{
                                        '& svg': {
                                            color: 'rgba(255,255,255,0.8)',
                                            transition: '0.2s',
                                            transform: 'translateX(0) rotate(0)',
                                        },
                                        '&:hover, &:focus': {
                                            bgcolor: 'unset',
                                            '& svg:first-of-type': {
                                                transform: 'translateX(-4px) rotate(-20deg)',
                                            },
                                            '& svg:last-of-type': {
                                                right: 0,
                                                opacity: 1,
                                            },
                                        },
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            height: '80%',
                                            display: 'block',
                                            left: 0,
                                            width: '1px',
                                            bgcolor: 'divider',
                                        },
                                    }}
                                >
                                    <Settings />
                                    <ArrowRight sx={{ position: 'absolute', right: 4, opacity: 0 }} />
                                </IconButton>
                            </Tooltip>
                        </ListItem>
                        <Divider />
                        <Box
                            sx={{
                                bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null,
                                pb: open ? 2 : 0,
                                height: '100%',
                            }}
                        >
                            <ListItemButton
                                alignItems="flex-start"
                                onClick={() => setOpen(!open)}
                                sx={{
                                    px: 3,
                                    pt: 2.5,
                                    pb: open ? 0 : 2.5,
                                    '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
                                }}
                            >
                                <ListItemText
                                    primary="Build"
                                    primaryTypographyProps={{
                                        fontSize: 15,
                                        fontWeight: 'medium',
                                        lineHeight: '20px',
                                        mb: '2px',
                                    }}
                                    secondary="Authentication, Firestore Database, Realtime Database, Storage, Hosting, Functions, and Machine Learning"
                                    secondaryTypographyProps={{
                                        noWrap: true,
                                        fontSize: 12,
                                        lineHeight: '16px',
                                        color: open ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                                    }}
                                    sx={{ my: 0 }}
                                />
                                <KeyboardArrowDown
                                    sx={{
                                        mr: -1,
                                        opacity: 0,
                                        transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                                        transition: '0.2s',
                                    }}
                                />
                            </ListItemButton>
                            {open &&
                                data.map((item) => (
                                    <ListItemButton
                                        key={item.label}
                                        sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                                        onClick={() => navigate(item.location)}
                                    >
                                        <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                                        <ListItemText
                                            primary={item.label}
                                            primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                                        />
                                    </ListItemButton>
                                ))}
                        </Box>
                    </FireNav>
                </Paper>
            </ThemeProvider>
        </Box>
    );
};

export default Aside;
