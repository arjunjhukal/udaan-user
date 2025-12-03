import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { v4 as uuidv4 } from "uuid";
import { showSessionExpired } from "../slice/sessionSlice";
import type { RootState } from "../store/store";

const getDeviceId = () => {
	let deviceId = localStorage.getItem("device_id");
	if (!deviceId) {
		deviceId = uuidv4();
		localStorage.setItem("device_id", deviceId);
	}
	return deviceId;
};

const baseQueryConfig = fetchBaseQuery({
	baseUrl: (import.meta.env.VITE_API_BASE_URL || "") + "/api/v1",
	credentials: "include",
	prepareHeaders: (headers, { getState }) => {
		const accessToken = (getState() as RootState).auth?.token;

		headers.set("X-Device-Id", getDeviceId());
		headers.set("X-Device-Type", "web");

		if (accessToken) {
			headers.set("Authorization", `Bearer ${accessToken?.access_token}`);
		}

		return headers;
	},
});

export const baseQuery: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	const result = await baseQueryConfig(args, api, extraOptions);

	if (result.error) {

		const status = result.error.status;

		if (status === 401 || (result.error.data && (result.error.data as any)?.status === 401)) {


			const state = api.getState() as RootState;

			if (!state.session?.showSessionExpiredPopup) {
				api.dispatch(
					showSessionExpired(
						"Your session has expired due to a login from another device. Please verify it's you to continue."
					)
				);

				// Verify dispatch worked
				setTimeout(() => {
					const newState = api.getState() as RootState;
					console.log("State after dispatch:", newState.session);
				}, 100);
			} else {
				console.log("⚠️ Popup already showing, skipping dispatch");
			}
		}
	}

	return result;
};