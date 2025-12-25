import { Button, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../routes/PATH";
import { setPurchase } from "../../../slice/purchaseSlice";
import type { TestProps } from "../../../types/question";
import { formatDateTime } from "../../../utils/dateFormat";

const TestActionButton = ({ test, havePurchased, id }: { test: TestProps, status?: any; havePurchased: boolean; id: number }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleStartOrRetake = () => {
        if (!havePurchased) {
            dispatch(setPurchase({ courseId: Number(id), open: true }));
            return;
        }

        const path =
            test.test_type === "mcq"
                ? PATH.COURSE_MANAGEMENT.COURSES.VIEW_TEST.ROOT({
                    courseId: Number(id),
                    testId: Number(test?.id),
                })
                : PATH.COURSE_MANAGEMENT.COURSES.VIEW_TEST.SUBJECTIVE_TEST.ROOT({
                    courseId: Number(id),
                    testId: Number(test?.id),
                });

        navigate(path);
    };

    const handleViewResult = () => {
        const path =
            test.test_type === "mcq"
                ? PATH.COURSE_MANAGEMENT.COURSES.VIEW_TEST.REVIEW_TEST.ROOT({
                    courseId: Number(id),
                    testId: Number(test?.id),
                })
                : PATH.COURSE_MANAGEMENT.COURSES.VIEW_TEST.REVIEW_TEST.REVIEW_SUBJECTIVE_TEST.ROOT({
                    courseId: Number(id),
                    testId: Number(test?.id),
                });

        navigate(path);
    };


    if (test.has_taken_test) {
        if (test.is_scheduled) {
            return (
                <Button variant="outlined" color="primary" fullWidth onClick={handleViewResult}>
                    {test.is_graded ? "View Result" : "Result Pending"}
                </Button>
            )
        }
        else {
            return (
                <Stack flexDirection={"column"} gap={1}>
                    <Button variant="contained" color="primary" fullWidth onClick={handleStartOrRetake}>
                        Retake Test
                    </Button>
                    <Button variant="outlined" color="primary" fullWidth onClick={handleViewResult}>
                        View Result
                    </Button>
                </Stack>
            )
        }
    }


    if (test.has_expired && !test.has_taken_test) {
        return (
            <Button variant="contained" color="primary" disabled fullWidth >
                Test Expired
            </Button>
        )
    }
    if (test.is_scheduled) {
        const now = Date.now();
        const startTime = new Date(test.start_datetime).getTime();
        const hasStarted = now >= startTime;

        if (!hasStarted) {
            return (
                <Button variant="contained" color="primary" disabled fullWidth>
                    Test Starts at {formatDateTime(test.start_datetime)}
                </Button>
            );
        }
    }

    return <Button variant="contained" color="primary" fullWidth onClick={handleStartOrRetake}>
        Start Test
    </Button>;
};

export default TestActionButton;
