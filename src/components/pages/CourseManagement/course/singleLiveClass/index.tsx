// import {
//     Alert,
//     AlertTitle,
//     Box,
//     Button,
//     CircularProgress,
//     Typography,
// } from "@mui/material";
// import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded";
// import { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useGetMeetingSignatureMutation, useGetSingleLiveClassQuery } from "../../../../../services/courseApi";
// import { useAppSelector } from "../../../../../store/hook";

// type MeetingStatus = "not_started" | "loading" | "joined" | "error" | "ended";

// export default function SingleLiveClassRoot() {
//     const { courseId, liveId } = useParams();
//     const zoomContainerRef = useRef<HTMLDivElement>(null);
//     const clientRef = useRef<any>(null);
//     const [meetingStatus, setMeetingStatus] = useState<MeetingStatus>("loading");
//     const [error, setError] = useState<string | null>(null);


//     const user = useAppSelector((state) => state.auth.user);
//     const { data: liveClassData, isLoading: isLoadingLiveClass } = useGetSingleLiveClassQuery({
//         courseId: Number(courseId),
//         liveId: Number(liveId),
//     });

//     const [generateSignature, { isLoading: isGeneratingSignature }] = useGetMeetingSignatureMutation();

//     const meetingData = liveClassData?.data;

//     useEffect(() => {
//         if (meetingData && meetingStatus === "loading") {
//             checkMeetingStatus();
//         }

//         return () => {
//             cleanupMeeting();
//         };
//     }, [meetingData]);

//     const checkMeetingStatus = () => {
//         if (!meetingData?.start_url) {
//             setError("Meeting URL not available");
//             setMeetingStatus("error");
//             return;
//         }


//         const meetingStartTime = meetingData.start_time ? new Date(meetingData.start_time) : null;
//         const currentTime = new Date();

//         if (meetingStartTime && currentTime < meetingStartTime) {
//             setMeetingStatus("not_started");
//         } else {
//             initializeZoom();
//         }
//     };

//     const initializeZoom = async () => {
//         try {
//             setMeetingStatus("loading");
//             setError(null);

//             // Extract meeting details
//             const meetingNumber = extractMeetingNumber(meetingData?.start_url || "");
//             const password = extractPassword(meetingData?.start_url || "");

//             console.log("Meeting Number:", meetingNumber);
//             console.log("Password:", password ? "***" : "No password");

//             if (!meetingNumber) {
//                 throw new Error("Invalid meeting URL");
//             }



//             // Get SDK Key from environment
//             const sdkKey = import.meta.env.VITE_ZOOM_MEETING_SDK_SECRET;

//             if (!sdkKey) {
//                 throw new Error("Zoom SDK Key not configured");
//             }

//             console.log("SDK Key:", sdkKey ? "Present" : "Missing");

//             // Generate signature using RTK Query
//             const signatureResponse = await generateSignature({
//                 meeting_id: Number(meetingNumber),
//                 role: 0,
//             }).unwrap();

//             const signature = signatureResponse.data.signature;

//             console.log("Signature received:", signature ? "Present" : "Missing");

//             if (!signature || typeof signature !== "string") {
//                 throw new Error("Invalid signature received from server");
//             }

//             // Create client if not exists
//             if (!clientRef.current) {
//                 clientRef.current = ZoomMtgEmbedded.createClient();
//             }

//             // Initialize the SDK
//             if (zoomContainerRef.current) {
//                 await clientRef.current.init({
//                     zoomAppRoot: zoomContainerRef.current,
//                     language: "en-US",
//                     patchJsMedia: true,
//                     leaveOnPageUnload: false,
//                     customize: {
//                         video: {
//                             isResizable: true,
//                             viewSizes: {
//                                 default: {
//                                     width: 1000,
//                                     height: 600
//                                 },
//                                 ribbon: {
//                                     width: 300,
//                                     height: 700
//                                 }
//                             }
//                         }
//                     }
//                 });

//                 // Join the meeting
//                 await clientRef.current.join({
//                     sdkKey: sdkKey,
//                     signature: signature,
//                     meetingNumber: meetingNumber,
//                     password: password || "",
//                     userName: user?.name,
//                     userEmail: user?.email || "",
//                     tk: "",
//                     zak: "",
//                 });

//                 setMeetingStatus("joined");

//                 console.log("Successfully joined meeting:", meetingNumber);
//             }
//         } catch (err: any) {
//             console.error("Error initializing Zoom:", err);

//             // Handle specific error cases
//             if (err.message?.includes("Meeting has not started")) {
//                 setMeetingStatus("not_started");
//                 setError("The meeting hasn't started yet. Please wait for the host to start the meeting.");
//             } else if (err.message?.includes("Meeting has ended")) {
//                 setMeetingStatus("ended");
//                 setError("This meeting has already ended.");
//             } else {
//                 setMeetingStatus("error");
//                 setError(err.message || "Failed to join meeting. Please try again.");
//             }
//         }
//     };

