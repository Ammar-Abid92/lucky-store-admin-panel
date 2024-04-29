import { PAYMENT } from "./types";

export const setPaymentMethod = (paymentMethod) => {
    return {
        type: PAYMENT.SET_PAYMENT_METHOD,
        data: paymentMethod
    }
}