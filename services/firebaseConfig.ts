
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVppNAicRPFXEUdErmHd24se_9bjXiqcM",
  authDomain: "jhona-1b398.firebaseapp.com",
  databaseURL: "https://jhona-1b398-default-rtdb.firebaseio.com",
  projectId: "jhona-1b398",
  storageBucket: "jhona-1b398.firebasestorage.app",
  messagingSenderId: "981136306223",
  appId: "1:981136306223:web:52a7b67c22c274efcc56da",
  measurementId: "G-NVGKL0XGER"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
