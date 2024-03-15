import { AuthProvider } from './context/AuthContext.tsx';
import RouterRoutes from './routes/Routes.tsx';

function App() {
    return (
        <AuthProvider>
            <RouterRoutes />
        </AuthProvider>
    );
}

export default App;
