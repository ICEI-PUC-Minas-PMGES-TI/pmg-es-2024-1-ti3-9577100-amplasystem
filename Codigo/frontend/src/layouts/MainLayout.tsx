import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Backdrop from '@mui/material/Backdrop/Backdrop';

export default function Layout() {
    return (
        <>
            {/*<Header />*/}
            <Suspense fallback={
            <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}/>
            
            }>
                {/* TODO: add a custom load => <Suspense fallback={<></> <CustomLoader />}>*/}
                <Outlet />
            </Suspense>
        </>
    );
}
