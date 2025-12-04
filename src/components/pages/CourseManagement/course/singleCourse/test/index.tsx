import type { TestList } from "../../../../../../types/question";

import { Box } from "@mui/material";
import TestCard from "../../../../../organism/Cards/TestCard";

interface Props {
    data?: TestList;
    isLoading: boolean;
}
export default function SinlgeCourseTest({ data, isLoading }: Props) {
    console.log(isLoading);
    return (
        <>
            <Box mt={1}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data?.data?.data?.map((test, index) => (
                        <TestCard key={index} test={test} />
                    ))}
                </div>
            </Box>
        </>
    );
}

