import { Dialog, DialogContent } from '@mui/material'
import { GoogleLogin } from '@react-oauth/google'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import ResponsiveDrawer from '../components/pages/layout/sidebar'

export default function RootLayout() {
    const [open, setOpen] = useState(true);
    return (
        <div className='udaan__root'>
            <ResponsiveDrawer >
                <Outlet />
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogContent>
                        <GoogleLogin
                            onSuccess={credentialResponse => console.log(credentialResponse)}
                            onError={() => console.log('Login Failed')}
                        />
                    </DialogContent>
                </Dialog>
            </ResponsiveDrawer>
        </div>
    )
}
