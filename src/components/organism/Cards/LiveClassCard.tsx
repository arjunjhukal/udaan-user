import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { Clock, Devices } from "iconsax-reactjs";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PATH } from "../../../routes/PATH";
import type { LiveClassProps } from "../../../types/liveClass";
import { getTime } from "../../../utils/formatTime";
import ZoomMeetingModal from "./ZoomMeetingModal";

export default function LiveClassCard({ data, courseId }: { data: LiveClassProps; courseId?: number; }) {
    const theme = useTheme();
    const { id } = useParams();
    const navigate = useNavigate();
    const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);

    const canJoinLive = () => {
        if (!data.start_time) return false;

        const startTime = new Date(data.start_time).getTime();
        const now = Date.now();

        return now >= startTime - 2 * 60 * 1000;
    };


    console.log({
        nowLocal: new Date().toString(),
        startLocal: new Date(data.start_time).toString(),
        canJoin: canJoinLive(),
    });

    const startTimeLabel = getTime(data.start_time);


    const handleJoinClass = () => {
        navigate(PATH.COURSE_MANAGEMENT.COURSES.JOIN_LIVE.ROOT(Number(courseId ? courseId : id), Number(data?.id)))
    };
    return (
        <>
            <Box
                className="test__card rounded-md p-4 w-full"
                sx={{
                    border: `1px solid ${theme.palette.separator.dark}`,
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
                                        variant="subtitle1"
                                        fontWeight={400}
                                        color="text.dark"
                                    >
                                        {data.name}
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
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
                            className={` status ${data?.status}`}
                            variant="subtitle2"
                            p={"2px 8px"}
                            borderRadius={0.5}
                        >
                            {data?.status}
                        </Typography>
                    </Box>
                </div>
                <Box className="flex justify-between items-center my-3.5">
                    <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        className="inline-flex gap-0.5 items-center"
                    >
                        <span><Clock size={18} color={theme.palette.text.dark} /></span> {getTime(data.start_time)} - {getTime(data.end_time)}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        color="text.secondary"
                    >
                        {data?.active_students} students active
                    </Typography>
                </Box>

                {/* <Button
                    variant={data?.status === "upcoming" ? "text" : "contained"}
                    size="small"
                    color={data?.status === "upcoming" ? "inherit" : "primary"}
                    className="mt-4"
                    fullWidth
                    sx={{
                        backgroundColor: data?.status === "upcoming" ? "button.light" : "button.main",
                        fontWeight: 500,
                        fontSize: "16px",
                    }}
                    startIcon={
                        data?.status === "upcoming" ? (
                            <NotificationBing size={24} />
                        ) : null
                    }
                    onClick={data?.status === "ongoing" ? handleJoinClass : () => { }}
                    disabled={data?.status === "ended"}

                >
                    {data?.status === "upcoming" && "Remind Me"}
                    {data?.status === "ongoing" && "Join Live"}
                    {data?.status === "ended" && "Class Already Ended"}

                </Button> */}
                <Button
                    variant={data.status === "ongoing" && canJoinLive() ? "contained" : "text"}
                    size="small"
                    color={data.status === "ongoing" && canJoinLive() ? "primary" : "inherit"}
                    className="mt-4"
                    fullWidth
                    sx={{
                        backgroundColor:
                            data.status === "ongoing" && canJoinLive()
                                ? "button.main"
                                : "button.light",
                        fontWeight: 500,
                        fontSize: "16px",
                    }}
                    startIcon={
                        data.status === "upcoming" ? <Clock size={20} /> : null
                    }
                    onClick={
                        data.status === "ongoing" && canJoinLive()
                            ? handleJoinClass
                            : undefined
                    }
                    disabled={
                        data.status === "ended" ||
                        (data.status === "ongoing" && !canJoinLive())
                    }
                >
                    {data.status === "upcoming" &&
                        `Class starts at ${startTimeLabel}`}

                    {data.status === "ongoing" &&
                        (canJoinLive()
                            ? "Join Live"
                            : `Join available at ${startTimeLabel}`)}

                    {data.status === "ended" && "Class Already Ended"}
                </Button>

            </Box>
            <ZoomMeetingModal
                open={isZoomModalOpen}
                onClose={() => setIsZoomModalOpen(false)}
                meetingData={data}
            />
        </>

    );
}
