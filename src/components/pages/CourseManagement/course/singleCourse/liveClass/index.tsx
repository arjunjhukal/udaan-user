import type { LiveClassList } from "../../../../../../types/liveClass";

import LiveClassCard from "../../../../../organism/Cards/LiveClassCard";
import PageHeader from "../../../../../organism/PageHeader";

interface Props {
    data?: LiveClassList;
    isLoading: boolean;
}



export default function SinlgeCourseLiveClass({ data, isLoading }: Props) {
    console.log(isLoading);
    return (
        <>
            <PageHeader
                breadcrumb={[
                    {
                        title: "Live Classes",
                    },
                ]}
            />
            <div className="flex gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
                    {data?.data?.data?.map((test, index) => (
                        <LiveClassCard key={index} data={test} />
                    ))}
                </div>
            </div>
        </>
    );
}


