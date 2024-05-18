import React, { useEffect, useState } from 'react';

import { Box } from '@mui/system';
import Dashboard from '@mui/icons-material/Dashboard';
import Handshake from '@mui/icons-material/Handshake';
import Factory from '@mui/icons-material/Factory';
import Person from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Sidebar, { SidebarItem } from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import FactCheckIcon from '@mui/icons-material/FactCheck';
interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const [openNavBar, setOpenNavBar] = useState<boolean>(false);
    const data = [
        { id: 1, icon: <Dashboard />, label: 'Dashboard', location: '/dashboard' },
        { id: 2, icon: <Handshake />, label: 'Vendedor', location: '/vendedores' },
        { id: 4, icon: <Person />, label: 'Cliente', location: '/clientes' },
        { id: 3, icon: <Factory />, label: 'Indústria', location: '/industrias' },
        { id: 5, icon: <AttachMoneyIcon />, label: 'Financeiro', location: '/financeiro' },
        { id: 6, icon: <NoteAddIcon />, label: 'Ordens', location: '/ordem' },
        { id: 7, icon: <FactCheckIcon />, label: 'Pedido', location: '/pedido' },
    ];

    return (
        <Box sx={{ minHeight: '100svh', display: 'flex', flexDirection: 'column' }}>
            <Navbar openSideBar={openNavBar} setOpenSideBar={setOpenNavBar} />
            <Box display={'flex'} sx={{ backgroundColor: '#f3f4f6', flexGrow: 1 }}>
                <Sidebar openSideBar={openNavBar} setOpenSideBar={setOpenNavBar}>
                    {data.map((item) => (
                        <SidebarItem key={item.id} icon={item.icon} text={item.label} location={item.location} />
                    ))}
                </Sidebar>
                <main style={{ width: '100%', margin: '16px' }}>{children}</main>
            </Box>
        </Box>
    );
};
