import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCz1prlL_IMSnn2dSzfpK0Xm9oje1oIZHo",
  authDomain: "proyectofinal-reactnative.firebaseapp.com",
  projectId: "proyectofinal-reactnative",
  storageBucket: "proyectofinal-reactnative.appspot.com",
  messagingSenderId: "212767673258",
  appId: "1:212767673258:web:a88aa248e124f4e84379d3"
};

app.initializeApp(firebaseConfig);


export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();