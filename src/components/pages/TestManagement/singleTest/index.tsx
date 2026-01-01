import { Box, Button, Divider, Typography } from "@mui/material";
import { ArrowLeft } from "iconsax-reactjs";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { PATH } from "../../../../routes/PATH";
import {
    useGetTestByIdQuery,
    useSubmitMcqMutation,
} from "../../../../services/testApi";
import { showToast } from "../../../../slice/toastSlice";
import { useAppDispatch } from "../../../../store/hook";

import type {
    Answers,
    McqSubmissionData,
    QuestionProps,
} from "../../../../types/question";

import { renderHtml } from "../../../../utils/renderHtml";

import TestCancelDialog from "../../../organism/Dialog/TestCancelDialog";
import TestResultDialog from "../../../organism/Dialog/TestResultDialog";
import TestSubmissionDialog, { type SubmissionType } from "../../../organism/Dialog/TestSubmissionDialog";

import QuestionListView from "./QuestionListView";
import QuestionView from "./QuestionView";


const HeaderSkeleton = () => (
    <div className="animate-pulse space-y-3">
        <div className="h-10 w-40 bg-gray-200 rounded" />
        <div className="h-8 w-3/5 bg-gray-200 rounded" />
    </div>
);

const SidebarSkeleton = () => (
    <div className="animate-pulse space-y-2">
        {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded" />
        ))}
    </div>
);

const QuestionSkeleton = () => (
    <div className="animate-pulse space-y-4">
        <div className="h-6 w-4/5 bg-gray-200 rounded" />
        <div className="h-6 w-full bg-gray-200 rounded" />
        <div className="h-6 w-3/4 bg-gray-200 rounded" />
        <div className="mt-6 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded" />
            ))}
        </div>
    </div>
);


