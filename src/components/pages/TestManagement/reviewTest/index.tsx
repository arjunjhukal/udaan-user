import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useReviewTestResultQuery } from "../../../../services/testApi";

export default function ReviewTestRoot() {
    const { courseId, testId } = useParams();
    const { data } = useReviewTestResultQuery({ courseId: Number(courseId), testId: Number(testId) });
    return (
        <div className="test__review__root">
            <Typography className="textLg">{data?.data?.test_name}</Typography>
        </div>
    )
}
