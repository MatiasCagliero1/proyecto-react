import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCzFBOcPxA9JVmB6C4jgVlndmt1mbOPUcI",
  authDomain: "local-snow-245314.firebaseapp.com",
  projectId: "local-snow-245314",
  storageBucket: "local-snow-245314.appspot.com",
  messagingSenderId: "301217705257",
  appId: "1:301217705257:web:5e408b16f4dc822f639b38"
};


app.initializeApp(firebaseConfig);


export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();