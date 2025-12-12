import type { TestList } from "../../../../../../types/question";

import { Box } from "@mui/material";
import type { QueryParams } from "../../../../../../types";
import { EmptyList } from "../../../../../molecules/EmptyList";
import TablePagination from "../../../../../molecules/Pagination";
import TestCard from "../../../../../organism/Cards/TestCard";

interface Props {
    data?: TestList;
    isLoading: boolean;
    qp: QueryParams;
    setQp: (qp: QueryParams) => void;
    totalPages: number;
    havePurchased :boolean;
}
export default function SinlgeCourseTest({ data, isLoading, totalPages, qp, setQp ,havePurchased}: Props) {
    if (!isLoading && !data?.data?.data?.length) {
        return <EmptyList
            title="No Test Found"
            description=""
        />
    }
    return (
        <>
            <Box mt={1}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data?.data?.data?.map((test, index) => (
                        <TestCard key={index} test={test} havePurchased={havePurchased}/>
                    ))}
                </div>
                {totalPages > 1 ? <TablePagination qp={qp} setQp={setQp} totalPages={totalPages} /> : ""}
            </Box>
        </>
    );
}

