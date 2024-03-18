import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

export default function Layout() {
    return (
        <>
            {/*<Header />*/}
            <Suspense fallback={<></>}>
                {/* TODO: add a custom load => <Suspense fallback={<></> <CustomLoader />}>*/}
                <Outlet />
            </Suspense>
        </>
    );
}
