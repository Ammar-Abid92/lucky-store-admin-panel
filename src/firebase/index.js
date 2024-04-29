import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBw6RjOQwSUZ0IejRiWDfmF8JiTa7rurpw",
    authDomain: "lucky-stores-fb252.firebaseapp.com",
    projectId: "lucky-stores-fb252",
    storageBucket: "lucky-stores-fb252.appspot.com",
    messagingSenderId: "206970926034",
    appId: "1:206970926034:web:8151169fc340a554fb4e0b",
    measurementId: "G-19PTLYNHJR"
};

const { REACT_APP_VAPID_KEY } = process.env;
const publicKey = REACT_APP_VAPID_KEY;

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const analytics = firebase.analytics();
export default firebase;
