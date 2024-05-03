
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDYKEcmKOovpW1r0w148XkjqbewX3ybAhE",
  authDomain: "atrevetgroup8.firebaseapp.com",
  projectId: "atrevetgroup8",
  storageBucket: "atrevetgroup8.appspot.com",
  messagingSenderId: "233656417186",
  appId: "1:233656417186:web:88f74589fa2d6c153790fb",
  measurementId: "G-62KXS60D5G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

//Android: "233656417186-81up989jhsno94khcv141m4gtk4crt52.apps.googleusercontent.com"