//     const extractMeetingNumber = (url: string): string => {
//         try {
//             const match = url.match(/\/j\/(\d+)/);
//             return match ? match[1] : "";
//         } catch (err) {
//             console.error("Error extracting meeting number:", err);
//             return "";
//         }
//     };

//     const extractPassword = (url: string): string => {
//         try {
//             const urlObj = new URL(url);
//             const pwd = urlObj.searchParams.get("pwd");
//             return pwd || "";
//         } catch (err) {
//             console.error("Error extracting password:", err);
//             return "";
//         }
//     };



//     const cleanupMeeting = () => {
//         if (clientRef.current && meetingStatus === "joined") {
//             try {
//                 clientRef.current.leaveMeeting();
//                 clientRef.current = null;
//                 setMeetingStatus("loading");
//             } catch (err) {
//                 console.error("Error cleaning up meeting:", err);
//             }
//         }
//     };

//     const handleClose = () => {
//         cleanupMeeting();
//         window.history.back();
//     };

//     const handleRetry = () => {
//         setError(null);
//         initializeZoom();
//     };

//     const formatMeetingTime = () => {
//         if (!meetingData?.start_time) return "";
//         const startTime = new Date(meetingData.start_time);
//         return startTime.toLocaleString("en-US", {
//             weekday: "long",
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//             hour: "numeric",
//             minute: "2-digit",
//             hour12: true,
//         });
//     };

//     return (
//         <>
//             {/* Loading State */}
//             {(meetingStatus === "loading" || isLoadingLiveClass || isGeneratingSignature) && (
//                 <Box
//                     sx={{
//                         position: "absolute",
//                         top: 0,
//                         left: 0,
//                         right: 0,
//                         bottom: 0,
//                         display: "flex",
//                         flexDirection: "column",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         backgroundColor: "background.default",
//                         zIndex: 1000,
//                     }}
//                 >
//                     <CircularProgress size={60} thickness={4} />
//                     <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
//                         Joining Meeting...
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                         Please wait while we connect you
//                     </Typography>
//                 </Box>
//             )}

//             {/* Meeting Not Started State */}
//             {meetingStatus === "not_started" && (
//                 <Box
//                     sx={{
//                         position: "absolute",
//                         top: 0,
//                         left: 0,
//                         right: 0,
//                         bottom: 0,
//                         display: "flex",
//                         flexDirection: "column",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         backgroundColor: "background.default",
//                         zIndex: 1000,
//                         p: 3,
//                     }}
//                 >
//                     <Box
//                         sx={{
//                             width: 100,
//                             height: 100,
//                             borderRadius: "50%",
//                             backgroundColor: "info.light",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             mb: 3,
//                         }}
//                     >
//                         <Typography variant="h2">🕐</Typography>
//                     </Box>
//                     <Typography variant="h5" gutterBottom>
//                         Meeting Not Started Yet
//                     </Typography>
//                     <Typography
//                         variant="body1"
//                         color="text.secondary"
//                         textAlign="center"
//                         sx={{ maxWidth: 500, mt: 2 }}
//                     >
//                         The host hasn't started this meeting yet. Please wait for the meeting to begin.
//                     </Typography>
//                     {meetingData?.start_time && (
//                         <Alert severity="info" sx={{ mt: 3, maxWidth: 500 }}>
//                             <AlertTitle>Scheduled Start Time</AlertTitle>
//                             {formatMeetingTime()}
//                         </Alert>
//                     )}
//                     <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
//                         <Button variant="outlined" onClick={handleClose} size="large">
//                             Go Back
//                         </Button>
//                         <Button
//                             variant="contained"
//                             onClick={handleRetry}
//                             size="large"
//                         >
//                             Check Again
//                         </Button>
//                     </Box>
//                 </Box>
//             )}

//             {/* Meeting Ended State */}
//             {meetingStatus === "ended" && (
//                 <Box
//                     sx={{
//                         position: "absolute",
//                         top: 0,
//                         left: 0,
//                         right: 0,
//                         bottom: 0,
//                         display: "flex",
//                         flexDirection: "column",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         backgroundColor: "background.default",
//                         zIndex: 1000,
//                         p: 3,
//                     }}
//                 >
//                     <Box
//                         sx={{
//                             width: 100,
//                             height: 100,
//                             borderRadius: "50%",
//                             backgroundColor: "warning.light",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             mb: 3,
//                         }}
//                     >
//                         <Typography variant="h2">✓</Typography>
//                     </Box>
//                     <Typography variant="h5" gutterBottom>
//                         Meeting Has Ended
//                     </Typography>
//                     <Typography
//                         variant="body1"
//                         color="text.secondary"
//                         textAlign="center"
//                         sx={{ maxWidth: 500, mt: 2 }}
//                     >
//                         This meeting has already concluded. Thank you for participating!
//                     </Typography>
//                     <Button
//                         variant="contained"
//                         onClick={handleClose}
//                         size="large"
//                         sx={{ mt: 4 }}
//                     >
//                         Go Back to Course
//                     </Button>
//                 </Box>
//             )}

