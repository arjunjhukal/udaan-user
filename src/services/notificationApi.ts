import { createApi } from "@reduxjs/toolkit/query/react";
import type { QueryParams } from "../types";
import type { NotificationListResponse } from "../types/notification";
import type { GlobalResponse } from "../types/user";
import { buildQueryParams } from "../utils/buildQueryParams";
import { baseQuery } from "./baseQuery";

export const notificationApi = createApi({
    reducerPath: "notificationApi",
    baseQuery: baseQuery,
    tagTypes: ["Notifications"],

    endpoints: (builder) => ({
        getAllNotifications: builder.query<NotificationListResponse, QueryParams>({
            query: ({ pageIndex, pageSize }) => {
                const queryParams = buildQueryParams({ page: pageIndex, page_size: pageSize });
                return {
                    url: `/notification?${queryParams}`,
                    method: "GET",
                }
            },
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
