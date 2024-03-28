/* eslint-disable */
// eslint-disable-next-line prettier/prettier

import Grid from '@mui/material/Grid';
import Sidebar, { SidebarItem } from '../components/Sidebar';
import { Box, width } from '@mui/system';
import { Calendar, Flag, Home, Layers, LayoutDashboard, LifeBuoy, Settings, StickyNote } from 'lucide-react';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <Box display={'flex'}>
            <Sidebar>
                <SidebarItem icon={<Home size={20}/>} text="Home" alert/>
                <SidebarItem icon={<LayoutDashboard size={20}/>} text="Dashboard" active/>
                <SidebarItem icon={<StickyNote size={20}/>} text="Projects" alert/>
                <SidebarItem icon={<Calendar size={20}/>} text="Calendar"/>
                <SidebarItem icon={<Layers size={20}/>} text="Tasks" />
                <SidebarItem icon={<Flag size={20}/>} text="Reporting" />
                <hr className="my-3"/>
                <SidebarItem icon={<Settings size={20}/>} text="Settings" />
                <SidebarItem icon={<LifeBuoy size={20}/>} text="Help" />
            </Sidebar>
            <main style={{ width: '90%', margin: '20px', maxHeight: '100vh' }}>{children}</main>
        </Box>
    );
};
