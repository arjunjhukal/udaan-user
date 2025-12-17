import { Button } from '@mui/material';
import { useFormik } from 'formik';
import { ArrowLeft } from 'iconsax-reactjs';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetCourseByIdQuery, usePurchaseCourseWithEsewaQuery } from "../../../services/courseApi";
import { showToast } from '../../../slice/toastSlice';
import { useAppDispatch } from '../../../store/hook';
import type { PaymentOption, PurchaseFormValues } from "../../../types/purchase";
import PageHeader from '../../organism/PageHeader';
import CoursePaymentCard from './CoursePaymentCard';
import PurchasePaymentOption from './PurchasePaymentOption';

// eSewa Configuration
export const ESEWA_CONFIG = {
    PAYMENT_URL: import.meta.env.VITE_ESEWA_PAYMENT_URL,
} as const;


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
    const paymentOptions: PaymentOption[] = [
        { id: 1, label: "Esewa", value: "esewa", image: "/esewa.svg" },
        { id: 2, label: "Khalti", value: "khalti", image: "/khalti.svg" },
    ];

    const { data } = useGetCourseByIdQuery({ id: Number(id) }, { skip: !id });
    const { data: coursePurchaseData, isLoading } = usePurchaseCourseWithEsewaQuery({ id: Number(id) }, { skip: !id });

    const price = Number(data?.data?.sale_price) || 0;
    const vat = price * 0.13;
    const total = price + vat;

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
                if (values.paymentOption === "esewa" && !isLoading && coursePurchaseData) {
                    const paymentData = coursePurchaseData?.data;

                    // eSewa requires specific field names in signed_field_names
                    const esewaParams = {
                        amount: paymentData?.amount,
                        tax_amount: paymentData?.tax_amount,
                        total_amount: paymentData?.total_amount,
                        transaction_uuid: paymentData?.transaction_uuid,
                        product_code: paymentData?.product_code,
                        product_service_charge: paymentData?.product_service_charge || "0",
                        product_delivery_charge: paymentData?.product_delivery_charge || "0",
                        success_url: successUrl,
                        failure_url: failureUrl,
                        signed_field_names: "total_amount,transaction_uuid,product_code",
                        signature: paymentData?.signature,
                    };


                    submitEsewaForm(ESEWA_CONFIG.PAYMENT_URL, esewaParams);
                } else if (values.paymentOption === "khalti") {
                    dispatch(showToast({
                        message: "Payment initiated successfully.",
                        severity: "success"
                    }));
                }
            } catch (e: any) {
                console.error("Payment Error:", e);
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
                    <PurchasePaymentOption
                        options={paymentOptions}
                        selected={formik.values.paymentOption}
                        onSelect={(value) => formik.setFieldValue("paymentOption", value)}
                    />

                    <CoursePaymentCard
                        price={price}
                        vat={vat}
                        total={total}
                        isLoading={isLoading}
                    />
                </div>
            </form>
        </div>
    );
}