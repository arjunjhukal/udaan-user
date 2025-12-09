import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import { ArrowLeft, Timer1 } from "iconsax-reactjs";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PATH } from "../../../../routes/PATH";
import { useGetTestByIdQuery, useSubmitSubjectiveMutation } from "../../../../services/testApi";
import { showToast } from "../../../../slice/toastSlice";
import { useAppDispatch } from "../../../../store/hook";
import type { QuestionProps } from "../../../../types/question";
import FileDragDrop from "../../../molecules/FileDragDrop";
import TestCancelDialog from "../../../organism/Dialog/TestCancelDialog";
import type { SubmissionType } from "../../../organism/Dialog/TestSubmissionDialog";
import TestSubmissionDialog from "../../../organism/Dialog/TestSubmissionDialog";

export default function SingleSubjectiveTest() {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { courseId, testId } = useParams();
    const [modal, setModal] = useState({
        open: false,
        type: "back"
    });
    const [currentQuestion, setCurrentQuestion] = useState<QuestionProps | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [submitModal, setSubmitModal] = useState({
        open: false,
        type: "timer"
    });

    const [timeLeft, setTimeLeft] = useState<number | undefined>(undefined);
    const [isTimerPaused, setIsTimerPaused] = useState(false);
    const initialTimeRef = useRef<number | undefined>(undefined);

    const { data } = useGetTestByIdQuery(
        { courseId: Number(courseId), testId: Number(testId) },
        { skip: !courseId || !testId }
    );
    const [submitAnswer, { isLoading: submitting }] = useSubmitSubjectiveMutation();

    useEffect(() => {
        if (data?.overview?.time !== undefined) {
            initialTimeRef.current = data.overview.time;
            setTimeLeft(data.overview.time);
        }
    }, [data?.overview?.time]);

    useEffect(() => {
        if (data?.data?.length) {
            setCurrentQuestion(data.data[0]);
            setCurrentQuestionIndex(0);
        }
    }, [data]);

    useEffect(() => {
        if (timeLeft === undefined || timeLeft <= 0 || isTimerPaused) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev === undefined) return undefined;
                return Math.max(prev - 1000, 0);
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft, isTimerPaused]);

    useEffect(() => {
        if (timeLeft === 0 && !isTimerPaused) {
            setIsTimerPaused(true);
            setSubmitModal({
                open: true,
                type: "timer"
            });
        }
    }, [timeLeft, isTimerPaused]);



    const handlePreviousQuestion = () => {
        if (data?.data && currentQuestionIndex > 0) {
            const newIndex = currentQuestionIndex - 1;
            setCurrentQuestionIndex(newIndex);
            setCurrentQuestion(data.data[newIndex]);
        }
    };

    const handleNextQuestion = () => {
        if (data?.data && currentQuestionIndex < data.data.length - 1) {
            const newIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(newIndex);
            setCurrentQuestion(data.data[newIndex]);
        }
    };

    const isFirstQuestion = currentQuestionIndex === 0;
    const isLastQuestion = currentQuestionIndex === (data?.data?.length || 0) - 1;

    const handleCloseModal = () => {
        setModal({ open: false, type: "timer" })
    }

    const handleCloseSubmitModal = () => {
        setSubmitModal({ open: false, type: "timer" });
    };

    const handleSubmitSubjective = async () => {
        try {
            setIsTimerPaused(true);

            const response = await submitAnswer({
                courseId: Number(courseId),
                testId: Number(testId),
                questionId: Number(0),
            }).unwrap();

            dispatch(
                showToast({
                    message: response?.message || "Mcq Submitted Successfully",
                    severity: "success"
                })
            );

        } catch (e: any) {
            dispatch(
                showToast({
                    message: e?.data?.message || "Unable to submit test.",
                    severity: "error"
                })
            );
        }
    }

    const formatTime = (ms: number | undefined) => {
        if (ms === undefined) return "--:--";
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    const percentageLeft = useMemo(() => {
        return initialTimeRef.current !== undefined && timeLeft !== undefined && initialTimeRef.current > 0
            ? timeLeft / initialTimeRef.current
            : 1;
    }, [timeLeft]);


    const timerColors = useMemo(() => {
        if (percentageLeft > 0.1) {
            return {
                bg: theme.palette.success.light,
                border: theme.palette.success.main,
                color: theme.palette.success.main,
            };
        }

        const redIntensity = Math.min(255, Math.floor((1 - percentageLeft / 0.1) * 255));

        return {
            bg: `rgba(255, ${200 - redIntensity}, ${200 - redIntensity}, 0.2)`,
            border: `rgb(255, ${80 - redIntensity / 3}, ${80 - redIntensity / 3})`,
            color: `rgb(255, ${50 - redIntensity / 4}, ${50 - redIntensity / 4})`,
        };
    }, [percentageLeft, theme.palette.success.light, theme.palette.success.main]);

    console.log("render")
    return (
        <div className="single__subject__test__root">
            <div className="test__header">
                <div className="title">
                    <Button
                        variant="text"
                        startIcon={<ArrowLeft />}
                        sx={{
                            color: theme.palette.text.middle
                        }}
                        onClick={() => setModal((prev) => ({ ...prev, open: true }))}
                    >
                        <Typography color="text.middle" variant="subtitle1">Back to Test</Typography>
                    </Button>
                    <Typography variant="h4" className="block mt-4! font-medium">
                        {data?.overview?.name}
                    </Typography>
                </div>
            </div>
            <Divider className="mt-2! mb-6!" />

            <Box className="flex justify-between items-center">
                <Typography
                    color="text.dark"
                    variant="subtitle1"
                    sx={{
                        position: "relative",
                        display: "inline-block",
                        "&::after": {
                            content: '""',
                            position: "absolute",
                            left: 0,
                            right: 0,
                            bottom: "-2px",
                            height: "2px",
                            backgroundColor: theme.palette.primary.dark,
                        },
                    }}
                    fontWeight={600}
                >
                    Question {currentQuestionIndex + 1} of {data?.data?.length}
                </Typography>

                {initialTimeRef.current !== undefined && (
                    <Typography
                        className="py-1.5 px-3 rounded-2xl flex gap-1 items-center"
                        sx={{
                            background: timerColors.bg,
                            color: timerColors.color,
                            border: `1px solid ${timerColors.border}`,
                            fontWeight: 600,
                            transition: "all 0.4s ease",
                        }}
                    >
                        <Timer1 variant="Bold" />
                        {formatTime(timeLeft)} mins
                    </Typography>
                )}
            </Box>
            <FileDragDrop onFileChange={() => { }} />
            <div className="footer__action flex justify-between items-center mt-8">
                <Button
                    color="primary"
                    variant="outlined"
                    onClick={handlePreviousQuestion}
                    disabled={isFirstQuestion}
                >
                    Previous
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={isLastQuestion ? () => setSubmitModal((_prev) => ({ open: true, type: "submit" })) : handleNextQuestion}
                >
                    {isLastQuestion ? "Submit" : "Next"}
                </Button>
            </div>
            <TestSubmissionDialog
                open={submitModal.open}
                handleClose={handleCloseSubmitModal}
                onSubmit={() => {
                    if (submitModal.type === "timer") {

                    } else {
                        handleSubmitSubjective();
                    }
                }}
                type={submitModal.type as SubmissionType}
                loading={submitting}
            />
            <TestCancelDialog
                open={modal.open}
                handleClose={handleCloseModal}
                onSubmit={() => navigate(PATH.TEST.ROOT)}
            />
        </div>
    )
}