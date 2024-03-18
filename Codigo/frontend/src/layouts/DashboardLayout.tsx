import { useAuth } from '../hooks/useAuth.ts';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const DashboardLayout = () => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    console.log(params);
    console.log(location);
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

export default DashboardLayout;
