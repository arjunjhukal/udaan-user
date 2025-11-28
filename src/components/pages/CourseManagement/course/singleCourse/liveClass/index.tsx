import type { TestList } from "../../../../../../types/question";

import { useEffect, useState } from "react";
import Paginations from "../../../../../molecules/Paginations";
import LiveClassCard from "../../../../../organism/Cards/LiveClassCard";
import PageHeader from "../../../../../organism/PageHeader";
import TableFilter from "../../../../../organism/TableFilter";

interface Props {
    data?: TestList;
    isLoading: boolean;
}

export interface LiveClassProps {
    id: number;
    name: string;
    duration: {
        hours: number;
        minutes: number;
    }
    teacher: string;
    description: string;
    start_datetime: string;
    end_datetime: string;
    activeStudents: number;
}

const liveClass: LiveClassProps[] = [{
    id: 1,
    name: "Test 1",
    teacher: "Prof. Saugat Maharjan",
    duration: {
        hours: 1,
        minutes: 30,
    },
    description: "This is a test description",
    start_datetime: "2023-08-01T10:00:00Z",
    end_datetime: "2023-08-01T12:00:00Z",
    activeStudents: 10,
},
{
    id: 2,
    name: "Test 2",
    duration: {
        hours: 1,
        minutes: 30,
    },
    teacher: "Prof. Saugat Maharjan",
    description: "This is a test description",
    start_datetime: "2026-08-01T10:00:00Z",
    end_datetime: "2026-08-01T12:00:00Z",
    activeStudents: 10,
},
{
    id: 3,
    name: "Test 3",
    duration: {
        hours: 1,
        minutes: 30,
    },
    teacher: "Prof. Saugat Maharjan",
    description: "This is a test description",
    start_datetime: "2023-08-01T10:00:00Z",
    end_datetime: "2023-08-01T12:00:00Z",
    activeStudents: 10,
}
]

export default function SinlgeCourseLiveClass({ data, isLoading }: Props) {
    const [testData, setTestData] = useState(liveClass);
    const [search, setSearch] = useState<string>("");
    const [qp, setQp] = useState({
        pageIndex: 1,
        pageSize: 8,
    });

    console.log(isLoading);
    console.log(data);



    useEffect(() => {
        const filteredData = liveClass.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );
        setTestData(filteredData);
    }, [search]);

    const onFilter = () => { };

    return (
        <>
            <PageHeader
                breadcrumb={[
                    {
                        title: "Live Classes",
                    },
                ]}
            />
            <TableFilter search={search} setSearch={setSearch} onFilter={onFilter} />
            <div className="flex gap-6">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
                    {testData.map((test, index) => (
                        <LiveClassCard key={index} data={test} />
                    ))}
                </div>


            </div>

            <Paginations qp={qp} setQp={setQp} totalPages={10} />
        </>
    );
}


