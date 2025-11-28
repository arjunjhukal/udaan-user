import { Button, CircularProgress } from '@mui/material';
import CryptoJS from 'crypto-js';
import { TickCircle } from 'iconsax-reactjs';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { usePurchaseCourseMutation } from '../../../../services/courseApi';
import { showToast } from '../../../../slice/toastSlice';
import { useAppDispatch } from '../../../../store/hook';

const ESEWA_SECRET_KEY = import.meta.env.VITE_ESEWA_SECRET_KEY;

export default function PurchaseSuccess() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const [verifying, setVerifying] = useState(true);
    const [_verified, setVerified] = useState(false);

    const [verifyPaymentAPI] = usePurchaseCourseMutation();

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                // Get the encoded data from query params
                const encodedData = searchParams.get('data');

                if (!encodedData) {
                    dispatch(showToast({
                        message: "Invalid payment response",
                        severity: "error"
                    }));
                    navigate(`/courses/${id}`);
                    return;
                }

                // Decode base64 response
                const decodedData = JSON.parse(atob(encodedData));

                console.log('Decoded eSewa Response:', decodedData);

                // Verify signature
                const message = `transaction_code=${decodedData.transaction_code},status=${decodedData.status},total_amount=${decodedData.total_amount},transaction_uuid=${decodedData.transaction_uuid},product_code=${decodedData.product_code},signed_field_names=${decodedData.signed_field_names}`;

                console.log('Signature verification message:', message);

                const hash = CryptoJS.HmacSHA256(message, ESEWA_SECRET_KEY);
                const generatedSignature = CryptoJS.enc.Base64.stringify(hash);

                if (generatedSignature !== decodedData.signature) {
                    console.error('Signature mismatch:', {
                        generated: generatedSignature,
                        received: decodedData.signature
                    });
                    dispatch(showToast({
                        message: "Payment verification failed - Invalid signature",
                        severity: "error"
                    }));
                    navigate(`/courses/${id}`);
                    return;
                }

                console.log('Signature verified successfully');

                const backendPayload = {
                    payment_method: "esewa" as const,
                    transaction_amount: decodedData.total_amount,
                    transaction_status: (decodedData.status === "COMPLETE" ? "success" : "failed") as "success" | "failed" | "pending",
                    transaction_id: decodedData.transaction_uuid,
                    reference_id: decodedData.transaction_code,
                    is_trial: false,
                    course_type: "expiry",
                    subscription_id: null
                };

                console.log('Sending to backend:', backendPayload);

                const response = await verifyPaymentAPI({
                    body: backendPayload,
                    id: Number(id)
                }).unwrap();

                console.log('Backend verification response:', response);

                setVerified(true);
                dispatch(showToast({
                    message: response?.message || "Payment successful!",
                    severity: "success"
                }));
            } catch (error: any) {
                console.error('Payment verification error:', error);
                dispatch(showToast({
                    message: error?.data?.message || "Payment verification failed",
                    severity: "error"
                }));
                navigate(`/courses/${id}`);
            } finally {
                setVerifying(false);
            }
        };

        verifyPayment();
    }, [searchParams, id, navigate, dispatch, verifyPaymentAPI]);

    if (verifying) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <CircularProgress />
                <p>Verifying your payment...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
            <TickCircle size={80} variant="Bold" className="text-green-500" />
            <h1 className="text-3xl font-bold">Payment Successful!</h1>
            <p className="text-gray-600">Your course purchase has been completed successfully.</p>
            <div className="flex gap-4 mt-4">
                <Button
                    variant="contained"
                    onClick={() => navigate(`/courses/${id}`)}
                >
                    Go to Course
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => navigate('/courses')}
                >
                    Browse More Courses
                </Button>
            </div>
        </div>
    );
}