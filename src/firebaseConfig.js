import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD5enA0pLDq2kR0l4xznQ8GUcqEGbF5DRk",
  authDomain: "nct-trail-tracker.firebaseapp.com",
  databaseURL: "https://nct-trail-tracker.firebaseio.com",
  projectId: "nct-trail-tracker",
  storageBucket: "nct-trail-tracker.appspot.com",
  messagingSenderId: "210249621363",
  appId: "1:210249621363:web:feaaf43c296184e08a2f06"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
