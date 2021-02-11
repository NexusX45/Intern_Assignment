import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDVdZ0sSBynIZVm1d3xLV6qhbcpFIFiezw",
  authDomain: "intern-assignment-8d422.firebaseapp.com",
  projectId: "intern-assignment-8d422",
  storageBucket: "intern-assignment-8d422.appspot.com",
  messagingSenderId: "114443962303",
  appId: "1:114443962303:web:7f4e0ce386c3a8caa8830a",
  measurementId: "G-0SJF68SLDV",
});

export const auth = app.auth;
export const storageRef = firebase.storage().ref();
export default app;
