import React, { Suspense } from 'react';
import { Navigate, Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ProtectedRoute from '../routes/ProtectedRoutes';
import { DashboardLayout } from '../layouts/DashboardLayout.tsx';
import IndustriaPage from '../pages/industrias/Industria.tsx';

const DashboardPage = React.lazy(() => import('../pages/dashboard/Dashboard'));
const VendedoresPage = React.lazy(() => import('../pages/vendedores/Vendedores'));
const LoginPage = React.lazy(() => import('../pages/login/LoginPage'));
const ForgotPasswordGetEmail = React.lazy(() => import('../pages/forgotPassword/ForgotPasswordGetEmail'));
const ForgotPasswordGetNewPassword = React.lazy(() => import('../pages/forgotPassword/ForgotPasswordGetNewPassword.tsx'));
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
