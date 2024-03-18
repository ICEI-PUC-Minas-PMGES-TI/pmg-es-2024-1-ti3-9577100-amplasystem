import { useAuth } from '../../hooks/useAuth.ts';
import { useNavigate } from 'react-router-dom';

const VendedoresPage = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    // console.log(user, isAuthenticated);
    console.log(user, isAuthenticated);
    const { logout } = useAuth();
    return (
        <div>
            <h1>Vendedores Page</h1>
            <p>Autenticado: {isAuthenticated ? 'Sim' : 'Não'}</p>
            <p>Usuário: {user?.email}</p>
            <button onClick={() => logout()}>Logout</button>
            <button onClick={() => navigate('/dashboard')}>Dashboard</button>
            <button onClick={() => navigate('/vendedores')}>Vendedores</button>
        </div>
    );
};

export default VendedoresPage;
