// import { Dashboard } from '@mui/icons-material';

import { Typography } from '@mui/material';
import { useAuth } from '../../hooks/useAuth.ts';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const DashboardPage = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();
    console.log(user, isAuthenticated);
    return (
        <>
            <header className="mb-5">
                <Typography>Dashboard Page</Typography>
                <Typography>Autenticado: {isAuthenticated ? 'Sim' : 'Não'}</Typography>
                <Typography>Usuário: {user?.email}</Typography>
            </header>
            <div className="flex gap-2">
                <Button onClick={logout}>Logout</Button>
                <Button onClick={() => navigate('/dashboard')}>Dashboard</Button>
                <Button onClick={() => navigate('/vendedores')}>Vendedores</Button>
            </div>
        </>
    );
};

export default DashboardPage;
