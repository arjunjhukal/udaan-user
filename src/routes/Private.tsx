import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { PATH } from './PATH';
import ResponsiveDrawer from '../components/pages/layout/sidebar';

export default function Private() {
    const navigate = useNavigate();
    const user = "arjun";
    React.useEffect(() => {
        if (!user) {
            navigate(PATH.AUTH.LOGIN.ROOT);
        }
    }, [user, navigate]);


    if (!user) return null;
    return (

        <div className='udaan__root'>
            <ResponsiveDrawer >
                <Outlet />
            </ResponsiveDrawer>
        </div>
    );
}
