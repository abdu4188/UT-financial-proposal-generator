import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/analytics'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC1mGNt_B3M0edKQJ-2b6BtjhSiJd24SuM",
    authDomain: "ut-financial.firebaseapp.com",
    databaseURL: "https://ut-financial.firebaseio.com",
    projectId: "ut-financial",
    storageBucket: "ut-financial.appspot.com",
    messagingSenderId: "392572333883",
    appId: "1:392572333883:web:af23eda5ddbdc51508911e",
    measurementId: "G-DHBJHN8Y4M"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const db = firebase.firestore()
  const storage = firebase.storage()
  const auth = firebase.auth()

  export{
      db,
      storage,
      auth
  }