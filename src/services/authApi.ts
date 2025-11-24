import { createApi } from "@reduxjs/toolkit/query/react";
import type {
	LoginUserProps,
	RegisterUserProps,
	UserResponse,
} from "../types/user";
import { baseQuery } from "./baseQuery";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: baseQuery,
	endpoints: (builder) => ({
		register: builder.mutation<UserResponse, RegisterUserProps>({
			query: (body) => ({
				url: "/auth/register",
				method: "POST",
				body,
			}),
		}),
		verifyOtp: builder.mutation<UserResponse, LoginUserProps>({
			query: (body) => ({
				url: "/auth/verify-otp",
				method: "POST",
				body,
			}),
		}),
		resendOtp: builder.mutation<UserResponse, { phone: string }>({
			query: ({ phone }) => ({
				url: "/auth/resend-otp",
				method: "POST",
				body: { phone },
			}),
		}),
	}),
});

export const { useRegisterMutation, useVerifyOtpMutation, useResendOtpMutation } = authApi;
