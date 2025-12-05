import { Button, Divider, Typography, useTheme } from "@mui/material";
import { ArrowLeft } from "iconsax-reactjs";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PATH } from "../../../../routes/PATH";
import { useGetTestByIdQuery, useSubmitMcqMutation } from "../../../../services/testApi";
import { showToast } from "../../../../slice/toastSlice";
import { useAppDispatch } from "../../../../store/hook";
import type { Answers, McqSubmissionData, QuestionProps } from "../../../../types/question";
import TestCancelDialog from "../../../organism/Dialog/TestCancelDialog";
import TestResultDialog from "../../../organism/Dialog/TestResultDialog";
import TestSubmissionDialog, { type SubmissionType } from "../../../organism/Dialog/TestSubmissionDialog";
import QuestionListView from "./QuestionListView";
import QuestionView from "./QuestionView";

export default function SingleTestRoot() {

    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { courseId, testId } = useParams();

    const [attendedQuestion, setAttendedQuestion] = useState<Answers[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<QuestionProps | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [modal, setModal] = useState({
        open: false,
        type: "back"
    });
    const [submitModal, setSubmitModal] = useState({
        open: false,
        type: "timer"
    });
    const [openResultModal, setOpenResultModal] = useState(false);
    const [result, setResult] = useState<McqSubmissionData | null>(null);
    const [timeLeft, setTimeLeft] = useState<number | undefined>(undefined);
    const [isTimerPaused, setIsTimerPaused] = useState(false);
    const initialTimeRef = useRef<number | undefined>(undefined);

    const { data } = useGetTestByIdQuery(
        { courseId: Number(courseId), testId: Number(testId) },
        { skip: !courseId || !testId }
    );
    const [submitMcq, { isLoading: submitting }] = useSubmitMcqMutation();

    // Initialize timer when data loads
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

    const getTimeTaken = (): string => {
        if (initialTimeRef.current === undefined || timeLeft === undefined) {
            return "00:00:00";
        }

        const timeTakenMs = initialTimeRef.current - timeLeft;
        const totalSeconds = Math.floor(timeTakenMs / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    useEffect(() => {
        if (data?.data?.length) {
            setCurrentQuestion(data.data[0]);
            setCurrentQuestionIndex(0);
        }
    }, [data]);


    const timeStringToMs = (timeStr: string) => {
        const [hoursStr, minutesStr, secondsStr] = timeStr.split(":").map(Number);
        return (hoursStr * 3600 + minutesStr * 60 + secondsStr) * 1000;
    };

    const handleSubmitMcq = async () => {
        try {
            setIsTimerPaused(true);
            const timeTaken = getTimeTaken();
            const timeTakenMs = timeStringToMs(timeTaken);
            const response = await submitMcq({
                courseId: Number(courseId),
                testId: Number(testId),
                body: { answers: attendedQuestion, time_taken: timeTakenMs }
            }).unwrap();

            dispatch(
                showToast({
                    message: response?.message || "Mcq Submitted Successfully",
                    severity: "success"
                })
            );
            handleCloseSubmitModal();
            setResult(response?.data || null);
            setOpenResultModal(true);

        } catch (e: any) {
            dispatch(
                showToast({
                    message: e?.data?.message || "Unable to submit test.",
                    severity: "error"
                })
            );
        }
    };

    const handleQuestionAttended = (newValue: Answers) => {
        setAttendedQuestion((prev) => {
            const existingIndex = prev.findIndex(
                (ans) => ans.question_id === newValue.question_id
            );

            if (existingIndex !== -1) {
                const updated = [...prev];
                updated[existingIndex] = newValue;
                return updated;
            } else {
                return [...prev, newValue];
            }
        });
    };

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

    return (
        <div className="single__test__wrapper">
            <div className="test__header">
                <div className="flex justify-between items-end">
                    <div className="title">
                        <Button
                            variant="text"
                            startIcon={<ArrowLeft />}
                            sx={{
                                color: theme.palette.text.middle
                            }}
                            onClick={() => setModal((prev) => ({ ...prev, open: true }))}
                        >
                            <Typography color="text.middle">Back to Test</Typography>
                        </Button>
                        <Typography variant="text2Xl" className="block mt-4! font-medium">
                            {data?.overview?.name}
                        </Typography>
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setSubmitModal({
                            open: true,
                            type: "submit"
                        })}
                    >
                        Submit
                    </Button>
                </div>
            </div>
            <Divider className="mt-2! mb-6!" />
            <QuestionListView
                timeLeft={timeLeft}
                initialTime={initialTimeRef.current}
                questions={data?.data || []}
                currentQuestion={currentQuestion}
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={data?.data?.length || 0}
                setCurrentQuestion={setCurrentQuestion}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                attendedQuestion={attendedQuestion}
            />
            <QuestionView
                currentQuestion={currentQuestion}
                setAttendedQuestion={handleQuestionAttended}
                attendedQuestion={attendedQuestion}
            />
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
                onSubmit={handleSubmitMcq}
                type={submitModal.type as SubmissionType}
                loading={submitting}
            />
            <TestCancelDialog
                open={modal.open}
                handleClose={handleCloseModal}
                onSubmit={() => navigate(PATH.TEST.ROOT)}
            />
            <TestResultDialog open={openResultModal} result={result}
                onReview={() => { navigate(PATH.COURSE_MANAGEMENT.COURSES.VIEW_TEST.REVIEW_TEST.ROOT({ courseId: Number(courseId), testId: Number(testId) })) }} />
        </div>
    );
}