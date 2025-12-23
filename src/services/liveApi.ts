import { createApi } from "@reduxjs/toolkit/query/react";
import type { LiveClassList } from "../types/liveClass";
import { baseQuery } from "./baseQuery";

export const liveClassApi = createApi({
    reducerPath: "liveClassApi",
    baseQuery: baseQuery,
    tagTypes: ["LiveClass"],
    endpoints: (builder) => ({
        getAllLiveClasses: builder.query<LiveClassList, { pageIndex: number; pageSize: number, type: "ongoing" | "upcoming" }>({
            query: ({ pageIndex, pageSize, type }) => ({
                url: `/my-live?page=${pageIndex}&page_size=${pageSize}&type=${type}`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetAllLiveClassesQuery } = liveClassApi;