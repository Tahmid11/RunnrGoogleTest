import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "821295978995-b548sn952k764rbcq1iltc43511lterg.apps.googleusercontent.com",//AIzaSyDIwxpnkhO19nOz-Sb2LUEPvoqQGG6Qb_o
    authDomain: "project-821295978995.firebaseapp.com",
    // The value of `databaseURL` depends on the location of the database
    // databaseURL: "https://DATABASE_NAME.firebaseio.com",
    projectId: "runnr-d2e26",
    // storageBucket: "PROJECT_ID.appspot.com",
    // messagingSenderId: "SENDER_ID",
    appId: "1:821295978995:android:471f65b18e928a44619a86",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {auth, db};//yeah just like the video, but can be tweaked later

//that should be it for now

