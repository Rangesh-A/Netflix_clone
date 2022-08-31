import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyC4zPG0wk5vcfl-rXhJTdVXpPBKDWW7Qeg",
    authDomain: "netflix-clone-d00f7.firebaseapp.com",
    projectId: "netflix-clone-d00f7",
    storageBucket: "netflix-clone-d00f7.appspot.com",
    messagingSenderId: "257413742301",
    appId: "1:257413742301:web:78faaa13980553dfcb6534"
  };

  const app=initializeApp(firebaseConfig)
  const auth=getAuth();
  const db=getFirestore();

  export{app,auth,db};