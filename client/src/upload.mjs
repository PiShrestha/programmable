// if upload fails, add assert { type: 'json' } to root level of package.json

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import questionsData from './src/data/javaFundamentals.json' assert { type: 'json' };

const firebaseConfig = {
  apiKey: "AIzaSyBvJXOUpYJvuOhUJTrza44J4TSRrzjTot8",
  authDomain: "programmable-cee8c.firebaseapp.com",
  projectId: "programmable-cee8c",
  storageBucket: "programmable-cee8c.appspot.com",
  messagingSenderId: "591741596207",
  appId: "1:591741596207:web:d08bc72e579e9ef18d4cda",
  measurementId: "G-DGX9Y72KF7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addQuestions() {
  const questionsCollectionRef = collection(db, "questions");

  for (const question of questionsData) {
    try {
      // add each question to collection
      const docRef = await  (questionsCollectionRef, question);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
}

addQuestions();