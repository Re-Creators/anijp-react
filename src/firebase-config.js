import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyFC6hcmHLV32K_ldh4_Pn25rYY3davcc",
  authDomain: "ani-jp.firebaseapp.com",
  projectId: "ani-jp",
  storageBucket: "ani-jp.appspot.com",
  messagingSenderId: "350607469702",
  appId: "1:350607469702:web:f196d2aeba11f378993507",
  measurementId: "G-V1MNT6H867",
};

const app = initializeApp(firebaseConfig);

export default app;

export const auth = getAuth();
export const authApp = getAuth(app);
export const db = getFirestore(app);
