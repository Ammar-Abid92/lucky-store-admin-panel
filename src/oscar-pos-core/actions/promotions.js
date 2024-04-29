
import { PROMOTION } from "./types";
import axios from "axios";


export const getPromotions = (BASE_URL) => {
    console.log("getPromotions : BASE URL ", BASE_URL)
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            console.log("getPromotions : BASE URL ", BASE_URL)

            let url = `${BASE_URL}accounts/udhaar/promotions/`;
            axios
                .get(url)
                .then(res => {
                    console.log("promotions res: ", res);
                    dispatch({
                        type: PROMOTION.GET_PROMOTIONS,
                        data: res.data.promotion
                    });
                    resolve(res.data.promotion);
                    // resolve(res);
                })
                .catch(err => {
                    console.log("error : ", err);

                    reject(err);
                });
            // let res = {
            //     // img: "https://linkofimageonline..",
            //     img: "http://www.burgerlab.co/img/burgerlab-classic.jpg",
            //     title: "Burgerlab",
            //     text: "This is the promotion text",
            //     tacs: ['Lucky draw will be held on November 1, 2019.',
            //         'All signups with your personal link will count for 1 entry. You may have up to 1000 entries only.',
            //         'Deal is for 2 Firehouse Combos only at Burger Lab. Deal is valid for 24 hours, once the winner is announced',
            //         'Winner will be informed via call from our representative.',
            //         'Your winning code must be presented to Burger Lab prior to ordering'],

            //     cta: "share_with_friends",
            //     cta_content: "Share",
            //     expires_on: "2019-11-20 12:00:00"
            // }
            // dispatch({
            //     type: PROMOTION.GET_PROMOTIONS,
            //     data: res.data
            // });
            // resolve(res);
        })
    }
}

export const setPromotion = (promotion) => {
    console.log("setPromotion : ", promotion)
    return (dispatch, getState) => {
        dispatch({
            type: PROMOTION.GET_PROMOTIONS,
            data: promotion
        });
    }

}