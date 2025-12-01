import {
    AppBar,
    Box,
    IconButton,
    Stack,
    Toolbar,
    useTheme
} from "@mui/material";
import { HamburgerMenu, Notification, Sms } from "iconsax-reactjs";
import ProfileMenu from "./Profile";
import SettingMenu from "./Setting";
const drawerWidth = 356;

export default function CustomAppbar({
    handleDrawerToggle,
}: {
    handleDrawerToggle: () => void;
}) {
    const theme = useTheme();

    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: 0,
                padding: " 20px 24px",
                backgroundColor: (theme) => theme.palette.background.default,
            }}
            color="default"
            elevation={0}
        >
            <Toolbar sx={{ px: 3 }}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: "none" }, minHeight: "44px" }}
                >
                    <HamburgerMenu />
                </IconButton>
                <Stack
                    sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "end",
                        width: "100%",
                    }}
                >
                    {/* <OutlinedInput
                        placeholder="Search"
                        name="search"
                        id="search"
                        startAdornment={<SearchNormal color="text.middle" />}
                        sx={{
                            gap: "8px",
                        }}

                    /> */}

                    <Box className="flex gap-4">
                        <IconButton
                            sx={{
                                background: theme.palette.seperator.dark,
                                minWidth: "44px",
                            }}
                        >
                            <Notification />
                        </IconButton>
                        <IconButton
                            sx={{
                                background: theme.palette.seperator.dark,
                                minWidth: "44px",
                            }}
                        >
                            <Sms />
                        </IconButton>

                        <SettingMenu />
                        <ProfileMenu />
                    </Box>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
