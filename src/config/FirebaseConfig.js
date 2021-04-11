import * as firebase from 'firebase'


const FirebaseConfig = {
  apiKey: "AIzaSyCgojIVo8hIPohZbzHmenu45PH6R-i2QpI",
  authDomain: "thumbup-ee2fe.firebaseapp.com",
  projectId: "thumbup-ee2fe",
  storageBucket: "thumbup-ee2fe.appspot.com",
  messagingSenderId: "1076691547183",
  appId: "1:1076691547183:web:f0310c1215b779422282da"
};
  // Initialize Firebase
  firebase.initializeApp(FirebaseConfig);

export default firebase

