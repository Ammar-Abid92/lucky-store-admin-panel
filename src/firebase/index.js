// import Firebase from "firebase";
// // import "firebase/analytics";
// // import * as firebase from "firebase/app";
// const firebaseConfig = {
//     apiKey: "AIzaSyCh2P3PrTWvxS1tEuYCF05vE5uclJcemG0",
//     authDomain: "oscar-dukaan.firebaseapp.com",
//     databaseURL: "https://oscar-dukaan.firebaseio.com",
//     projectId: "oscar-dukaan",
//     storageBucket: "oscar-dukaan.appspot.com",
//     messagingSenderId: "292916785359",
//     appId: "1:292916785359:web:2b22330f1dadecb60b47ba",
//     measurementId: "G-H3QV79QVEW"
// };

// if (typeof window !== "undefined" && !Firebase.apps.length) {
//     Firebase.initializeApp(firebaseConfig);
//     Firebase.analytics();
// }

// export const analytics = Firebase.analytics();
// export const firebase = Firebase;

// const messaging = Firebase.messaging();

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     messaging.onMessage((payload) => {
//       resolve(payload);
//     });
// });

import Firebase from "firebase/app";
import 'firebase/analytics';
import "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyCh2P3PrTWvxS1tEuYCF05vE5uclJcemG0",
    authDomain: "oscar-dukaan.firebaseapp.com",
    databaseURL: "https://oscar-dukaan.firebaseio.com",
    projectId: "oscar-dukaan",
    storageBucket: "oscar-dukaan.appspot.com",
    messagingSenderId: "292916785359",
    appId: "1:292916785359:web:2b22330f1dadecb60b47ba",
    measurementId: "G-H3QV79QVEW"
};

Firebase.initializeApp(firebaseConfig);
export let analytics = Firebase.analytics()
const messaging = Firebase.messaging();

const { REACT_APP_VAPID_KEY } = process.env;
const publicKey = REACT_APP_VAPID_KEY;

export const getToken = async () => {
    let currentToken = "";

    try {
        currentToken = await messaging.getToken({ vapidKey: publicKey });
        if (currentToken) {
            return currentToken
        } else {
            return false
        }
    } catch (error) {
        console.log("An error occurred while retrieving token. ", error);
    }

    return currentToken;
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        messaging.onMessage((payload) => {
            resolve(payload);
        });
    });

export const firebase = Firebase;