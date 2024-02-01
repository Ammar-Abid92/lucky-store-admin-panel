// if ('serviceWorker' in navigator) {
// navigator.serviceWorker.register('../firebase-messaging-sw.js')
//   .then(function(registration) {
//     console.log('Registration successful, scope is:', registration.scope);
//   }).catch(function(err) {
//     console.log('Service worker registration failed, error:', err);
//   });
// }

import { BASE_URL } from "../src/constants";
import { getDukaanOrdersFromCloud } from "../src/oscar-pos-core/actions";


importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

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

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    getDukaanOrdersFromCloud(BASE_URL, {
      phone_number: localStorage.getItem("phone_number"),
  })

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});