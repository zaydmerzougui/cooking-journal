import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABKPUJaYF2fbPIhAYw6f_HzE_hY1xfUD0",
  authDomain: "cooking-ninja-site-d9041.firebaseapp.com",
  projectId: "cooking-ninja-site-d9041",
  storageBucket: "cooking-ninja-site-d9041.appspot.com",
  messagingSenderId: "660285303531",
  appId: "1:660285303531:web:0dd5eadf8c58cfd1012cae",
};

// initiliase firebase
firebase.initializeApp(firebaseConfig);

// initiliase services
const projectFirestore = firebase.firestore();

export { projectFirestore };
