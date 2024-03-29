// import { Dashboard } from '@mui/icons-material';

import { useAuth } from '../../hooks/useAuth.ts';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();
    console.log(user, isAuthenticated);
    return (
        <div>
            <h1>Dashboard Page</h1>
            <p>Autenticado: {isAuthenticated ? 'Sim' : 'Não'}</p>
            <p>Usuário: {user?.email}</p>
            <button onClick={() => logout()}>Logout</button>
            <button onClick={() => navigate('/dashboard')}>Dashboard</button>
            <button onClick={() => navigate('/vendedores')}>Vendedores</button>
        </div>
    );
};

export default DashboardPage;
