import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDsp6_8pFJLZCLijSGVEgTxk4FL1oH4zfw",
  authDomain: "inclusao-devs.firebaseapp.com",
  projectId: "inclusao-devs",
  storageBucket: "inclusao-devs.firebasestorage.app",
  messagingSenderId: "359965936025",
  appId: "1:359965936025:web:c2e33837fda06d6f75eb08",
  measurementId: "G-R38SGL1ZWR"
};

const firestoreApp = initializeApp(firebaseConfig);

const db = getFirestore(firestoreApp);
const auth = getAuth(firestoreApp)

if(import.meta.env.VITE_USE_FIREBASE_EMULATOR === "true"){
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
}

export { db, auth };