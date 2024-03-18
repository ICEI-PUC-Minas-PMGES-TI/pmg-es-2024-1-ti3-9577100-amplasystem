import { AuthProvider } from './context/AuthContext.tsx';
import RouterRoutes from './routes/Routes.tsx';
import { NotificationProvider } from './context/NotificationContext.tsx';

function App() {
    return (
        <NotificationProvider>
            <AuthProvider>
                <RouterRoutes />
            </AuthProvider>
        </NotificationProvider>
    );
}

export default App;
