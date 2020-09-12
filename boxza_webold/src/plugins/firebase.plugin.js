/* eslint-disable */
// import firebase from 'firebase/app'
// import 'firebase/firestore'
// Your web app's Firebase configuration
// if (!firebase.apps.length) {
//   var firebaseConfig = {
//     apiKey: "AIzaSyABa3xdzKk5pQm_FYewdrzQCRVYSf3ofSc",
//     authDomain: "boxzaloginsocial.firebaseapp.com",
//     databaseURL: "https://boxzaloginsocial.firebaseio.com",
//     projectId: "boxzaloginsocial",
//     storageBucket: "boxzaloginsocial.appspot.com",
//     messagingSenderId: "657193518921",
//     appId: "1:657193518921:web:fe7434528cf9e6241a7c98",
//     measurementId: "G-GKZEC0LMJE"
//   };
// // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
// }

// const socialFirebase = firebase.firestore()
// export {socialFirebase}

// import firebase from 'firebase'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/performance'

export default (ctx, inject) => {
    if (!firebase.apps.length) {
        var firebaseConfig = {
            apiKey: "AIzaSyCV1UqFg7jvZRRIMSpz2gf8Kx9bpkXsrq8",
            authDomain: "boxza-7fe34.firebaseapp.com",
            databaseURL: "https://boxza-7fe34.firebaseio.com",
            projectId: "boxza-7fe34",
            storageBucket: "boxza-7fe34.appspot.com",
            messagingSenderId: "957253992252",
            appId: "1:957253992252:web:ee1a192782441b109fa839",
            measurementId: "G-FFV5F78L0N"
        };
        firebase.initializeApp(firebaseConfig);
    }

    const perf = firebase.performance()
    inject('FirebasePerf', perf) // inject FB perf into $root
}