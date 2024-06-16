import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage.tsx';
import DashboardLayout from '@/layouts/DashboardLayout.tsx';

const ClientesPage = lazy(() => import('@/pages/ClientesPage'));
const VendedoresPage = lazy(() => import('@/pages/VendedoresPage'));

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route path="vendedores" element={
            <Suspense fallback={<div>Loading...</div>}>
              <VendedoresPage />
            </Suspense>
          } />
          <Route path="clientes" element={
            <Suspense fallback={<div>Loading...</div>}>
              <ClientesPage />
            </Suspense>
          } />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;