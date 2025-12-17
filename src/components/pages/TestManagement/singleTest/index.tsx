
import { Button, Divider, Typography } from "@mui/material";
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

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { courseId, testId } = useParams();

    const STORAGE_KEY = `mcq_test_progress_${courseId}_${testId}`;
    const RESULT_KEY = `mcq_test_result_${courseId}_${testId}`;

    const [attendedQuestion, setAttendedQuestion] = useState<Answers[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<QuestionProps | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [modal, setModal] = useState({ open: false, type: "back" });
    const [submitModal, setSubmitModal] = useState({ open: false, type: "timer" });
    const [openResultModal, setOpenResultModal] = useState(false);
    const [result, setResult] = useState<McqSubmissionData | null>(null);
    const [timeLeft, setTimeLeft] = useState<number>();
    const [isTimerPaused, setIsTimerPaused] = useState(false);
    const initialTimeRef = useRef<number | null>(null);

    const { data } = useGetTestByIdQuery(
        { courseId: Number(courseId), testId: Number(testId) },
        { skip: !courseId || !testId }
    );

    const [submitMcq, { isLoading: submitting }] = useSubmitMcqMutation();

    // ✅ INITIAL TIMER SETUP (ONLY IF NO SAVED DATA)
    useEffect(() => {
        if (!data?.overview?.time) return;

        initialTimeRef.current = data.overview.time;

        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) {
            setTimeLeft(data.overview.time);
        }
    }, [data?.overview?.time, STORAGE_KEY]);

    // ✅ RESTORE FROM LOCAL STORAGE
    useEffect(() => {
        if (!data?.data?.length) return;

        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) {
            setCurrentQuestion(data.data[0]);
            setCurrentQuestionIndex(0);
            return;
        }

        const parsed = JSON.parse(saved);

        setAttendedQuestion(parsed.attendedQuestion || []);

        const safeIndex =
            typeof parsed.currentQuestionIndex === "number"
                ? parsed.currentQuestionIndex
                : 0;

        setCurrentQuestionIndex(safeIndex);
        setCurrentQuestion(data.data[safeIndex]);

        if (typeof parsed.timeLeft === "number" && parsed.lastUpdated) {
            const diff = Date.now() - parsed.lastUpdated;
            const remaining = Math.max(parsed.timeLeft - diff, 0);
            setTimeLeft(remaining);
        }
    }, [data?.data, STORAGE_KEY]);

    useEffect(() => {
        if (!courseId || !testId) return;

        const savedResult = localStorage.getItem(RESULT_KEY);

        if (savedResult) {
            const parsedResult = JSON.parse(savedResult);
            setResult(parsedResult);
            setOpenResultModal(true);
            setIsTimerPaused(true);
        }
    }, [courseId, testId, RESULT_KEY]);

    useEffect(() => {
        if (!courseId || !testId || timeLeft === undefined) return;

        const payload = {
            attendedQuestion,
            currentQuestionIndex,
            timeLeft,
            lastUpdated: Date.now()
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    }, [attendedQuestion, currentQuestionIndex, timeLeft, courseId, testId, STORAGE_KEY]);

    // ✅ TIMER
    useEffect(() => {
        if (timeLeft === undefined || timeLeft <= 0 || isTimerPaused) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => (prev ? Math.max(prev - 1000, 0) : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft, isTimerPaused]);

    // ✅ AUTO SUBMIT ON TIMER END
    useEffect(() => {
        if (timeLeft === 0 && !isTimerPaused) {
            setIsTimerPaused(true);
            handleSubmitMcq();
            setSubmitModal({ open: true, type: "timer" });
            localStorage.removeItem(STORAGE_KEY)
        }
    }, [timeLeft]);

    const getTimeTaken = () => {
        if (!initialTimeRef.current || timeLeft === undefined) return "00:00:00";
        const diff = initialTimeRef.current - timeLeft;
        const total = Math.floor(diff / 1000);
        return new Date(total * 1000).toISOString().substring(11, 19);
    };

    const timeStringToMs = (timeStr: string) => {
        const [h, m, s] = timeStr.split(":").map(Number);
        return (h * 3600 + m * 60 + s) * 1000;
    };

    const handleSubmitMcq = async () => {
        try {
            setIsTimerPaused(true);
            const timeTakenMs = timeStringToMs(getTimeTaken());

            const response = await submitMcq({
                courseId: Number(courseId),
                testId: Number(testId),
                body: { answers: attendedQuestion, time_taken: timeTakenMs }
            }).unwrap();

            localStorage.removeItem(STORAGE_KEY);

            localStorage.setItem(RESULT_KEY, JSON.stringify(response?.data || null));
            setOpenResultModal(true);

            dispatch(showToast({
                message: response?.message || "MCQ Submitted Successfully",
                severity: "success"
            }));

            setResult(response?.data || null);
        } catch (e: any) {
            dispatch(showToast({
                message: e?.data?.message || "Unable to submit test.",
                severity: "error"
            }));
        }
    };

    const handleQuestionAttended = (newValue: Answers) => {
        setAttendedQuestion((prev) => {
            const index = prev.findIndex(a => a.question_id === newValue.question_id);
            if (index !== -1) {
                const updated = [...prev];
                updated[index] = newValue;
                return updated;
            }
            return [...prev, newValue];
        });
    };

    const handlePreviousQuestion = () => {
        if (data?.data && currentQuestionIndex > 0) {
            const i = currentQuestionIndex - 1;
            setCurrentQuestionIndex(i);
            setCurrentQuestion(data.data[i]);
        }
    };

    const handleNextQuestion = () => {
        if (data?.data && currentQuestionIndex < data.data.length - 1) {
            const i = currentQuestionIndex + 1;
            setCurrentQuestionIndex(i);
            setCurrentQuestion(data.data[i]);
        }
    };

    const isFirstQuestion = currentQuestionIndex === 0;
    const isLastQuestion = currentQuestionIndex === (data?.data?.length || 1) - 1;

    return (
        <div className="single__test__wrapper">
            <div className="test__header">
                <Button startIcon={<ArrowLeft />} onClick={() => setModal({ open: true, type: "back" })}>
                    Back to Test
                </Button>
                <div className="flex justify-between items-center">
                    <Typography variant="h4">{data?.overview?.name}</Typography>
                    <Button onClick={() => setSubmitModal({ open: true, type: "submit" })} variant="contained" color="primary">
                        {submitting ? "Submitting" : "Submit"}
                    </Button>
                </div>
            </div>

            <Divider className="my-2! mb-6!" />

            <QuestionListView
                timeLeft={timeLeft}
                initialTime={initialTimeRef.current || undefined}
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

            <div className="footer__action my-8 flex justify-between items-center">
                <Button onClick={handlePreviousQuestion} disabled={isFirstQuestion} variant="contained" color="primary">Previous</Button>
                <Button onClick={isLastQuestion ? () => setSubmitModal({ open: true, type: "submit" }) : handleNextQuestion} variant="contained" color="primary">
                    {isLastQuestion ? "Submit" : "Next"}
                </Button>
            </div>

            <TestSubmissionDialog
                open={submitModal.open}
                handleClose={() => setSubmitModal({ open: false, type: "timer" })}
                onSubmit={() => handleSubmitMcq()}
                type={submitModal.type as SubmissionType}
                loading={submitting}
            />

            <TestCancelDialog
                open={modal.open}
                handleClose={() => setModal({ open: false, type: "back" })}
                onSubmit={() => navigate(PATH.TEST.ROOT)}
            />

            <TestResultDialog
                open={openResultModal}
                result={result}
                onReview={() => {
                    navigate(PATH.COURSE_MANAGEMENT.COURSES.VIEW_TEST.REVIEW_TEST.ROOT({
                        courseId: Number(courseId),
                        testId: Number(testId)
                    }));
                    localStorage.removeItem(RESULT_KEY);
                }
                }
                onBack={() => {
                    localStorage.removeItem(RESULT_KEY);
                    navigate(PATH.COURSE_MANAGEMENT.COURSES.VIEW_COURSE.ROOT(Number(courseId)))
                }}
            />
        </div>
    );
}
