import { Box, Skeleton, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetAllCategoryQuery } from "../../../../../services/categoryApi";
import { useGetAllCourseQuery } from "../../../../../services/courseApi";
import { EmptyList } from "../../../../molecules/EmptyList";
import TablePagination from "../../../../molecules/Pagination";
import TabController from "../../../../molecules/TabController";
import CourseCard from "../../../../organism/Cards/CourseCard/CourseCard";
import TableFilter from "../../../../organism/TableFilter";

export default function CourseListing() {
    const theme = useTheme();
    const [qp, setQp] = useState({
        pageIndex: 1,
        pageSize: 8,
    })
    const [activeCategory, setActiveCategory] = useState(0);
    const [search, setSearch] = useState("");
    const [options, setOptions] = useState<{ label: string; value: number }[]>([]);

    const { data, isLoading } = useGetAllCourseQuery({
        ...qp, search,
        ...(activeCategory !== 0 && {
            categoryFilter: {
                mega_category: [activeCategory],
            },
        })
    });
    const { data: categories } = useGetAllCategoryQuery({ pageIndex: 1, pageSize: 10 });
    const courses = data?.data?.data || [];
    const pagination = data?.data?.pagination || null;


    useEffect(() => {
        const list = categories?.data || [];

        const formatted = list.map((category) => ({
            label: category.name,
            value: Number(category?.id),
        }));

        setOptions([{ label: "All", value: 0 }, ...formatted]);
    }, [categories]);



    return (
        <>
            <Box className="flex flex-col justify-between gap-4 mb-4 lg:mb-8">
                <TabController
                    options={options}
                    currentActive={activeCategory}
                    setActiveTab={(val) => setActiveCategory(val)}
                />
                <TableFilter categoryLayout={true} search={search} setSearch={(newVal) => setSearch(newVal)} onFilter={() => { }} />
            </Box>
            {courses.length ? <div className="flex flex-col gap-4 lg:gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
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
            </div> : <EmptyList
                title="No Course Found"
                description=""

            />}
            {pagination && pagination?.total_pages > 1 ? <TablePagination
                qp={qp}
                setQp={setQp}
                totalPages={pagination?.total_pages || 0}
            /> : ""}
        </>
    )
}
