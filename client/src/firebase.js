// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCAbUc7DaH-saP7OY6Isn2cO-qk7QGrZk",
  authDomain: "wanderai-d3448.firebaseapp.com",
  projectId: "wanderai-d3448",
  storageBucket: "wanderai-d3448.firebasestorage.app",
  messagingSenderId: "954044543625",
  appId: "1:954044543625:web:265ced4b414b11b2b6cc58",
  measurementId: "G-0MVBEE310B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);