import { createApi } from "@reduxjs/toolkit/query/react";
import type { CategoryFilterParams, QueryParams } from "../types";
import type { CourseList, CourseProps, courseTabType, CurriculumList, CurriculumProps } from "../types/course";
import type { MediaList } from "../types/media";
import type { TestList } from "../types/question";
import { buildQueryParams } from "../utils/buildQueryParams";
import { baseQuery } from "./baseQuery";

export const courseApi = createApi({
    reducerPath: "courseApi",
    baseQuery: baseQuery,
    tagTypes: ["Course", "Curriculum", "Media"],
    endpoints: (builder) => ({

        getAllCourse: builder.query<CourseList, QueryParams & { categoryFilter?: CategoryFilterParams }>({
            query: ({ pageIndex, pageSize, search, categoryFilter }) => {
                // const params = new URLSearchParams();
                const queryString = buildQueryParams({
                    page: pageIndex,
                    page_size: pageSize,
                    search: search,
                    mega_categories: categoryFilter?.mega_category,
                    categories: categoryFilter?.category,
                    sub_categories: categoryFilter?.sub_category,
                    positions: categoryFilter?.positions,
                })
                return {
                    url: `/course?${queryString}`,
                    method: "GET",
                };
            },
            providesTags: (result) =>
                result?.data?.data
                    ? [
                        ...result.data.data.map((course) => ({ type: "Course" as const, id: course.id })),
                        { type: "Course", id: "LIST" },
                    ]
                    : [{ type: "Course", id: "LIST" }],
        }),

        getCourseById: builder.query<{ data: CourseProps }, { id: number }>({
            query: ({ id }) => ({
                url: `/course/${id}`,
                method: "GET",
            }),
            providesTags: (_result, _error, { id }) => [{ type: "Course", id }],
        }),

        getCourseOverviewById: builder.query<{ data: CourseProps }, { id: number }>({
            query: ({ id }) => ({
                url: `/course/${id}/overview`,
                method: "GET",
            }),
            providesTags: (_result, _error, { id }) => [{ type: "Course", id }],
        }),

        getCourseCurriculumById: builder.query<CurriculumList, { id: number }>({
            query: ({ id }) => ({
                url: `/course/${id}/curriculum/`,
                method: "GET",
            }),
            providesTags: (_result, _error, { id }) => [{ type: "Curriculum", id }],
        }),

        getCourseMediaByType: builder.query<MediaList, { id: string | null; type: courseTabType }>({
            query: ({ id, type }) => {
                const queryString = buildQueryParams({ type });

                return {
                    url: `/course/${id}/media?${queryString}`,
                    method: "GET",
                };
            },
            providesTags: (result) =>
                result?.data?.data
                    ? [
                        ...result.data.data.map((curriculum) => ({ type: "Media" as const, id: curriculum.id })),
                        { type: "Media", id: "LIST" },
                    ]
                    : [{ type: "Media", id: "LIST" }],
        }),

        getCourseTest: builder.query<TestList, QueryParams & { id: number }>({
            query: ({ id, pageIndex, pageSize, search }) => {
                const queryString = buildQueryParams({
                    page: pageIndex,
                    page_size: pageSize,
                    search: search,
                })
                return ({
                    url: `/course/${id}/test?${queryString}`,
                    method: "GET"
                })
            }
        })
    })
})

export const {
    useGetAllCourseQuery,
    useGetCourseByIdQuery,
    useGetCourseOverviewByIdQuery,
    useGetCourseCurriculumByIdQuery,
    useGetCourseMediaByTypeQuery,
    useGetCourseTestQuery
} = courseApi;