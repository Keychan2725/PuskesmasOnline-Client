import firebase from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDrTcxR6wMZ_1_1Y3dDCDUy0D-Yfaj7maM",
    authDomain: "puskesmasonline-43c69.firebaseapp.com",
    projectId: "puskesmasonline-43c69",
    storageBucket: "puskesmasonline-43c69.appspot.com",
    messagingSenderId: "511191068786",
    appId: "1:511191068786:web:d37324df8b7ba5387c52eb",
    measurementId: "G-5LNTNRQWXG"
  };

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
