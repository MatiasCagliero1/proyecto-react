import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDHBQoLLgIjMvoj2Tm0AlLtDny-Mf3zdvI",
  authDomain: "proyectoreactnative-733ea.firebaseapp.com",
  projectId: "proyectoreactnative-733ea",
  storageBucket: "proyectoreactnative-733ea.appspot.com",
  messagingSenderId: "279820373873",
  appId: "1:279820373873:web:24894d4bed18d611dbb0d0"
};

app.initializeApp(firebaseConfig);


export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();