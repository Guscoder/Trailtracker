import * as firebase from 'firebase';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

// Initialize Firebase
const primaryApp = firebase.initializeApp(firebaseConfig, 'PrimaryApp');

// export const myFirebase = firebase.initializeApp(firebaseConfig);

export const databaseRef = primaryApp.database().ref();
export const auth = primaryApp.auth();
export const storage = primaryApp.storage();
export const storageRef = primaryApp.storage().ref();
export const database = primaryApp.database();
export const firebaseDb = primaryApp;
export const trailItemsRef = databaseRef.child('trailitems');
