import { createApi } from "@reduxjs/toolkit/query/react";
import type { AppSettingProps } from "../types/setting";
import type { GlobalResponse } from "../types/user";
import { baseQuery } from "./baseQuery";

export const settingApi = createApi({
    reducerPath: "settingApi",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getAppSettings: builder.query<GlobalResponse & { data: AppSettingProps }, void>({
            query: () => ({
                url: `/settings`,
                method: "GET",
            }),
        }),

    }),
});

export const {
    useGetAppSettingsQuery,
} = settingApi;
