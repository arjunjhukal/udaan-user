import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { Clock, Devices, NotificationBing } from "iconsax-reactjs";
import type { LiveClassProps } from "../../../types/liveClass";
import { getTime } from "../../../utils/formatDate";
import { getStatus } from "../../../utils/getStatus";

export default function LiveClassCard({ data }: { data: LiveClassProps }) {
    const theme = useTheme();
    console.log(data);

    const status = getStatus(data.start_time, data.end_time);
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
                                    {data?.teachers?.map((teacher) => teacher.name)}
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <Typography
                        color="text.middle"
                        className={` status ${status}`}
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
                    variant="textSm"
                    color="text.secondary"
                    className="inline-flex gap-0.5 items-center"
                >
                    <span><Clock size={18} color={theme.palette.text.dark} /></span> {getTime(data.start_time)} - {getTime(data.end_time)}
                </Typography>
                <Typography
                    variant="textSm"
                    color="text.secondary"
                >
                    {data?.active_students} students active
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
                LinkComponent={"a"}
                href={data?.join_url}
                target="_blank"
            >
                {status === "upcoming" && "Remind Me"}
                {status === "ongoing" && "Join Live"}
                {status === "past" && "Class Already Ended"}

            </Button>
        </Box>
    );
}
