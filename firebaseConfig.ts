import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import {getMessaging} from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyB7kaFXDaiTr8nGkJ9hTaY5M5_vdwhxLjw",
    authDomain: "folkie-native.firebaseapp.com",
    projectId: "folkie-native",
    storageBucket: "folkie-native.firebasestorage.app",
    messagingSenderId: "275977246386",
    appId: "1:275977246386:android:90ab8810b99be2049b5bab",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// export const auth = getAuth(app);
// export const messaging = getMessaging(app);