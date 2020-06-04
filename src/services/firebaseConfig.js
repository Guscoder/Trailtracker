import * as firebase from 'firebase';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyAWfYB2aX2JVmlJkD8iFm0SLGFFNuxtKio',
  authDomain: 'trailtracker-1060b.firebaseapp.com',
  databaseURL: 'https://trailtracker-1060b.firebaseio.com',
  projectId: 'trailtracker-1060b',
  storageBucket: 'trailtracker-1060b.appspot.com',
  messagingSenderId: '711544585577',
  appId: '1:711544585577:web:3d49750d272a3a75b6d1f8',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const databaseRef = firebase.database().ref();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const storageRef = firebase.storage().ref();
export const database = firebase.database();

export const trailItemsRef = databaseRef.child('trailitems');
