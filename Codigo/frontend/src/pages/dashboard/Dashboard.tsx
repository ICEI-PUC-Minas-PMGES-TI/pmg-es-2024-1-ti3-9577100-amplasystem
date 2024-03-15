import { useAuth } from '../../hooks/useAuth.ts';

const DashboardPage = () => {
    const { user, isAuthenticated } = useAuth();
    // console.log(user, isAuthenticated);
    console.log(user, isAuthenticated);
    const { logout } = useAuth();
    return (
        <div>
            <h1>Dashboard Page</h1>
            <p>Autenticado: {isAuthenticated ? 'Sim' : 'Não'}</p>
            <p>Usuário: {user?.email}</p>
            <button onClick={() => logout()}>Logout</button>
        </div>
    );
};

export default DashboardPage;
