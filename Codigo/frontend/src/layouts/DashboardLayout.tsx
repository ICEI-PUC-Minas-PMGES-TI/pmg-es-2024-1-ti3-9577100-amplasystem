import Grid from '@mui/material/Grid';
import Aside from '../components/Aside';
import { Box, width } from '@mui/system';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <Box display={'flex'}>
            <Aside />

            <main style={{ width: '90%', margin: '20px', maxHeight: '100vh' }}>{children}</main>
        </Box>
    );
};
