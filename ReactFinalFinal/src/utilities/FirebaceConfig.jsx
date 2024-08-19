// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDABlWsewXzVPpqP_Fkx3uoT_aKp-oMfl0",
  authDomain: "hashchona-834d7.firebaseapp.com",
  databaseURL: "https://hashchona-834d7-default-rtdb.firebaseio.com/",
  projectId: "hashchona-834d7",
  storageBucket: "hashchona-834d7.appspot.com",
  messagingSenderId: "805809582200",
  appId: "1:805809582200:web:1a58de7b8b857060777d8d",
  measurementId: "G-RMXS5XX5DB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
//const analytics = getAnalytics(app);

export {database}