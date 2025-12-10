import {
    Box,
    ClickAwayListener,
    Grow,
    List,
    Paper,
    Popper,
    useTheme
} from "@mui/material";
import {
    Notification
} from "iconsax-reactjs";
import React, { useRef, useState } from "react";
import { useGetAllNotificationsQuery } from "../../../../services/notification";

export default function NotificationModal() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [qp, setQp] = useState({
        pageIndex: 1,
        pageSize: 10,
    })
    const anchorRef = useRef<HTMLDivElement | null>(null);
    const handleToggle = () => setOpen((prev) => !prev);

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) return;
        setOpen(false);
    };

    const { data, isLoading } = useGetAllNotificationsQuery(qp);

    console.log({ data, isLoading })
    return (
        <>
            {/* Settings Button */}
            <Box
                ref={anchorRef}
                onClick={handleToggle}
                sx={{
                    background: theme.palette.seperator.dark,
                    minWidth: "44px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    borderRadius: "50%",
                    "&:hover": { backgroundColor: theme.palette.action.hover },
                }}
            >
                <Notification variant="Bold" color={theme.palette.seperator.darkest} />
            </Box>

            {/* Popper */}
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                placement="bottom-end"
                disablePortal
                sx={{ zIndex: 10 }}
            >
                {({ TransitionProps }) => (
                    <Grow {...TransitionProps}>
                        <Paper elevation={3}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <List className="min-w-[521px] p-2!">

                                </List>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    )
}