//             {/* Error State */}
//             {meetingStatus === "error" && error && (
//                 <Box
//                     sx={{
//                         position: "absolute",
//                         top: 0,
//                         left: 0,
//                         right: 0,
//                         bottom: 0,
//                         display: "flex",
//                         flexDirection: "column",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         backgroundColor: "background.default",
//                         zIndex: 1000,
//                         p: 3,
//                     }}
//                 >
//                     <Box
//                         sx={{
//                             width: 80,
//                             height: 80,
//                             borderRadius: "50%",
//                             backgroundColor: "error.light",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             mb: 3,
//                         }}
//                     >
//                         <Typography variant="h3" color="error.main">
//                             ⚠️
//                         </Typography>
//                     </Box>
//                     <Typography variant="h6" color="error.main" gutterBottom>
//                         Unable to Join Meeting
//                     </Typography>
//                     <Typography
//                         variant="body2"
//                         color="text.secondary"
//                         textAlign="center"
//                         sx={{ maxWidth: 400, mt: 1 }}
//                     >
//                         {error}
//                     </Typography>
//                     <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
//                         <Button variant="outlined" onClick={handleClose} size="large">
//                             Close
//                         </Button>
//                         <Button
//                             variant="contained"
//                             onClick={handleRetry}
//                             size="large"
//                         >
//                             Try Again
//                         </Button>
//                     </Box>
//                 </Box>
//             )}

//             {/* Zoom Meeting Container */}
//             <Box
//                 ref={zoomContainerRef}
//                 id="meetingSDKElement"
//                 sx={{
//                     width: "100%",
//                     height: "100%",
//                     paddingBottom: "24px",
//                     display: meetingStatus === "joined" ? "block" : "none",
//                 }}
//             />
//         </>
//     );
// }
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    CircularProgress,
    Typography,
} from "@mui/material";
import { ZoomMtg } from '@zoom/meetingsdk';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetMeetingSignatureMutation, useGetSingleLiveClassQuery } from "../../../../../services/courseApi";
import { useAppSelector } from "../../../../../store/hook";

type MeetingStatus = "not_started" | "loading" | "joined" | "error" | "ended";

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

