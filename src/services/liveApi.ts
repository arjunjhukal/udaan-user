import { createApi } from "@reduxjs/toolkit/query/react";
import type { LiveClassList } from "../types/liveClass";
import { baseQuery } from "./baseQuery";

export const liveClassApi = createApi({
    reducerPath: "liveClassApi",
    baseQuery: baseQuery,
    tagTypes: ["LiveClass"],
    endpoints: (builder) => ({
        getAllLiveClasses: builder.query<LiveClassList, { pageIndex: number; pageSize: number, type: "ongoing" | "upcoming"; id?: number }>({
            query: ({ pageIndex, pageSize, type, id }) => ({
                url: `/my-live?page=${pageIndex}&page_size=${pageSize}&type=${type}&course_id=${id}`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetAllLiveClassesQuery } = liveClassApi;