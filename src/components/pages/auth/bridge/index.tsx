import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PATH } from "../../../../routes/PATH";
import { useAuthBridgeMutation } from "../../../../services/authApi";
import { setCredentials } from "../../../../slice/authSlice";
import { showToast } from "../../../../slice/toastSlice";
import { useAppDispatch } from "../../../../store/hook";

export default function AuthBridge() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const [loginViaOneTimeToken] = useAuthBridgeMutation();

    useEffect(() => {
        const oneTimeToken = searchParams.get("one_time_token");
        const courseId = Number(searchParams.get("course_id"));
        const liveId = Number(searchParams.get("live_id"));

        if (!oneTimeToken) {
            dispatch(
                showToast({
                    message: "Invalid or missing authentication token",
                    severity: "error",
                })
            );
            navigate(PATH.AUTH.LOGIN.ROOT, { replace: true });
            return;
        }

        const verifyToken = async () => {
            try {
                const response = await loginViaOneTimeToken({ one_time_token: oneTimeToken }).unwrap();
                dispatch(setCredentials({
                    token: response?.data?.token,
                    user: response?.data?.user
                }));
                navigate(
                    PATH.COURSE_MANAGEMENT.COURSES.JOIN_LIVE.ROOT(
                        courseId || 0,
                        liveId || 0
                    ),
                    { replace: true }
                );
            } catch (e: any) {
                dispatch(
                    showToast({
                        message: e?.data?.message || "One-time token expired",
                        severity: "error",
                    })
                );
                navigate(PATH.AUTH.LOGIN.ROOT, { replace: true });
            }
        };

        verifyToken();
    }, [dispatch, navigate, searchParams]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={2}
        >
            <CircularProgress />
            <Typography variant="body1" color="text.secondary">
                Verifying your session & redirecting…
            </Typography>
        </Box>
    );
}
