import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage.tsx';
import DashboardLayout from '@/layouts/DashboardLayout.tsx';
import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import '@fontsource/ibm-plex-sans';
import '@fontsource/ibm-plex-mono';
import '@fontsource/ibm-plex-serif';
import '@/styles/global.css';

import customTheme from '@/styles/themes/customTheme';

const ClientesPage = lazy(() => import('@/pages/ClientesPage'));
const VendedoresPage = lazy(() => import('@/pages/VendedoresPage'));

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <CssVarsProvider theme={customTheme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />

            <Route path='/' element={<DashboardLayout />}>
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
      </CssVarsProvider>
    </StyledEngineProvider>
  );
}

export default App;