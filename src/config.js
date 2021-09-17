import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAlZfYu7QmPwSp91VPpgtu4W99dtk8sCnk",
  authDomain: "react-firechat-b9048.firebaseapp.com",
  projectId: "react-firechat-b9048",
  storageBucket: "react-firechat-b9048.appspot.com",
  messagingSenderId: "98271477138",
  appId: "1:98271477138:web:c6245a3da52f1e9a8e954b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();

export default app;
