import { createApi } from "@reduxjs/toolkit/query/react";
import type { McqReportData, McqSubmissionPayload, McqSubmissionResponse, SingleMcqResponse } from "../types/question";
import type { GlobalResponse } from "../types/user";
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
        uploadSubjectiveAnswers: builder.mutation<GlobalResponse & {
            data: {
                media_id: number;
                media_url: string
            }[]
        }, { courseId: number; testId: number, questionId: number, body: FormData }>({
            query: ({ courseId, testId, questionId, body }) => ({
                url: `/course/${courseId}/test/${testId}/subjective/${questionId}/media`,
                method: "POST",
                body: body
            })
        }),
        getSubjectiveAnswer: builder.query<GlobalResponse & {
            data: {
                media_id: number;
                media_url: string
            }[]
        }, { courseId: number; testId: number, questionId: number }>({
            query: ({ courseId, testId, questionId }) => ({
                url: `/course/${courseId}/test/${testId}/subjective/${questionId}/media`,
                method: "GET",
            })
        }),
        deleteSubjectiveAnswers: builder.mutation<GlobalResponse & {
            data: {
                media_id: number;
                media_url: string
            }[]
        }, { courseId: number; testId: number, questionId: number, mediaId: number }>({
            query: ({ courseId, testId, questionId, mediaId }) => ({
                url: `/course/${courseId}/test/${testId}/subjective/${questionId}/media/${mediaId}`,
                method: "DELETE",
            })
        }),
        reviewTestResult: builder.query<{ data: McqReportData }, { courseId: number; testId: number }>({
            query: ({ courseId, testId }) => ({
                url: `/course/${courseId}/test/${testId}/review`,
                method: "GET",
            })
        }),
        submitSubjectiveFinal: builder.mutation<GlobalResponse, { courseId: number; testId: number, questionId: number }>({
            query: ({ courseId, testId, questionId }) => ({
                url: `/course/${courseId}/test/${testId}/subjective/${questionId}/submit`,
                method: "POST",
            })
        })
    })
})

export const {
    useGetTestByIdQuery,
    useSubmitMcqMutation,
    useReviewTestResultQuery,
    useUploadSubjectiveAnswersMutation,
    useDeleteSubjectiveAnswersMutation,
    useGetSubjectiveAnswerQuery,
    useSubmitSubjectiveFinalMutation
} = testApi;