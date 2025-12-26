import ResponsiveDrawer from '../components/pages/layout/sidebar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='udaan__root'>
            <ResponsiveDrawer >
                {children}
            </ResponsiveDrawer>
        </div>
    )
}
