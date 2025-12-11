import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import * as React from "react";

import { useMediaQuery, useTheme } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import CustomAppbar from "../appbar";
import PrimaryMenu from "./PrimaryMenu";


interface Props {
    window?: () => Window;
    children: React.ReactNode;
}

export default function ResponsiveDrawer(props: Props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const theme = useTheme();
    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const drawer = (
        <div>
            <Toolbar
                sx={{
                    padding: {
                        xs: "16px 16px 32px",
                        md: "32px 32px 56px",
                    },
                    justifyContent: "center",
                }}>
                <Link to={"/"}>
                    <img src="/logo-light.svg" alt="" width={137} height={73} />
                </Link>
            </Toolbar>
            <PrimaryMenu />
        </div>
    );

    // Remove this const when copying and pasting into your project.
    const container =
        window !== undefined ? () => window().document.body : undefined;

    const isLargeScreen = useMediaQuery("(min-width:1440px)");
    const drawerWidth = isLargeScreen ? 356 : 320;
    return (
        <Box sx={{ display: "flex" }}>
            <CustomAppbar handleDrawerToggle={handleDrawerToggle} />
            <Box
                component="nav"
                sx={{ width: { lg: drawerWidth }, flexShrink: { md: 0 } }}
                aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    sx={{
                        display: { sm: "block", lg: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                            backgroundColor: (theme) => theme.palette.background.sidebar,
                        },
                    }}
                    slotProps={{
                        root: {
                            keepMounted: true,
                        },
                    }}>
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", lg: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                            backgroundColor: (theme) => theme.palette.background.sidebar,
                        },
                    }}
                    open>
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: { lg: `calc(100% - ${drawerWidth}px)`, padding: "32px 24px" },
                }}>
                <Toolbar sx={{ height: 100 }} />
                <Box className="content p-4 lg:px-8 lg:py-8 rounded-2xl overflow-y-auto flex flex-col" sx={{
                    background: theme.palette.primary.contrastText,
                    height: "calc(100vh - 165px)"

                }}>
                    {props.children}
                </Box>
            </Box>
        </Box>
    );
}
