import {
    Box,
    Button,
    ClickAwayListener,
    List,
    ListItem,
    Paper,
    Popper,
    Typography,
    useTheme
} from "@mui/material";
import { ArrowDown2 } from "iconsax-reactjs";
import { useRef, useState } from "react";

interface TabOption<T> {
    label: string;
    value: T;
}

interface TabControllerProps<T> {
    options?: TabOption<T>[];
    setActiveTab: (value: T) => void;
    currentActive: T;
}

export default function TabController<T extends string | number>({
    setActiveTab,
    currentActive,
    options = []
}: TabControllerProps<T>) {

    const theme = useTheme();

    const anchorRef = useRef<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState(false);

    const handleToggle = () => setOpen((prev) => !prev);
    const handleClose = () => setOpen(false);

    const activeLabel =
        options.find((opt) => opt.value === currentActive)?.label || "";

    return (
        <>
            {/* Desktop */}
            <List
                sx={{
                    background: theme.palette.tab.background,
                    display: { xs: "none", lg: "flex" },
                }}
                className="p-1! rounded-md max-w-fit flex items-center"
            >
                {options.map((tab) => (
                    <ListItem
                        key={tab.value}
                        onClick={() => setActiveTab(tab.value)}
                        className={
                            currentActive === tab.value ? "active__tab__controller" : ""
                        }
                    >
                        <Typography
                            variant="subtitle2"
                            color="text.middle"
                            className="px-6 py-2 rounded-md cursor-pointer text-nowrap"
                        >
                            {tab.label}
                        </Typography>
                    </ListItem>
                ))}
            </List>

            {/* Mobile */}
            <Box sx={{ display: { xs: "block", lg: "none" } }}>
                <Button
                    ref={anchorRef}
                    onClick={handleToggle}
                    fullWidth
                    sx={{ background: theme.palette.tab.background }}
                >
                    <Typography variant="subtitle2" color="text.middle">
                        {activeLabel}
                    </Typography>
                    <ArrowDown2 size={18} />
                </Button>

                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    placement="bottom-start"
                    style={{ zIndex: 1200 }}
                >
                    <ClickAwayListener onClickAway={handleClose}>
                        <Paper
                            sx={{
                                mt: 1,
                                background: theme.palette.tab.background,
                                borderRadius: 2,
                                overflow: "hidden",
                                minWidth: anchorRef.current?.offsetWidth,
                            }}
                        >
                            {options.map((tab) => (
                                <Box
                                    key={tab.value}
                                    onClick={() => {
                                        setActiveTab(tab.value);
                                        handleClose();
                                    }}
                                    sx={{
                                        px: 2,
                                        py: 1,
                                        cursor: "pointer",
                                        background:
                                            currentActive === tab.value
                                                ? theme.palette.action.hover
                                                : "transparent",
                                        "&:hover": { background: theme.palette.action.hover },
                                    }}
                                >
                                    <Typography variant="subtitle2" color="text.middle">
                                        {tab.label}
                                    </Typography>
                                </Box>
                            ))}
                        </Paper>
                    </ClickAwayListener>
                </Popper>
            </Box>
        </>
    );
}
