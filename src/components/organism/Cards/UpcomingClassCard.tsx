import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { Clock, Devices, Video } from "iconsax-reactjs";
import type { TestProps } from "../../../types";

export default function UpcomingClassCard({ test }: { test: TestProps }) {
    const theme = useTheme();
    console.log(test)

    return (
        <Box
            className="test__card rounded-md p-4 w-full"
            sx={{
                border: `1px solid ${theme.palette.seperator.dark}`,
            }}
        >
            <div className="test__card__top flex gap-3">
                <Box className="w-full flex justify-between items-center">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                            <IconButton color="primary" sx={{
                                backgroundColor: theme.palette.button.light,
                                height: "48px",
                                width: "48px"
                            }}>
                                <Devices size={20} />
                            </IconButton>
                            <div className="flex flex-col gap-0.5">
                                <Typography
                                    variant="textBase"
                                    fontWeight={400}
                                    color="text.dark"
                                >
                                    Test 1
                                </Typography>
                                <Typography
                                    variant="textSm"
                                    fontWeight={400}
                                    color="text.secondary"
                                >
                                    Prof. Saugat Maharjan
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <Typography
                        color="text.main"
                        bgcolor={"button.light"}
                        variant="textSm"
                        p={"2px 8px"}
                        borderRadius={0.5}
                    >
                        Live
                    </Typography>
                </Box>
            </div>
            <Box className="flex justify-between items-center my-3.5">
                <Typography
                    variant="textBase"
                    fontWeight={500}
                    color="text.secondary"
                    className="inline-flex gap-0.5 items-center"
                >
                    <span><Clock size={20} color={theme.palette.text.dark} /></span> 10:00 AM - 11:30 AM
                </Typography>
                <Typography
                    variant="textSm"
                    fontWeight={500}
                    color="text.secondary"
                >
                    45 students active
                </Typography>
            </Box>

            <Button
                variant="text"
                size="small"
                sx={{
                    fontSize: "16px",
                    fontWeight: 600,
                    bgcolor: theme.palette.button.light,
                }}
                className="mt-4"
                fullWidth
                startIcon={<Video size={20} />}
            >
                Join Class
            </Button>
        </Box>
    );
}
