import firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import cond from './env';

const firebaseConfig = {
    apiKey: "AIzaSyDiT_z1dTDsLsEcWozjjaAsBKseSI-6pq8",
    authDomain: cond.authDomain,
    databaseURL: cond.databaseURL,
    projectId:  cond.projectId,
    storageBucket: cond.storageBucket,
    messagingSenderId: cond.messagingSenderId,
    appId: cond.appId,
    measurementId: cond.measurementId
  };



  firebase.initializeApp(firebaseConfig);

  export default firebase;