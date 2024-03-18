import Grid from '@mui/material/Grid';
import Aside from '../components/Aside';
import { Box, width } from '@mui/system';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <Box
            sx={{
                display: 'flex',
            }}
        >
            <Aside />

            <main style={{ width: '100%', padding: '20px' }}>{children}</main>
        </Box>
    );
};
