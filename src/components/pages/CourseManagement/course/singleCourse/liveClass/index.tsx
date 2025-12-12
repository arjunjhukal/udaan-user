import { useParams } from "react-router-dom";
import { setPurchase } from "../../../../../../slice/purchaseSlice";
import { useAppDispatch } from "../../../../../../store/hook";
import type { QueryParams } from "../../../../../../types";
import type { LiveClassList } from "../../../../../../types/liveClass";
import { EmptyList } from "../../../../../molecules/EmptyList";
import TablePagination from "../../../../../molecules/Pagination";

import LiveClassCard from "../../../../../organism/Cards/LiveClassCard";
import PageHeader from "../../../../../organism/PageHeader";

interface Props {
    data?: LiveClassList;
    isLoading: boolean;
    qp: QueryParams;
    setQp: (qp: QueryParams) => void;
    totalPages: number;
    havePurchased?: boolean;
}



export default function SinlgeCourseLiveClass({ data, totalPages, qp, setQp, isLoading, havePurchased }: Props) {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    if (!isLoading && !havePurchased) {
        return <EmptyList
            title="Unlock Live Classes"
            description="Purchase this course to access all live classes, recordings, and upcoming sessions."
            cta={{
                label: "Purchase Course",
                url: ""
            }}
            onClick={() => {
                dispatch(
                    setPurchase({
                        open: true,
                        courseId: Number(id)
                    })
                )
            }}
        />
    }
    if (!isLoading && !data?.data?.data?.length) {
        return <EmptyList
            title="No Live Classes Available"
            description="There are currently no live classes scheduled for this course. Please check back later!"
        />
    }
    return (
        <>
            <PageHeader
                breadcrumb={[
                    {
                        title: "Live Classes",
                    },
                ]}
            />
            <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
                    {data?.data?.data?.map((test, index) => (
                        <LiveClassCard key={index} data={test} />
                    ))}
                </div>
                {totalPages > 1 ? <TablePagination qp={qp} setQp={setQp} totalPages={totalPages} /> : ""}
            </div>
        </>
    );
}


