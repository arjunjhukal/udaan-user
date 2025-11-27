import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Devices } from "iconsax-reactjs";
import type { TestProps } from "../../../types";

export default function PastClassCard({ test }: { test: TestProps }) {
    console.log(test);
    const theme = useTheme();
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

        </Box>
    );
}
