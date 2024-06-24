import { Suspense, lazy } from "react";
import {
  Navigate,
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";
import LoginPage from "@/pages/LoginPage.tsx";
import DashboardLayout from "@/layouts/DashboardLayout.tsx";
import { StyledEngineProvider, CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import "@fontsource/ibm-plex-sans";
import "@fontsource/ibm-plex-mono";
import "@fontsource/ibm-plex-serif";
import "@/styles/global.css";

import customTheme from "@/styles/themes/customTheme";
import LoadingComponent from "@/components/common/LoadingComponent";

const ClientesPage = lazy(() => import("@/pages/ClientesPage"));
const VendedoresPage = lazy(() => import("@/pages/VendedoresPage"));
const DadosFinanceirosPage = lazy(
  () => import("@/pages/financas/DadosFinanceirosPage")
);
const OrdensDeCompraPage = lazy(
  () => import("@/pages/financas/OrdensDeCompraPage")
);
const PedidosFaturadosPage = lazy(
  () => import("@/pages/financas/PedidosFaturadosPage")
);
const IndustriasPage = lazy(() => import("@/pages/IndustriasPage"));
const isAuthenticated = true;

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <CssVarsProvider theme={customTheme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />

            {isAuthenticated ?
              <Route path="/" element={<DashboardLayout />}>
                <Route
                  path="vendedores"
                  element={
                    <Suspense fallback={<LoadingComponent />}>
                      <VendedoresPage />
                    </Suspense>
                  }
                />
                <Route
                  path="clientes"
                  element={
                    <Suspense fallback={<LoadingComponent />}>
                      <ClientesPage />
                    </Suspense>
                  }
                />
                <Route
                  path="financas/dados-financeiros"
                  element={
                    <Suspense fallback={<LoadingComponent />}>
                      <DadosFinanceirosPage />
                    </Suspense>
                  }
                />
                <Route
                  path="financas/ordens-de-compra"
                  element={
                    <Suspense fallback={<LoadingComponent />}>
                      <OrdensDeCompraPage />
                    </Suspense>
                  }
                />
                <Route
                  path="financas/pedidos-faturados"
                  element={
                    <Suspense fallback={<LoadingComponent />}>
                      <PedidosFaturadosPage />
                    </Suspense>
                  }
                />
                <Route
                  path="industrias"
                  element={
                    <Suspense fallback={<LoadingComponent />}>
                      <IndustriasPage />
                    </Suspense>
                  }
                />
              </Route>
              : <Navigate to="/login" />
            }
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </CssVarsProvider>
    </StyledEngineProvider>
  );
};

export default App;
