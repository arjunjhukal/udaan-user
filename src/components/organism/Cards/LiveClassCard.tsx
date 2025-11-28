import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { Clock, Devices, NotificationBing } from "iconsax-reactjs";
import { getTime } from "../../../utils/formatDate";
import { getStatus } from "../../../utils/getStatus";
import type { LiveClassProps } from "../../pages/CourseManagement/liveClasses/allLiveClass/AllLiveClassList";

export default function LiveClassCard({ data }: { data: LiveClassProps }) {
    const theme = useTheme();
    console.log(data);

    const status = getStatus(data.start_datetime);
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
                                    {data.name}
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
                        color="text.middle"
                        bgcolor={"primary.50"}
                        variant="textSm"
                        p={"2px 8px"}
                        borderRadius={0.5}
                    >
                        {status}
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
                    <span><Clock size={18} color={theme.palette.text.dark} /></span> {getTime(data.start_datetime)} - {getTime(data.end_datetime)}
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
                variant={status === "upcoming" ? "text" : "contained"}
                size="small"
                color={status === "upcoming" ? "inherit" : "primary"}
                className="mt-4"
                fullWidth
                sx={{
                    backgroundColor: status === "upcoming" ? "button.light" : "button.main",
                    fontWeight: 600,
                    fontSize: "16px",
                }}
                startIcon={
                    status === "upcoming" ? (
                        <NotificationBing size={24} />
                    ) : null
                }
            >
                {status === "upcoming" && "Remind Me"}
                {status === "today" && "Start Test"}
            </Button>
        </Box>
    );
}
