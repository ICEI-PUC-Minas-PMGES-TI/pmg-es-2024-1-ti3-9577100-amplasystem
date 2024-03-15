import React, { Suspense } from 'react';
import { Navigate, Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ProtectedRoute from '../routes/ProtectedRoutes';

const DashboardPage = React.lazy(() => import('../pages/dashboard/Dashboard'));
const LoginPage = React.lazy(() => import('../pages/login/LoginPage'));

const RouterRoutes = () => {
    return (
        <Router>
            {/* TODO: Add a loader component */}
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<DashboardPage />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default RouterRoutes;
