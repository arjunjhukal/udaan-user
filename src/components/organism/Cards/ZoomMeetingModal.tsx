import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    IconButton,
    Typography
} from "@mui/material";
import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded";
import { CloseCircle } from "iconsax-reactjs";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../store/hook";
import type { LiveClassProps } from "../../../types/liveClass";

interface ZoomMeetingModalProps {
    open: boolean;
    onClose: () => void;
    meetingData: LiveClassProps;
}

export default function ZoomMeetingModal({
    open,
    onClose,
    meetingData,
}: ZoomMeetingModalProps) {
    const zoomContainerRef = useRef<HTMLDivElement>(null);
    const clientRef = useRef<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isMeetingJoined, setIsMeetingJoined] = useState(false);

    // Get token at the component level
    const token = useAppSelector((state) => state.auth.token);

    useEffect(() => {
        if (open && !isMeetingJoined) {
            initializeZoom();
        }

        return () => {
            // Cleanup on unmount
            cleanupMeeting();
        };
    }, [open]);

    const initializeZoom = async () => {
        try {
            setIsLoading(true);
            setError(null);

            // Extract meeting details
            const meetingNumber = extractMeetingNumber(meetingData.start_url);
            const password = extractPassword(meetingData.start_url);

            console.log("Meeting Number:", meetingNumber);
            console.log("Password:", password ? "***" : "No password");

            if (!meetingNumber) {
                throw new Error("Invalid meeting URL");
            }

            // Get user information
            const userName = getUserName();
            const userEmail = getUserEmail();

            console.log("User Name:", userName);
            console.log("User Email:", userEmail);

            // Get SDK Key from environment
            const sdkKey = import.meta.env.VITE_ZOOM_MEETING_SDK_SECRET;

            if (!sdkKey) {
                throw new Error("Zoom SDK Key not configured");
            }

            console.log("SDK Key:", sdkKey ? "Present" : "Missing");

            // Generate signature from backend
            const signature = await generateSignature(meetingNumber, 0);

            console.log("Signature received:", signature ? "Present" : "Missing");
            console.log("Signature type:", typeof signature);

            if (!signature || typeof signature !== 'string') {
                throw new Error("Invalid signature received from server");
            }

            // Create client if not exists
            if (!clientRef.current) {
                clientRef.current = ZoomMtgEmbedded.createClient();
            }

            // Initialize the SDK
            if (zoomContainerRef.current) {
                await clientRef.current.init({
                    zoomAppRoot: zoomContainerRef.current,
                    language: "en-US",
                    patchJsMedia: true,
                    leaveOnPageUnload: false,
                });

                // Join the meeting
                await clientRef.current.join({
                    sdkKey: sdkKey,
                    signature: signature,
                    meetingNumber: meetingNumber,
                    password: password || "",
                    userName: userName,
                    userEmail: userEmail || "",
                    tk: "", // registrant token (if registration required)
                    zak: "", // ZAK token (if starting meeting as host)
                });

                setIsMeetingJoined(true);
                setIsLoading(false);

                console.log("Successfully joined meeting:", meetingNumber);
            }
        } catch (err: any) {
            console.error("Error initializing Zoom:", err);
            setError(err.message || "Failed to join meeting. Please try again.");
            setIsLoading(false);
        }
    };

    const extractMeetingNumber = (url: string): string => {
        try {
            // Handle various Zoom URL formats
            // Format 1: https://us05web.zoom.us/j/86280680069?pwd=...
            // Format 2: https://zoom.us/j/86280680069
            const match = url.match(/\/j\/(\d+)/);
            return match ? match[1] : "";
        } catch (err) {
            console.error("Error extracting meeting number:", err);
            return "";
        }
    };

    const extractPassword = (url: string): string => {
        try {
            const urlObj = new URL(url);
            const pwd = urlObj.searchParams.get("pwd");
            return pwd || "";
        } catch (err) {
            console.error("Error extracting password:", err);
            return "";
        }
    };

    const getUserName = (): string => {
        // TODO: Replace with your actual auth context
        // Example:
        // const { user } = useAuth();
        // return user?.name || "Student";

        // For now, get from localStorage or use default
        return localStorage.getItem("userName") ||
            localStorage.getItem("user_name") ||
            "Student";
    };

    const getUserEmail = (): string => {
        // TODO: Replace with your actual auth context
        // Example:
        // const { user } = useAuth();
        // return user?.email || "";

        // For now, get from localStorage
        return localStorage.getItem("userEmail") ||
            localStorage.getItem("user_email") ||
            "";
    };

    const generateSignature = async (
        meetingNumber: string,
        role: number
    ): Promise<string> => {
        try {
            console.log("Generating signature for meeting:", meetingNumber);
            console.log("Token available:", token ? "Yes" : "No");

            const response = await fetch(`https://app.makuralms.site/api/v1/zoom/signature`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token?.access_token}`
                },
                body: JSON.stringify({
                    meeting_id: Number(meetingNumber),
                    role,
                }),
            });

            console.log("Response status:", response.status);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
                console.error("Signature API error:", errorData);
                throw new Error(errorData.error || "Failed to generate signature");
            }

            const data = await response.json();
            console.log("Signature response data:", data.data.signature);

            if (!data.data.signature) {
                throw new Error("No signature in response");
            }

            return data.data.signature;
        } catch (err: any) {
            console.error("Error generating signature:", err);
            throw new Error("Unable to connect to meeting service. Please check your connection.");
        }
    };

    const cleanupMeeting = () => {
        if (clientRef.current && isMeetingJoined) {
            try {
                clientRef.current.leaveMeeting();
                clientRef.current = null;
                setIsMeetingJoined(false);
            } catch (err) {
                console.error("Error cleaning up meeting:", err);
            }
        }
    };

    const handleClose = () => {
        cleanupMeeting();
        setIsLoading(true);
        setError(null);
        onClose();
    };

    const handleRetry = () => {
        setError(null);
        initializeZoom();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={false}
            fullWidth
            PaperProps={{
                sx: {
                    height: "95vh",
                    maxHeight: "95vh",
                    width: "95vw",
                    maxWidth: "95vw",
                    m: { xs: 1, sm: 2 },
                    borderRadius: 2,
                },
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    borderBottom: 1,
                    borderColor: "divider",
                    backgroundColor: "background.paper",
                }}
            >
                <Box>
                    <Typography variant="h6" fontWeight={600}>
                        {meetingData.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {meetingData.teachers?.map((t) => t.name).join(", ")}
                    </Typography>
                </Box>
                <IconButton
                    onClick={handleClose}
                    size="small"
                    sx={{
                        '&:hover': {
                            backgroundColor: 'action.hover',
                        }
                    }}
                >
                    <CloseCircle size={24} />
                </IconButton>
            </Box>

            {/* Content */}
            <DialogContent sx={{ p: 0, height: "100%", position: "relative", overflow: "hidden" }}>
                {/* Loading State */}
                {isLoading && !error && (
                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "background.default",
                            zIndex: 1000,
                        }}
                    >
                        <CircularProgress size={60} thickness={4} />
                        <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
                            Joining Meeting...
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Please wait while we connect you
                        </Typography>
                    </Box>
                )}

                {/* Error State */}
                {error && (
                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "background.default",
                            zIndex: 1000,
                            p: 3,
                        }}
                    >
                        <Box
                            sx={{
                                width: 80,
                                height: 80,
                                borderRadius: "50%",
                                backgroundColor: "error.light",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                mb: 3,
                            }}
                        >
                            <Typography variant="h3" color="error.main">
                                ⚠️
                            </Typography>
                        </Box>
                        <Typography variant="h6" color="error.main" gutterBottom>
                            Unable to Join Meeting
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            textAlign="center"
                            sx={{ maxWidth: 400, mb: 3 }}
                        >
                            {error}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={handleClose}
                                size="large"
                            >
                                Close
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleRetry}
                                size="large"
                            >
                                Try Again
                            </Button>
                        </Box>
                    </Box>
                )}

                {/* Zoom Meeting Container */}
                <Box
                    ref={zoomContainerRef}
                    id="meetingSDKElement"
                    sx={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#000",
                        display: (isLoading || error) ? "none" : "block",
                    }}
                />
            </DialogContent>
        </Dialog>
    );
}