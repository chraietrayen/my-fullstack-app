import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZOZiOkIVSi8gzEIMCUFwWsKRyKQ9vnxQ",
  authDomain: "first-project-school.firebaseapp.com",
  projectId: "first-project-school",
  storageBucket: "first-project-school.appspot.com",
  messagingSenderId: "13928082867",
  appId: "1:13928082867:web:36208f961e086008186fc6",
  measurementId: "G-SQKWHL9QW1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get the authentication instance

export { auth };
