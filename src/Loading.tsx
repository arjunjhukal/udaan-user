// Loading.tsx
import { Box, CircularProgress, Skeleton, Stack, Toolbar } from '@mui/material';

const drawerWidth = 356;

export default function Loading() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                sx={{
                    position: 'fixed',
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                    padding: '20px 24px',
                    backgroundColor: (theme) => theme.palette.background.default,
                    zIndex: 1100,
                }}
            >
                <Toolbar sx={{ px: 3 }}>
                    <Box sx={{ mr: 2, display: { sm: 'none' } }}>
                        <Skeleton variant="circular" width={44} height={44} />
                    </Box>

                    <Stack
                        sx={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}
                    >
                        {/* Search Bar */}
                        <Skeleton
                            variant="rectangular"
                            width={300}
                            height={44}
                            sx={{ borderRadius: '8px' }}
                        />

                        {/* Right Side Icons */}
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Skeleton variant="circular" width={44} height={44} />
                            <Skeleton variant="circular" width={44} height={44} />
                            <Skeleton variant="circular" width={44} height={44} />
                            <Skeleton variant="circular" width={44} height={44} />
                        </Box>
                    </Stack>
                </Toolbar>
            </Box>

            {/* Sidebar Shimmer */}
            <Box
                component="nav"
                sx={{
                    width: { sm: drawerWidth },
                    flexShrink: { sm: 0 },
                }}
            >
                <Box
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        position: 'fixed',
                        height: '100vh',
                        width: drawerWidth,
                        borderRight: (theme) => `1px solid ${theme.palette.divider}`,
                        backgroundColor: (theme) => theme.palette.background.sidebar,
                    }}
                >
                    <Box sx={{ padding: '0 32px 32px' }}>
                        {/* Logo Skeleton */}
                        <Toolbar
                            sx={{
                                padding: '32px 32px 56px',
                                justifyContent: 'center',
                            }}
                        >
                            <Skeleton
                                variant="rectangular"
                                width={137}
                                height={73}
                                sx={{ borderRadius: '8px' }}
                            />
                        </Toolbar>

                        {/* Main Menu Section */}
                        <Box sx={{ mb: 4 }}>
                            {/* Section Title */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <Skeleton variant="text" width={60} height={20} />
                                <Skeleton variant="rectangular" width="100%" height={1} />
                            </Box>

                            {/* Menu Items */}
                            <Stack spacing={1}>
                                {[1, 2, 3].map((item) => (
                                    <Box
                                        key={`main-${item}`}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                            padding: '12px 16px',
                                            borderRadius: '8px',
                                        }}
                                    >
                                        <Skeleton variant="circular" width={20} height={20} />
                                        <Skeleton variant="text" width="70%" height={24} />
                                    </Box>
                                ))}
                            </Stack>
                        </Box>

                        {/* Learning Menu Section */}
                        <Box>
                            {/* Section Title */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <Skeleton variant="text" width={80} height={20} />
                                <Skeleton variant="rectangular" width="100%" height={1} />
                            </Box>

                            {/* Menu Items */}
                            <Stack spacing={1}>
                                {[1, 2, 3].map((item) => (
                                    <Box
                                        key={`learning-${item}`}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                            padding: '12px 16px',
                                            borderRadius: '8px',
                                        }}
                                    >
                                        <Skeleton variant="circular" width={20} height={20} />
                                        <Skeleton variant="text" width="60%" height={24} />
                                    </Box>
                                ))}
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Main Content Area */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    padding: '32px 24px',
                }}
            >
                <Toolbar sx={{ height: 100 }} />
                <Box
                    sx={{
                        background: (theme) => theme.palette.primary.contrastText,
                        height: 'calc(100vh - 165px)',
                        borderRadius: '16px',
                        overflow: 'auto',
                        padding: '32px',
                    }}
                    className="flex justify-center items-center"
                >
                    {/* Main Content Shimmer */}
                    <Box sx={{ padding: '24px' }} className="h-full w-full">
                        <Box className="flex justify-center items-center">
                            <CircularProgress color='primary' />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}