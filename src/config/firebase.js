import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDox61tffBeixwhsFUzVEgjuiXPkn-tHBY",
	authDomain: "job-task-7d675.firebaseapp.com",
	projectId: "job-task-7d675",
	storageBucket: "job-task-7d675.appspot.com",
	messagingSenderId: "726820449361",
	appId: "1:726820449361:web:18fdd46e6e08685d061c70"
 };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
