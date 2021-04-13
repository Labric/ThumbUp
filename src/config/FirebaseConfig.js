//import * as firebase from 'firebase'
import firebase, { utils } from "@react-native-firebase/app"
import rnAuth from "@react-native-firebase/auth"
import rnFirestore from "@react-native-firebase/firestore"
//import storage from "@react-native-firebase/storage"

const auth = rnAuth()
const firestore = rnFirestore()
export { firebase, auth, firestore, utils }

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

