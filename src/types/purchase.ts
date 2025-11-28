
export interface PaymentOption {
    id: number;
    label: string;
    value: string;
    image: string;
}

export type PaymentMethods = "esewa" | "khalti"

export interface PurchaseFormValues {
    paymentOption: PaymentMethods;
    amount: number | null;
}



export interface PurchaseProps {
    payment_method: PaymentMethods;
    transaction_amount: string;
    transaction_status: "success" | "failed" | "pending";
    transaction_id: string;
    reference_id: string;
    // is_trial: boolean;
    // course_type: "subscription" | "expiry" | "free";
    // subscription_id: string | null;
}
