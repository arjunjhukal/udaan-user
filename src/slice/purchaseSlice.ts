import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PurchaseState {
    courseId: number | null;
    title?: string;
    message?: string;
    open: boolean;
}

const initialState: PurchaseState = {
    courseId: null,
    title: "Purchase Course to Access Resources",
    message: "Unlock access to comprehensive test materials, practice exams, and detailed solutions by purchasing this course.",
    open: false,
};

export const purchaseSlice = createSlice({
    name: "purchase",
    initialState,
    reducers: {
        setPurchase: (state, action: PayloadAction<Partial<PurchaseState>>) => {
            return { ...state, ...action.payload };
        },

        resetPurchase: () => initialState,
    },
});

export const { setPurchase, resetPurchase } = purchaseSlice.actions;

export default purchaseSlice.reducer;
