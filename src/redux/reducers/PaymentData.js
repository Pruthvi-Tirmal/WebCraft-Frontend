import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    files: [{}],
    bankName: "",
    ifscCode: "",
    accountHolder: ""
}

const PaymentSlice = createSlice({
    name: "Payment",
    initialState,
    reducers: {
        setPaymentData: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        }
    }
})

export const PaymentDataActions = PaymentSlice.actions;
export const PaymentDataReducer = PaymentSlice.reducer;