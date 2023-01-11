import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDez8PCoTHNTtgoX3nTXnmj-5t1Dx66ke0",
    authDomain: "abia-p-3.firebaseapp.com",
    projectId: "abia-p-3",
    storageBucket: "abia-p-3.appspot.com",
    messagingSenderId: "270162729435",
    appId: "1:270162729435:web:724e319175e4895773effe"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore()

export default db