import { createApi } from "@reduxjs/toolkit/query/react";
import type { McqReportData, McqSubmissionPayload, McqSubmissionResponse, SingleMcqResponse } from "../types/question";
import { baseQuery } from "./baseQuery";

export const testApi = createApi({
    reducerPath: "testApi",
    baseQuery: baseQuery,
    tagTypes: ["Test"],
    endpoints: (builder) => ({
        getTestById: builder.query<SingleMcqResponse, { courseId: number; testId: number }>({
            query: ({ courseId, testId }) => ({
                url: `/course/${courseId}/test/${testId}`,
                method: "GET",
            }),

        }),
        submitMcq: builder.mutation<McqSubmissionResponse, { body: McqSubmissionPayload, courseId: number; testId: number }>({
            query: ({ courseId, testId, body }) => ({
                url: `/course/${courseId}/test/${testId}/mcq`,
                method: "POST",
                body
            })
        }),
        reviewTestResult: builder.query<{ data: McqReportData }, { courseId: number; testId: number }>({
            query: ({ courseId, testId }) => ({
                url: `/course/${courseId}/test/${testId}/review`,
                method: "GET",
            })
        })
    })
})

export const {
    useGetTestByIdQuery,
    useSubmitMcqMutation,
    useReviewTestResultQuery
} = testApi;