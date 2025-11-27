import { Box } from "@mui/material";
import { useState } from "react";
import { useGetAllCourseQuery } from "../../../../../services/courseApi";
import CourseCard from "../../../../organism/Cards/CourseCard/CourseCard";

export default function CourseListing() {

    const [qp, setQp] = useState({
        pageIndex: 1,
        pageSize: 8,
        search: ""
    })

    const { data, isLoading } = useGetAllCourseQuery({ ...qp });

    const courses = data?.data?.data || [];

    console.log(isLoading)
    return (
        <>
            <Box className="flex items-center justify-between">
                {/* <TabController />
                <TableFilter categoryLayout={true} search={qp.search} setSearch={(newVal) => setQp({
                    ...qp,
                    search: newVal
                })} onFilter={() => { }} /> */}

            </Box>
            <div className="flex flex-col gap-4 lg:gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {
                    courses.map((course) => (
                        <div className="col-span-1">
                            <CourseCard course={course} />
                        </div>
                    ))
                }
            </div>
        </>
    )
}
