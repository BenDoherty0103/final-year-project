import * as firebase from 'firebase'
import 'firebase/firestore'

let firebaseConfig = {
    apiKey: "AIzaSyAIG9h0iIqTD5emeETQVmfzzDZG3-xYbYE",
    authDomain: "final-year-project-4e017.firebaseapp.com",
    databaseURL: "https://final-year-project-4e017.firebaseio.com",
    projectId: "final-year-project-4e017",
    storageBucket: "final-year-project-4e017.appspot.com",
    messagingSenderId: "1074818923418",
    appId: "1:1074818923418:web:9f45330d3f6ef8cd441823",
    measurementId: "G-F6MCJQSRLZ"
  };

let app = firebase.initializeApp(firebaseConfig)
export const db = app.firestore()