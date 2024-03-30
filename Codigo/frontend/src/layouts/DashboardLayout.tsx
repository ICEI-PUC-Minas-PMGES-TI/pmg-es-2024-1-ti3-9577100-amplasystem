import { Box } from '@mui/system';
import Sidebar, { SidebarItem } from '../components/Sidebar';
import Dashboard from '@mui/icons-material/Dashboard';
import Handshake from '@mui/icons-material/Handshake';
import Factory from '@mui/icons-material/Factory';
interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const data = [
        { icon: <Dashboard />, label: 'Dashboard', location: '/dashboard' },
        { icon: <Handshake />, label: 'Vendedor', location: '/vendedores' },
        { icon: <Factory />, label: 'Indústria', location: '/industrias' },
    ];

    return (
        <Box display={'flex'} sx={{ height: '100svh' }}>
            <Sidebar>
                {data.map((item) => (
                    <SidebarItem icon={item.icon} text={item.label} location={item.location} />
                ))}
            </Sidebar>

            <main style={{ width: '100%', margin: '20px', maxHeight: '100vh' }}>{children}</main>
        </Box>
    );
};
