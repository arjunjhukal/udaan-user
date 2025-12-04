import { Box, Skeleton, useTheme } from "@mui/material";
import { useState } from "react";
import { useGetUserPurchasedCourseQuery } from "../../../../services/courseApi";
import { EmptyList } from "../../../molecules/EmptyList";
import TablePagination from "../../../molecules/Pagination";
import CourseCard from "../../../organism/Cards/CourseCard/CourseCard";
import PageHeader from "../../../organism/PageHeader";
import { PATH } from "../../../../routes/PATH";

export default function MyCourseRoot() {
    const [qp, setQp] = useState({
        pageIndex: 1,
        pageSize: 8,
    });
    const theme = useTheme();
    const { data, isLoading } = useGetUserPurchasedCourseQuery({ ...qp });

    const courses = data?.data?.data || [];
    const pagination = data?.data?.pagination || null;


    return (
        <>
            <PageHeader
                breadcrumb={[{
                    title: "My Course"
                }]}
            />
            {!isLoading && !courses.length ?
                <EmptyList
                    title="No Course Purchased Yet !"
                    description="You are not enrolled in any course yet." cta={{
                        label:"Explore Course",
                        url:PATH.COURSE_MANAGEMENT.COURSES.ROOT
                    }}/> :

                <div className="flex flex-col gap-4 lg:gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                    {isLoading ? Array.from({ length: 8 }).map((_, index) => (
                        <Box
                            className="course__card rounded-md overflow-hidden relative h-full flex flex-col"
                            sx={{ border: `1px solid ${theme.palette.textField.border}` }}
                            key={index.toString()}
                        >

                            <Skeleton variant="rectangular" height={110} width="100%" />

                            <Box className="course__content h-full p-3 bg-slate-50 flex flex-col gap-2 justify-between">
                                <div className="top__content">
                                    {/* Category Badge */}
                                    <Skeleton width={90} height={28} />

                                    {/* Title */}
                                    <Skeleton width="85%" height={25} sx={{ mt: 1.5, mb: 2 }} />

                                    {/* Features (2–3 lines) */}
                                    <Skeleton width="70%" height={18} />
                                    <Skeleton width="50%" height={18} />
                                </div>

                                <div className="footer__content mt-3">
                                    <Skeleton height={1} width="100%" sx={{ mb: 2 }} />

                                    {/* Buttons */}
                                    <div className="grid grid-cols-2 gap-2">
                                        <Skeleton height={38} />
                                        <Skeleton height={38} />
                                    </div>
                                </div>
                            </Box>

                            {/* Status badge */}
                            <Skeleton
                                variant="rectangular"
                                width={60}
                                height={22}
                                sx={{ position: "absolute", top: 8, right: 8, borderRadius: 1 }}
                            />
                        </Box>
                    )) :
                        courses.map((course) => (
                            <div className="col-span-1">
                                <CourseCard course={course} />
                            </div>
                        ))
                    }
                </div>
            }
            <TablePagination
                qp={qp}
                setQp={setQp}
                totalPages={pagination?.total_pages || 0}
            />
        </>
    )
}
