import Grid from '@mui/material/Grid';
import Aside from '../components/Aside';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <Grid container spacing={4}>
            <Grid item>
                <Aside />
            </Grid>
            <Grid item>
                <main>{children}</main>
            </Grid>
        </Grid>
    );
};
