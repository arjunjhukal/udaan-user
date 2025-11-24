import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store/store";

import { v4 as uuidv4 } from "uuid";

const getDeviceId = () => {
	let deviceId = localStorage.getItem("device_id");
	if (!deviceId) {
		deviceId = uuidv4();
		localStorage.setItem("device_id", deviceId);
	}
	return deviceId;
};
export const baseQuery = fetchBaseQuery({
	baseUrl: (import.meta.env.VITE_API_BASE_URL || "") + "/api/v1",
	credentials: "include",
	prepareHeaders: (headers, { getState }) => {
		// Get access_token from the auth slice
		const accessToken = (getState() as RootState).auth?.token;


		headers.set("X-Device-Id", getDeviceId());
		headers.set("X-Device-Type", "web");
		if (accessToken) {
			headers.set("Authorization", `Bearer ${accessToken?.access_token}`);
		}

		return headers;
	},
});
