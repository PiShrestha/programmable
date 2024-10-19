import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBvJXOUpYJvuOhUJTrza44J4TSRrzjTot8",
    authDomain: "programmable-cee8c.firebaseapp.com",
    projectId: "programmable-cee8c",
    storageBucket: "programmable-cee8c.appspot.com",
    messagingSenderId: "591741596207",
    appId: "1:591741596207:web:d08bc72e579e9ef18d4cda",
    measurementId: "G-DGX9Y72KF7"
  };

// starts app and gets current instance of authentication service of app
// instance can then have actions performed on it (ex. to sign in)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };