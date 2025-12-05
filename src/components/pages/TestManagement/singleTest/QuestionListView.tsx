import { Typography, useTheme } from "@mui/material";
import { Timer1 } from "iconsax-reactjs";
import type { Answers, QuestionProps } from "../../../../types/question";
import QuestionSlider from "../../../organism/Slider/QuestionSlider";

interface Props {
    timeLeft?: number;
    initialTime?: number;
    questions: QuestionProps[];
    currentQuestion: QuestionProps | null;
    currentQuestionIndex: number;
    totalQuestions: number;
    setCurrentQuestion: (newValue: QuestionProps) => void;
    attendedQuestion: Answers[];
    setCurrentQuestionIndex: (newValue: number) => void;
}

export default function QuestionListView({
    timeLeft,
    initialTime,
    questions,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    setCurrentQuestion,
    attendedQuestion,
    setCurrentQuestionIndex
}: Props) {
    const theme = useTheme();

    const formatTime = (ms: number | undefined) => {
        if (ms === undefined) return "--:--";
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    const percentageLeft =
        initialTime !== undefined && timeLeft !== undefined && initialTime > 0
            ? timeLeft / initialTime
            : 1;

    const getTimerColor = () => {
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
    };

    const timerColors = getTimerColor();

    return (
        <>
            <div className="flex justify-between items-center">
                <Typography
                    color="text.dark"
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
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                </Typography>

                {initialTime !== undefined && (
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
            </div>
            <QuestionSlider
                questions={questions}
                currentQuestion={currentQuestion}
                setCurrentQuestion={setCurrentQuestion}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                attendedQuestion={attendedQuestion}
            />
        </>
    );
}