export default function SingleTestRoot() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { courseId, testId } = useParams();

    const STORAGE_KEY = `mcq_test_progress_${courseId}_${testId}`;
    const RESULT_KEY = `mcq_test_result_${courseId}_${testId}`;


    const [attendedQuestion, setAttendedQuestion] = useState<Answers[]>([]);
    const [currentQuestion, setCurrentQuestion] =
        useState<QuestionProps | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [timeLeft, setTimeLeft] = useState<number>();
    const [timerPaused, setTimerPaused] = useState(false);

    const [cancelModal, setCancelModal] = useState(false);
    const [submitModal, setSubmitModal] = useState<{
        open: boolean;
        type: SubmissionType;
    }>({ open: false, type: "submit" });

    const [result, setResult] = useState<McqSubmissionData | null>(null);
    const [resultOpen, setResultOpen] = useState(false);

    const initialTimeRef = useRef<number | null>(null);


    const { data, isLoading, isFetching } = useGetTestByIdQuery(
        { courseId: Number(courseId), testId: Number(testId) },
        { skip: !courseId || !testId }
    );

    const [submitMcq, { isLoading: submitting }] =
        useSubmitMcqMutation();


    if (isLoading || isFetching || !data) {
        return (
            <div className="single__test__wrapper">
                <div className="test__header mb-6">
                    <HeaderSkeleton />
                </div>

                <Divider className="my-4!" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-3">
                        <SidebarSkeleton />
                    </div>
                    <div className="lg:col-span-9">
                        <QuestionSkeleton />
                    </div>
                </div>
            </div>
        );
    }


    if (data.overview.test_type === "subjective") {
        return (
            <div className="subject__test_view">
                <Button
                    startIcon={<ArrowLeft />}
                    onClick={() => navigate(-1)}
                >
                    Back to Test
                </Button>

                <Divider className="my-4!" />

                {data.data.map(q => (
                    <Box
                        key={q.question}
                        className="pb-4 mb-4 border-b last:border-b-0"
                        sx={{
                            bordercolor: (theme) => theme.palette.separator.dark
                        }}
                    >
                        <Typography variant="h6">
                            {renderHtml(q.question)}
                        </Typography>
                    </Box>
                ))}
            </div>
        );
    }

    /* ---------------- Restore Progress ---------------- */

    useEffect(() => {
        initialTimeRef.current = data.overview.time;

        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) {
            setCurrentQuestion(data.data[0]);
            setTimeLeft(data.overview.time);
            return;
        }

        const parsed = JSON.parse(saved);
        setAttendedQuestion(parsed.attendedQuestion || []);
        setCurrentIndex(parsed.currentQuestionIndex || 0);
        setCurrentQuestion(data.data[parsed.currentQuestionIndex || 0]);

        const diff = Date.now() - parsed.lastUpdated;
        setTimeLeft(Math.max(parsed.timeLeft - diff, 0));
    }, []);

    /* ---------------- Persist Progress ---------------- */

    useEffect(() => {
        if (timeLeft === undefined || timerPaused) return;

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                attendedQuestion,
                currentQuestionIndex: currentIndex,
                timeLeft,
                lastUpdated: Date.now(),
            })
        );
    }, [attendedQuestion, currentIndex, timeLeft]);

    /* ---------------- Timer ---------------- */

    useEffect(() => {
        if (timeLeft === undefined || timerPaused || timeLeft <= 0) return;

        const id = setInterval(
            () => setTimeLeft(t => Math.max((t ?? 0) - 1000, 0)),
            1000
        );

        return () => clearInterval(id);
    }, [timeLeft, timerPaused]);

    /* ---------------- Auto Submit ---------------- */

    useEffect(() => {
        if (timeLeft === 0 && !timerPaused) {
            setTimerPaused(true);
            handleSubmit("timer");
        }
    }, [timeLeft]);

    /* ---------------- Handlers ---------------- */

    const handleAnswer = (value: Answers) => {
        setAttendedQuestion(prev => {
            const i = prev.findIndex(v => v.question_id === value.question_id);
            if (i !== -1) {
                const copy = [...prev];
                copy[i] = value;
                return copy;
            }
            return [...prev, value];
        });
    };

    const handleSubmit = async (_type: SubmissionType) => {
        try {
            setTimerPaused(true);

            const timeTaken =
                (initialTimeRef.current ?? 0) - (timeLeft ?? 0);

            const res = await submitMcq({
                courseId: Number(courseId),
                testId: Number(testId),
                body: {
                    answers: attendedQuestion,
                    time_taken: timeTaken,
                },
            }).unwrap();

            localStorage.removeItem(STORAGE_KEY);
            localStorage.setItem(RESULT_KEY, JSON.stringify(res.data));

            setResult(res.data);
            setResultOpen(true);

            dispatch(
                showToast({
                    message: res.message || "Test submitted successfully",
                    severity: "success",
                })
            );
        } catch {
            dispatch(
                showToast({
                    message: "Unable to submit test",
                    severity: "error",
                })
            );
        }
    };

    const isFirst = currentIndex === 0;
    const isLast = currentIndex === data.data.length - 1;

    /* ---------------- Render ---------------- */

    return (
        <div className="single__test__wrapper">
            <Button startIcon={<ArrowLeft />} onClick={() => setCancelModal(true)}>
                Back to Test
            </Button>

            <Divider className="my-4!" />

            <QuestionListView
                timeLeft={timeLeft}
                initialTime={initialTimeRef.current ?? undefined}
                questions={data.data}
                currentQuestion={currentQuestion}
                currentQuestionIndex={currentIndex}
                totalQuestions={data.data.length}
                setCurrentQuestion={setCurrentQuestion}
                setCurrentQuestionIndex={setCurrentIndex}
                attendedQuestion={attendedQuestion}
            />

            <QuestionView
                currentQuestion={currentQuestion}
                attendedQuestion={attendedQuestion}
                setAttendedQuestion={handleAnswer}
            />

            <div className="flex justify-between my-6">
                <Button
                    disabled={isFirst}
                    onClick={() => {
                        setCurrentIndex(i => i - 1);
                        setCurrentQuestion(data.data[currentIndex - 1]);
                    }}
                >
                    Previous
                </Button>

                <Button
                    onClick={() =>
                        isLast
                            ? setSubmitModal({ open: true, type: "submit" })
                            : (() => {
                                setCurrentIndex(i => i + 1);
                                setCurrentQuestion(data.data[currentIndex + 1]);
                            })()
                    }
                >
                    {isLast ? "Submit" : "Next"}
                </Button>
            </div>

            {/* Dialogs */}
            <TestSubmissionDialog
                open={submitModal.open}
                handleClose={() => setSubmitModal({ open: false, type: "submit" })}
                onSubmit={() => handleSubmit(submitModal.type)}
                type={submitModal.type}
                loading={submitting}
            />

            <TestCancelDialog
                open={cancelModal}
                handleClose={() => setCancelModal(false)}
                onSubmit={() => navigate(PATH.TEST.ROOT)}
            />

            <TestResultDialog
                open={resultOpen}
                result={result}
                onReview={() =>
                    navigate(
                        PATH.COURSE_MANAGEMENT.COURSES.VIEW_TEST.REVIEW_TEST.ROOT({
                            courseId: Number(courseId),
                            testId: Number(testId),
                        })
                    )
                }
                onBack={() =>
                    navigate(
                        PATH.COURSE_MANAGEMENT.COURSES.VIEW_COURSE.ROOT(
                            Number(courseId)
                        )
                    )
                }
            />
        </div>
    );
}
