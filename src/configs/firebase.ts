import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGee_SdC2WZ_cb1nzNUT3zFdpBeqtAtbY",
  authDomain: "test-a9c66.firebaseapp.com",
  projectId: "test-a9c66",
  storageBucket: "test-a9c66.appspot.com",
  messagingSenderId: "335229195268",
  appId: "1:335229195268:web:6555f0ca8c2874ee7e9151",
  measurementId: "G-FK018LG0QC",
};

// Initialize Firebase
const app_firebase = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app_firebase)
export const auth_firebase = getAuth(app_firebase);
export default app_firebase;