export default function SingleLiveClassRoot() {
    const { courseId, liveId } = useParams();
    const [meetingStatus, setMeetingStatus] = useState<MeetingStatus>("loading");
    const [error, setError] = useState<string | null>(null);

    const user = useAppSelector((state) => state.auth.user);
    const { data: liveClassData, isLoading: isLoadingLiveClass } = useGetSingleLiveClassQuery({
        courseId: Number(courseId),
        liveId: Number(liveId),
    });

    const [generateSignature, { isLoading: isGeneratingSignature }] = useGetMeetingSignatureMutation();

    const meetingData = liveClassData?.data;

    if (!courseId || !liveId) {
        // Return null so nothing renders
        return null;
    }

    useEffect(() => {
        if (meetingData && meetingStatus === "loading") {
            checkMeetingStatus();
        }

        return () => {
            cleanupMeeting();
        };
    }, [meetingData]);

    const checkMeetingStatus = () => {
        if (!meetingData?.start_url) {
            setError("Meeting URL not available");
            setMeetingStatus("error");
            return;
        }

        const meetingStartTime = meetingData.start_time ? new Date(meetingData.start_time) : null;
        const currentTime = new Date();

        if (meetingStartTime && currentTime < meetingStartTime) {
            setMeetingStatus("not_started");
        } else {
            initializeZoom();
        }
    };

    const initializeZoom = async () => {
        try {
            setMeetingStatus("loading");
            setError(null);

            const meetingNumber = extractMeetingNumber(meetingData?.start_url || "");
            const password = extractPassword(meetingData?.start_url || "");

            if (!meetingNumber) throw new Error("Invalid meeting URL");

            const sdkKey = import.meta.env.VITE_ZOOM_MEETING_SDK_SECRET;
            if (!sdkKey) throw new Error("Zoom SDK Key not configured");

            const signatureResponse = await generateSignature({
                meeting_id: Number(meetingNumber),
                role: 0, // attendee/student
            }).unwrap();

            const signature = signatureResponse.data.signature;
            if (!signature) throw new Error("Invalid signature from server");

            ZoomMtg.init({
                leaveUrl: window.location.href,
                isSupportAV: true,
                success: () => {
                    ZoomMtg.join({
                        sdkKey,
                        signature,
                        meetingNumber,
                        passWord: password,
                        userName: user?.name || "Student",
                        userEmail: user?.email || "",
                        success: () => {
                            console.log("Joined Successfully");
                            setMeetingStatus("joined");
                        },
                        error: (err: any) => {
                            console.error("Join error:", err);
                            setMeetingStatus("error");
                            setError("Failed to join meeting.");
                        },
                    });
                },
                error: (err: any) => {
                    console.error("Init error:", err);
                    setMeetingStatus("error");
                    setError("Zoom initialization failed.");
                },
            });
        } catch (err: any) {
            console.error("Zoom Error:", err);
            setMeetingStatus("error");
            setError(err.message || "Failed to join meeting.");
        }
    };

    const extractMeetingNumber = (url: string): string => {
        try {
            const match = url.match(/\/j\/(\d+)/);
            return match ? match[1] : "";
        } catch {
            return "";
        }
    };

    const extractPassword = (url: string): string => {
        try {
            const urlObj = new URL(url);
            return urlObj.searchParams.get("pwd") || "";
        } catch {
            return "";
        }
    };

    const cleanupMeeting = () => {
        try {
            ZoomMtg.leaveMeeting({});
            setMeetingStatus("loading");
        } catch (err) {
            console.error("Cleanup error:", err);
        }
    };

    const handleClose = () => {
        cleanupMeeting();
        window.history.back();
    };

    const handleRetry = () => {
        setError(null);
        initializeZoom();
    };

    const formatMeetingTime = () => {
        if (!meetingData?.start_time) return "";
        const startTime = new Date(meetingData.start_time);
        return startTime.toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };

    // ------------------ JSX ------------------
    return (
        <>
            {/* Loading State */}
            {(meetingStatus === "loading" || isLoadingLiveClass || isGeneratingSignature) && (
                <Box sx={{
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
                }}>
                    <CircularProgress size={60} thickness={4} />
                    <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
                        Joining Meeting...
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Please wait while we connect you
                    </Typography>
                </Box>
            )}

            {/* Meeting Not Started */}
            {meetingStatus === "not_started" && (
                <Box sx={{
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
                }}>
                    <Box sx={{
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        backgroundColor: "info.light",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 3,
                    }}>
                        <Typography variant="h2">🕐</Typography>
                    </Box>
                    <Typography variant="h5" gutterBottom>
                        Meeting Not Started Yet
                    </Typography>
                    <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ maxWidth: 500, mt: 2 }}>
                        The host hasn't started this meeting yet. Please wait for the meeting to begin.
                    </Typography>
                    {meetingData?.start_time && (
                        <Alert severity="info" sx={{ mt: 3, maxWidth: 500 }}>
                            <AlertTitle>Scheduled Start Time</AlertTitle>
                            {formatMeetingTime()}
                        </Alert>
                    )}
                    <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
                        <Button variant="outlined" onClick={handleClose} size="large">
                            Go Back
                        </Button>
                        <Button variant="contained" onClick={handleRetry} size="large">
                            Check Again
                        </Button>
                    </Box>
                </Box>
            )}

            {/* Meeting Ended */}
            {meetingStatus === "ended" && (
                <Box sx={{
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
                }}>
                    <Box sx={{
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        backgroundColor: "warning.light",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 3,
                    }}>
                        <Typography variant="h2">✓</Typography>
                    </Box>
                    <Typography variant="h5" gutterBottom>
                        Meeting Has Ended
                    </Typography>
                    <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ maxWidth: 500, mt: 2 }}>
                        This meeting has already concluded. Thank you for participating!
                    </Typography>
                    <Button variant="contained" onClick={handleClose} size="large" sx={{ mt: 4 }}>
                        Go Back to Course
                    </Button>
                </Box>
            )}

            {/* Error State */}
            {meetingStatus === "error" && error && (
                <Box sx={{
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
                }}>
                    <Box sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        backgroundColor: "error.light",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 3,
                    }}>
                        <Typography variant="h3" color="error.main">⚠️</Typography>
                    </Box>
                    <Typography variant="h6" color="error.main" gutterBottom>
                        Unable to Join Meeting
                    </Typography>
                    <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ maxWidth: 400, mt: 1 }}>
                        {error}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                        <Button variant="outlined" onClick={handleClose} size="large">
                            Close
                        </Button>
                        <Button variant="contained" onClick={handleRetry} size="large">
                            Try Again
                        </Button>
                    </Box>
                </Box>
            )}
        </>
    );
}
