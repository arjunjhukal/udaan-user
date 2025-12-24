import { Button, CircularProgress } from '@mui/material';
import { TickCircle } from 'iconsax-reactjs';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { usePurchaseCourseMutation } from '../../../../services/courseApi';
import { showToast } from '../../../../slice/toastSlice';
import { useAppDispatch } from '../../../../store/hook';

export default function PurchaseSuccess() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const [verifying, setVerifying] = useState(true);
    const [verified, setVerified] = useState(false);

    const [verifyPaymentAPI] = usePurchaseCourseMutation();

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                let backendPayload: any = null;

                // ---------- ESEWA ----------
                const encodedData = searchParams.get('data');
                if (encodedData) {
                    const decodedData = JSON.parse(atob(encodedData));

                    if (decodedData.status !== 'COMPLETE') {
                        throw new Error(`Payment not completed. Status: ${decodedData.status}`);
                    }

                    backendPayload = {
                        payment_method: "esewa" as const,
                        transaction_amount: decodedData.total_amount,
                        transaction_status: "success" as const,
                        transaction_id: decodedData.transaction_uuid,
                        reference_id: decodedData.transaction_code,
                        is_trial: false,
                        course_type: "expiry",
                        subscription_id: null
                    };
                }

                // ---------- KHALTI ----------
                const pidx = searchParams.get('pidx');
                if (!backendPayload && pidx) {
                    const status = searchParams.get('status');

                    if (status !== 'Completed') {
                        throw new Error(`Payment not completed. Status: ${status}`);
                    }

                    backendPayload = {
                        payment_method: "khalti" as const,
                        transaction_amount: Number(
                            searchParams.get('total_amount') || searchParams.get('amount')
                        ),
                        transaction_status: "success" as const,
                        transaction_id:
                            searchParams.get('transaction_id') ||
                            searchParams.get('txnId') ||
                            searchParams.get('tidx'),
                        reference_id: pidx,
                        purchase_order_id: searchParams.get('purchase_order_id'),
                        purchase_order_name: searchParams.get('purchase_order_name'),
                        is_trial: false,
                        course_type: "expiry",
                        subscription_id: null
                    }
                }

                if (!backendPayload) {
                    throw new Error("Invalid payment response");
                }

                const response = await verifyPaymentAPI({
                    body: backendPayload,
                    id: Number(id)
                }).unwrap();

                setVerified(true);
                dispatch(showToast({
                    message: response?.message || "Payment successful! You now have access to the course.",
                    severity: "success"
                }));

            } catch (error: any) {
                console.error('Payment verification error:', error);

                dispatch(showToast({
                    message:
                        error?.data?.message ||
                        error?.message ||
                        "Payment verification failed. Please contact support.",
                    severity: "error"
                }));

                setTimeout(() => {
                    navigate(`/courses/${id}`);
                }, 2000);
            } finally {
                setVerifying(false);
            }
        };

        verifyPayment();
    }, [searchParams, id, navigate, dispatch, verifyPaymentAPI]);


    if (verifying) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <CircularProgress size={60} />
                <h2 className="text-xl font-semibold">Verifying your payment...</h2>
                <p className="text-gray-600">Please wait while we confirm your transaction</p>
            </div>
        );
    }

    if (verified) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4">
                <TickCircle size={80} variant="Bold" className="text-green-500" />

                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
                    <p className="text-gray-600">
                        Your course purchase has been completed successfully.
                        <br />
                        You can now access all course materials.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate(`/courses/${id}`)}
                    >
                        Start Learning
                    </Button>
                    <Button
                        variant="outlined"
                        size="large"
                        onClick={() => navigate('/courses')}
                    >
                        Browse More Courses
                    </Button>
                </div>
            </div>
        );
    }

    return null;
}