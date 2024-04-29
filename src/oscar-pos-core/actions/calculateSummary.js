import { SUMMARY } from './types'

export const setSummary = (customers) => {
    return (dispatch, getState) => {
        let netBalance = 0,
            totalUdhaar = 0,
            totalAdvance = 0;
        for (let i = 0; i < customers.length; i++) {
            // netBalance += Math.abs(customers[i].total_outstanding_payment);
            if (customers[i].total_outstanding_payment > 0) {
                totalUdhaar += customers[i].total_outstanding_payment;
            }

            if (customers[i].total_outstanding_payment < 0) {
                totalAdvance += Math.abs(customers[i].total_outstanding_payment);
            }
        }

        summary = {
            netBalance: totalUdhaar - totalAdvance,
            udhaar: totalUdhaar,
            advance: totalAdvance,
        }
        dispatch({
            type: SUMMARY.SET_SUMMARY,
            data: summary
        })
    }
}

export const addTransaction = (type, amount) => {
    return (dispatch, getState) => {
        let { summary } = getState();
        let advance = summary.advance;
        let udhaar = summary.udhaar;

        if (type == "Jama") {
            advance = advance + amount
        } else if (type == "Udhaar") {
            udhaar = udhaar + amount
        }

        summary = {
            udhaar: udhaar,
            advance: advance,
        }

        dispatch({
            type: SUMMARY.SET_SUMMARY,
            data: summary
        })
    }
}

export const subtractionTransaction = (type, amount) => {
    return (dispatch, getState) => {
        let { summary } = getState();
        let advance = summary.advance;
        let udhaar = summary.udhaar;

        if (type == "Jama") {
            advance = advance - amount
        } else if (type == "Udhaar") {
            udhaar = udhaar - amount
        }

        summary = {
            udhaar: udhaar,
            advance: advance,
        }

        dispatch({
            type: SUMMARY.SET_SUMMARY,
            data: summary
        })
    }
}

export const updateTransaction = (type, oldAmount, newAmount) => {
    return (dispatch, getState) => {
        let { summary } = getState();
        let advance = summary.advance;
        let udhaar = summary.udhaar;

        if (oldAmount > newAmount) {
            amount = oldAmount - newAmount

            if (type == "Jama") {
                advance = advance - amount
            } else if (type == "Udhaar") {
                udhaar = udhaar - amount
            }

            summary = {
                udhaar: udhaar,
                advance: advance,
            }

            dispatch({
                type: SUMMARY.SET_SUMMARY,
                data: summary
            })

        } else if (oldAmount < newAmount) {
            amount = newAmount - oldAmount

            if (type == "Jama") {
                advance = advance + amount
            } else if (type == "Udhaar") {
                udhaar = udhaar + amount
            }

            summary = {
                udhaar: udhaar,
                advance: advance,
            }

            dispatch({
                type: SUMMARY.SET_SUMMARY,
                data: summary
            })
        }
    }
}