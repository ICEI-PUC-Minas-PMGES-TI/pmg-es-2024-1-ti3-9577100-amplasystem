import React, { Suspense } from 'react';
import { Navigate, Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ProtectedRoute from '../routes/ProtectedRoutes';
import { DashboardLayout } from '../layouts/DashboardLayout.tsx';

const DashboardPage = React.lazy(() => import('../pages/dashboard/Dashboard'));
const LoginPage = React.lazy(() => import('../pages/login/LoginPage'));
const ForgotPasswordGetEmail = React.lazy(() => import('../pages/forgotPassword/forgotPasswordGetEmail'));
const ForgotPasswordGetNewPassword = React.lazy(() => import('../pages/forgotPassword/forgotPasswordGetNewPassword'));
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
