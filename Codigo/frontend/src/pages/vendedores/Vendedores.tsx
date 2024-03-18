import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
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

import { PaletteMode, TableContainer } from '@mui/material';

const currentMode: PaletteMode = 'dark';
const primaryColor = 'rgb(102, 157, 246)';
// const secondaryColor = 'rgb(71, 98, 130)';
const backgroundColor = 'rgb(5, 30, 52)';

export default function CustomizedList() {
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();
    return <div />;
}
