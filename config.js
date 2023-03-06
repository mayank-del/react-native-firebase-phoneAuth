import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/firestore";

export const firebaseConfig={
    apiKey: "AIzaSyAvyV7DsLG1jb4zOU1HgB1AkwecC4rr7Vw",
  authDomain: "native-flutter-otp-login.firebaseapp.com",
  projectId: "native-flutter-otp-login",
  storageBucket: "native-flutter-otp-login.appspot.com",
  messagingSenderId: "245596853639",
  appId: "1:245596853639:web:0e045d27011f6af6742f22",
  measurementId: "G-9K8ZMPC77H"
};
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}