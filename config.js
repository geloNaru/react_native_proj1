import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDTT1L_N926jZOUapJvPGbpjP5gz-WsJ48",
  authDomain: "lifeline-423a7.firebaseapp.com",
  projectId: "lifeline-423a7",
  storageBucket: "lifeline-423a7.appspot.com",
  messagingSenderId: "309285079165",
  appId: "1:309285079165:web:4a471dd52f38d0912f0914",
  measurementId: "G-63BXDE1TZQ",
};

let app;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // if already initialized, use that one
}

const analytics = getAnalytics(app);

export default { app, analytics };
