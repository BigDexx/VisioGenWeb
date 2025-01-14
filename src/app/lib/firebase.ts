import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAB2j3_8WAt5HQfwAfktnfvynwOlxJYP2M",
  authDomain: "visiogen-835ac.firebaseapp.com",
  projectId: "visiogen-835ac",
  storageBucket: "visiogen-835ac.firebasestorage.app",
  messagingSenderId: "497465914429",
  appId: "1:497465914429:web:9f894ba798267315ec6654",
  measurementId: "G-S5FRDKRE7J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;