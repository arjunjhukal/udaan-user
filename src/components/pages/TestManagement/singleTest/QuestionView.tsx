import { Box, Divider, FormControlLabel, Radio, RadioGroup, Typography, useTheme } from "@mui/material";
import type { Answers, QuestionProps } from "../../../../types/question";

interface Props {
    currentQuestion: QuestionProps | null;
    setAttendedQuestion: (newValue: Answers) => void;
    attendedQuestion: Answers[];
}

export default function QuestionView({ currentQuestion, setAttendedQuestion, attendedQuestion }: Props) {
    const theme = useTheme();

    // Find if current question has been attended
    const currentAnswer = attendedQuestion.find(
        (ans) => ans.question_id === currentQuestion?.id
    );

    const selectedOptionId = currentAnswer?.option_id;

    const handleOptionChange = (optionId: number) => {
        if (!currentQuestion?.id) return;

        const newAnswer: Answers = {
            question_id: currentQuestion.id,
            option_id: optionId,
        };

        setAttendedQuestion(newAnswer);
    };

    return (
        <div className="question__wrapper">
            <div className="question flex flex-col gap-3">
                <Typography
                    variant="textSm"
                    sx={{
                        background: theme.palette.primary.light,
                        color: theme.palette.primary.main
                    }}
                    className="py-1.5 px-4.5 rounded-4xl font-bold max-w-fit"
                >
                    Question:
                </Typography>
                <Typography >
                    {currentQuestion?.question}
                </Typography>
            </div>
            <Divider className="my-4!" />
            <Typography
                variant="textSm"
                sx={{
                    background: theme.palette.success.light,
                    color: theme.palette.success.main
                }}
                className="py-1.5 px-4.5 rounded-4xl font-bold max-w-fit mb-3! block"
            >
                Options:
            </Typography>
            <RadioGroup
                value={selectedOptionId || ""}
                onChange={(e) => handleOptionChange(Number(e.target.value))}
            >
                <div className="flex flex-col gap-4 md:gap-6 md:grid md:grid-cols-2">
                    {currentQuestion?.options ? currentQuestion.options.map((option) => {
                        const isAttended = selectedOptionId === option.id;

                        return (
                            <div className="col-span-1" key={option.id}>
                                <Box
                                    className="rounded-lg"
                                    sx={{
                                        border: `1px solid `,
                                        borderColor: isAttended
                                            ? theme.palette.primary.main
                                            : theme.palette.seperator.dark,
                                        backgroundColor: isAttended
                                            ? theme.palette.primary.light
                                            : ""
                                    }}
                                >
                                    <FormControlLabel
                                        value={option.id}
                                        className="items-center! gap-1 w-full"
                                        control={<Radio color="primary" />}
                                        label={
                                            <div className="general__content__box">
                                                <Typography color="text.dark" className="mt-0!">{option.option}</Typography>
                                            </div>
                                        }
                                    />
                                </Box>
                            </div>
                        );
                    }) : ""}
                </div>
            </RadioGroup>
        </div>
    );
}