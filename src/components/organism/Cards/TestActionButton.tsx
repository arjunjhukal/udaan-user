import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../routes/PATH";
import { setPurchase } from "../../../slice/purchaseSlice";

const TestActionButton = ({ test, status, havePurchased, id }: any) => {
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

    if (!havePurchased) {
        return (
            <Button variant="contained" color="primary" fullWidth onClick={handleStartOrRetake}>
                Purchase Test
            </Button>
        );
    }

    if (test.has_expired || status === "ended") {
        if (test.has_taken_test && test.is_graded) {
            return (
                <Button variant="contained" color="primary" fullWidth onClick={handleViewResult}>
                    View Result
                </Button>
            );
        } else {
            return (
                <Button variant="contained" disabled fullWidth>
                    Test Ended
                </Button>
            );
        }
    }

    // Case: Not scheduled but graded → show both Retake and View Result
    if (!test.is_scheduled && test.is_graded) {
        return (
            <Box display="flex flex-col gap-2" gap={2}>
                <Button variant="outlined" color="primary" fullWidth onClick={handleStartOrRetake}>
                    Retake Test
                </Button>
                <Button variant="contained" color="primary" fullWidth onClick={handleViewResult}>
                    View Result
                </Button>
            </Box>
        );
    }

    // Taken & not graded → Retake Test
    if (test.has_taken_test && !test.is_graded) {
        return (
            <Button variant="outlined" color="primary" fullWidth onClick={handleStartOrRetake}>
                View Result
            </Button>
        );
    }

    // Ongoing and scheduled → Start Test
    if (status === "ongoing" && test.is_scheduled) {
        return (
            <Button variant="contained" color="primary" fullWidth onClick={handleStartOrRetake}>
                Start Test
            </Button>
        );
    }

    return <Button variant="contained" color="primary" fullWidth onClick={handleStartOrRetake}>
        Start Test
    </Button>;
};

export default TestActionButton;
