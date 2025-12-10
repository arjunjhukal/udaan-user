import { createApi } from "@reduxjs/toolkit/query/react";
import type { QueryParams } from "../types";
import type { GlobalResponse } from "../types/user";
import { baseQuery } from "./baseQuery";

export const notificationApi = createApi({
    reducerPath: "notificationApi",
    baseQuery: baseQuery,
    tagTypes: ["Notifications"],

    endpoints: (builder) => ({
        getAllNotifications: builder.query<GlobalResponse, QueryParams>({
            query: (params) => ({
                url: `/notification`,
                method: "GET",
                params,
            }),
            providesTags: [{ type: "Notifications", id: "LIST" }],
        }),

        readNotification: builder.mutation<
            GlobalResponse,
            { id?: number }
        >({
            query: ({ id }) => ({
                url: id ? `/notification/${id}` : `/notification`,
                method: "POST",
            }),

            invalidatesTags: [{ type: "Notifications", id: "LIST" }],
        }),
    }),
});

export const {
    useGetAllNotificationsQuery,
    useReadNotificationMutation,
} = notificationApi;
