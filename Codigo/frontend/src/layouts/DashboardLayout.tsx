/* eslint-disable */
// prettier-ignore
import React from 'react';
import { Box } from '@mui/system';
import Sidebar, { SidebarItem } from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Dashboard from '@mui/icons-material/Dashboard';
import Handshake from '@mui/icons-material/Handshake';
import Factory from '@mui/icons-material/Factory';
import Person from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const data = [
        { id: 1, icon: <Dashboard />, label: 'Dashboard', location: '/dashboard' },
        { id: 2, icon: <Handshake />, label: 'Vendedor', location: '/vendedores' },
        { id: 3, icon: <Factory />, label: 'Indústria', location: '/industrias' },
        { id: 4, icon: <Person />, label: 'Cliente', location: '/clientes' },
        { id: 5, icon: <AttachMoneyIcon />, label: 'Financeiro', location: '/financeiro' },
    ];
    

    return (
        <Box>
            <Navbar />
            <Box display={'flex'} sx={{ height: '100vh' }}>
                <Sidebar>
                    {data.map((item) => (
                        <SidebarItem key={item.id} icon={item.icon} text={item.label} location={item.location} />
                    ))}
                </Sidebar>

                <main style={{ width: '100%', margin: '20px', maxHeight: '100vh', overflow: 'auto' }}>{children}</main>
            </Box>
        </Box>
    );
};
