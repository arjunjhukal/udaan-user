import { Button } from '@mui/material';
import CryptoJS from 'crypto-js';
import { useFormik } from 'formik';
import { ArrowLeft } from 'iconsax-reactjs';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetCourseByIdQuery } from "../../../services/courseApi";
import { showToast } from '../../../slice/toastSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import type { PaymentOption, PurchaseFormValues } from "../../../types/purchase";
import PageHeader from '../../organism/PageHeader';
import CoursePaymentCard from './CoursePaymentCard';
import PurchasePaymentOption from './PurchasePaymentOption';

// eSewa Configuration
export const ESEWA_CONFIG = {
    PAYMENT_URL: import.meta.env.VITE_ESEWA_PAYMENT_URL,
    SECRET_KEY: import.meta.env.VITE_ESEWA_SECRET_KEY,
    PRODUCT_CODE: import.meta.env.VITE_ESEWA_PRODUCT_CODE,
} as const;

// Validate that all required environment variables are set
if (!ESEWA_CONFIG.PAYMENT_URL || !ESEWA_CONFIG.SECRET_KEY || !ESEWA_CONFIG.PRODUCT_CODE) {
    console.error('Missing eSewa configuration. Please check your .env file.');
}

function generateEsewaSignature(message: string, secretKey: string): string {
    const hash = CryptoJS.HmacSHA256(message, secretKey);
    return CryptoJS.enc.Base64.stringify(hash);
}

function submitEsewaForm(action: string, params: Record<string, any>) {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = action;

    Object.keys(params).forEach(key => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = params[key];
        form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
}

export default function PurchaseLayout() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const user = useAppSelector((state) => state.auth.user);
    const paymentOptions: PaymentOption[] = [
        { id: 1, label: "Esewa", value: "esewa", image: "/esewa.svg" },
        { id: 2, label: "Khalti", value: "khalti", image: "/khalti.svg" },
    ];

    const { data } = useGetCourseByIdQuery({ id: Number(id) }, { skip: !id });

    const price = Number(data?.data?.sale_price) || 0;
    const vat = price * 0.13;
    const total = price + vat;

    // Get the base URL for success/failure redirects
    const baseUrl = window.location.origin;
    const successUrl = `${baseUrl}/courses/${id}/purchase/success`;
    const failureUrl = `${baseUrl}/courses/${id}/purchase/failure`;

    const formik = useFormik<PurchaseFormValues>({
        initialValues: {
            paymentOption: "esewa",
            amount: total,
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                if (values.paymentOption === "esewa") {

                    const transactionUuid = `TXN-${user?.id}-${id}-${Date.now()}`;

                    const amount = price.toFixed(2);
                    const taxAmount = vat.toFixed(2);
                    const totalAmount = total.toFixed(2);

                    const message = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${ESEWA_CONFIG.PRODUCT_CODE}`;
                    const signature = generateEsewaSignature(message, ESEWA_CONFIG.SECRET_KEY);

                    // Prepare eSewa form parameters
                    const esewaParams = {
                        amount: amount,
                        tax_amount: taxAmount,
                        total_amount: totalAmount,
                        transaction_uuid: transactionUuid,
                        product_code: ESEWA_CONFIG.PRODUCT_CODE,
                        product_service_charge: "0",
                        product_delivery_charge: "0",
                        success_url: successUrl,
                        failure_url: failureUrl,
                        signed_field_names: "total_amount,transaction_uuid,product_code",
                        signature: signature,
                    };

                    // Optional: Save transaction to backend before redirecting

                    // Submit form to eSewa
                    submitEsewaForm(ESEWA_CONFIG.PAYMENT_URL, esewaParams);
                } else if (values.paymentOption === "khalti") {

                    dispatch(showToast({
                        message: "Payment initiated successfully.",
                        severity: "success"
                    }));
                }
            } catch (e: any) {
                dispatch(showToast({
                    message: e?.data?.message || "Unable to proceed for payment. Try Again Later.",
                    severity: "error"
                }));
            }
        }
    });

    return (
        <div className="purchase__options">
            <Button
                variant="text"
                startIcon={<ArrowLeft />}
                onClick={() => navigate(-1)}
            >
                Back to Course Details
            </Button>

            <PageHeader
                breadcrumb={[{ title: "Choose Payment" }]}
                description="Choose the payment according to your will."
            />

            <form onSubmit={formik.handleSubmit}>
                <div className="grid md:grid-cols-2 gap-10">
                    {/* Pass selected option + handler + options */}
                    <PurchasePaymentOption
                        options={paymentOptions}
                        selected={formik.values.paymentOption}
                        onSelect={(value) => formik.setFieldValue("paymentOption", value)}
                    />

                    {/* Pass calculated values */}
                    <CoursePaymentCard
                        price={price}
                        vat={vat}
                        total={total}
                    />
                </div>
            </form>
        </div>
    );
}