// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const appFirebase = initializeApp(firebaseConfig);


//const analytics = getAnalytics(appFirebase);

//ios: 655441475070-4bdn0hlrdmb50aqt5d6mhajl4cv44srb.apps.googleusercontent.com
//android: 655441475070-c5o06mufa9m6cdgf1v1nkv7qnji01ifj.apps.googleusercontent.com

export default appFirebase;

