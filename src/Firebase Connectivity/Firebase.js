import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {initializeFirestore} from 'firebase/firestore';
import { getStorage, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDIwxpnkhO19nOz-Sb2LUEPvoqQGG6Qb_o",
  authDomain: "runnr-d2e26.firebaseapp.com",
  projectId: "runnr-d2e26",
  storageBucket: "runnr-d2e26.appspot.com",
  messagingSenderId: "821295978995",
  appId: "1:821295978995:web:4a898f22618a05d4619a86"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
const storage = getStorage();

export { auth, db, storage, getDownloadURL };



