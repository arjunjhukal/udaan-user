import {
    Box,
    Button,
    CircularProgress,
    OutlinedInput,
    Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import { PATH } from "../../../../routes/PATH";
import { useResendOtpMutation, useVerifyOtpMutation } from "../../../../services/authApi";
import { setCredentials } from "../../../../slice/authSlice";
import { showToast } from "../../../../slice/toastSlice";
import { useAppDispatch } from "../../../../store/hook";
import AuthHeader from "../../../molecules/AuthHeader";

// Validation schema
const validationSchema = Yup.object({
    otp: Yup.string()
        .length(6, "OTP must be 6 digits")
        .matches(/^\d+$/, "OTP must contain only digits")
        .required("Please enter the OTP"),
});

export default function VerifyOTP() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [phone, setPhone] = useState<string>("");
    const [isCheckingPhone, setIsCheckingPhone] = useState(true);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const phoneNumber = searchParams.get("phone");

        if (!phoneNumber) {
            dispatch(
                showToast({
                    message: "Phone number not found. Please login again.",
                    severity: "error"
                })
            );
            navigate(PATH.AUTH.LOGIN.ROOT, { replace: true });
            return;
        }

        setPhone(phoneNumber);
        setIsCheckingPhone(false);
    }, [searchParams, navigate, dispatch]);

    const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
    const [resendOtp, { isLoading: isSending }] = useResendOtpMutation();

    // Formik setup
    const formik = useFormik({
        initialValues: {
            otp: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            if (!phone) {
                dispatch(
                    showToast({
                        message: "Phone number not found.",
                        severity: "error"
                    })
                );
                navigate(PATH.AUTH.LOGIN.ROOT, { replace: true });
                return;
            }

            try {
                const response = await verifyOtp({
                    phone: phone,
                    otp: values.otp
                }).unwrap();

                dispatch(
                    showToast({
                        message: response.message || "OTP verified successfully.",
                        severity: "success"
                    })
                );

                dispatch(
                    setCredentials(
                        {
                            token: response?.data?.token,
                            user: response?.data?.user,
                        }
                    )
                )
                navigate(PATH.DASHBOARD.ROOT);

            } catch (e: any) {
                dispatch(
                    showToast({
                        message: e?.data?.message || "Invalid OTP. Please try again.",
                        severity: "error"
                    })
                );
            }
        },
    });

    const getOtpArray = (otp: string) => {
        const split = otp.split("");
        while (split.length < 6) split.push("");
        return split.slice(0, 6);
    };

    const otpArray = getOtpArray(formik.values.otp);



    const handleChange = (value: string, index: number) => {
        if (!/^\d*$/.test(value)) return;

        const newOtpArray = [...otpArray];
        newOtpArray[index] = value;
        const newOtp = newOtpArray.join("").replace(/\s/g, "");

        formik.setFieldValue("otp", newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Fixed: Proper typing for keyboard event
    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) => {
        if (e.key === "Backspace" && !otpArray[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Fixed: Proper typing for clipboard event
    const handlePaste = (
        e: React.ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").trim();

        if (!/^\d+$/.test(pastedData)) return;

        const digits = pastedData.slice(0, 6);
        formik.setFieldValue("otp", digits);

        const nextIndex = Math.min(digits.length, 5);
        inputRefs.current[nextIndex]?.focus();
    };

    // Handle resend OTP
    const handleResendOTP = async () => {
        if (!phone) {
            dispatch(
                showToast({
                    message: "Phone number not found.",
                    severity: "error"
                })
            );
            navigate(PATH.AUTH.LOGIN.ROOT, { replace: true });
            return;
        }

        try {
            const response = await resendOtp({ phone }).unwrap();

            dispatch(
                showToast({
                    message: response.message || "OTP sent successfully.",
                    severity: "success"
                })
            );

            // Clear OTP fields and focus first input
            formik.resetForm();
            inputRefs.current[0]?.focus();

        } catch (e: any) {
            dispatch(
                showToast({
                    message: e?.data?.message || "Unable to send OTP.",
                    severity: "error"
                })
            );
        }
    };

    // Show loading while checking phone number
    if (isCheckingPhone) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "50vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <AuthHeader
                title="OTP Verification"
                description="Please enter One time password sent to your registered email address/ phone no. to complete your verification."
            />

            <Typography
                textAlign="center"
                sx={{ mb: 3, fontSize: { xs: 14, lg: 16 } }}
            >
                We've sent a 6-digit code to{" "}
                <strong style={{ color: "#1976d2" }}>{phone}</strong>
            </Typography>

            <form onSubmit={formik.handleSubmit}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 1.5,
                        mb: 2,
                    }}
                >
                    {otpArray.map((digit, index) => (
                        <OutlinedInput
                            key={index}
                            inputRef={(el) => {
                                inputRefs.current[index] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            inputProps={{
                                maxLength: 1,
                                style: {
                                    textAlign: "center",
                                    fontSize: 24,
                                    fontWeight: 600,
                                    padding: 0,
                                },
                            }}
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={handlePaste}
                            error={formik.touched.otp && Boolean(formik.errors.otp)}
                            sx={{
                                width: { xs: 45, sm: 56 },
                                height: { xs: 50, sm: 60 },
                                "& input": {
                                    height: "100%",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#1976d2",
                                    borderWidth: 2,
                                },
                            }}
                        />
                    ))}
                </Box>

                {/* Error Message */}
                {formik.touched.otp && formik.errors.otp && (
                    <Typography
                        color="error"
                        textAlign="center"
                        sx={{ mb: 2, fontSize: 14 }}
                    >
                        {formik.errors.otp}
                    </Typography>
                )}

                <Typography
                    variant="subtitle1"
                    textAlign="end"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                >
                    Didn't get the code?
                    <Button
                        variant="text"
                        color="primary"
                        onClick={handleResendOTP}
                        disabled={isSending}
                        sx={{ textTransform: "none" }}
                    >
                        {isSending ? "Sending..." : "Send Again"}
                    </Button>
                </Typography>

                {/* Verify Button */}
                <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    disabled={isLoading || !formik.isValid}
                    sx={{ mb: 3, py: 1.5 }}
                >
                    {isLoading ? (
                        <>
                            <CircularProgress size={20} sx={{ mr: 1 }} color="inherit" />
                            Verifying...
                        </>
                    ) : (
                        "Verify OTP"
                    )}
                </Button>
            </form>
        </>
    );
}