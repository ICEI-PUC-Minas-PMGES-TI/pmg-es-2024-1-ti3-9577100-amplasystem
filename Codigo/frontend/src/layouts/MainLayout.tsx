import { Outlet } from 'react-router-dom';
import Header from '../layouts/Header';
import { Suspense } from 'react';
import CustomLoader from '../lib/loader';

export default function Layout() {
    return (
        <>
            <Header />
            <Suspense fallback={<CustomLoader />}>
                <Outlet />
            </Suspense>
        </>
    );
}
