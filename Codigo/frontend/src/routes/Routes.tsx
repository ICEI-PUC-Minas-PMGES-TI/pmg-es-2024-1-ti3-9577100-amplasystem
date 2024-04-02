import React, { Suspense } from 'react';
import { Navigate, Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ProtectedRoute from '@/routes/ProtectedRoutes';
import { DashboardLayout } from '@/layouts/DashboardLayout.tsx';

const FinanceiroPage = React.lazy(() => import('@/pages/financeiro/Financeiro.tsx'));
const IndustriaPage = React.lazy(() => import('@/pages/industrias/IndustriaPage.tsx'));
const DashboardPage = React.lazy(() => import('@/pages/dashboard/DashboardPage.tsx'));
const VendedoresPage = React.lazy(() => import('@/pages/vendedores/VendedoresPage.tsx'));
const ClientesPage = React.lazy(() => import('@/pages/clientes/Clientes'));
const LoginPage = React.lazy(() => import('@/pages/login/LoginPage'));
const ForgotPasswordGetEmail = React.lazy(() => import('@/pages/forgotPassword/ForgotPasswordGetEmail'));
const ForgotPasswordGetNewPassword = React.lazy(() => import('@/pages/forgotPassword/ForgotPasswordGetNewPassword.tsx'));
const RouterRoutes = () => {
    return (
        <Router>
            {/* TODO: Add a loader component */}
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route element={<ProtectedRoute />}>
                        <Route
                            path="/dashboard"
                            element={
                                <DashboardLayout>
                                    <DashboardPage />
                                </DashboardLayout>
                            }
                        />
                        <Route
                            path="/vendedores"
                            element={
                                <DashboardLayout>
                                    <VendedoresPage />
                                </DashboardLayout>
                            }
                        />
                        <Route
                            path="/industrias"
                            element={
                                <DashboardLayout>
                                    <IndustriaPage />
                                </DashboardLayout>
                            }
                        />
                        <Route
                            path="/clientes"
                            element={
                                <DashboardLayout>
                                    <ClientesPage />
                                </DashboardLayout>
                            }
                        />
                        <Route
                            path="/financeiro"
                            element={
                                <DashboardLayout>
                                    <FinanceiroPage />
                                </DashboardLayout>
                            }
                        />
                    </Route>
                    <Route path="*" element={<Navigate to="/login" replace />} />
                    <Route>
                        <Route path="/forgotPassword/email" element={<ForgotPasswordGetEmail />} />
                        <Route path="/forgotPassword/token" element={<ForgotPasswordGetNewPassword />} />
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    );
};

export default RouterRoutes;
