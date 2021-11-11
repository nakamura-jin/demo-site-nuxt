import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: "AIzaSyDHg_vFcMVlD-uXNVEXe7qwEdtxAdlPn0E",
      authDomain: "fir-site-d2145.firebaseapp.com",
      projectId: "fir-site-d2145",
      storageBucket: "fir-site-d2145.appspot.com",
      messagingSenderId: "1023233617878",
      appId: "1:1023233617878:web:ea8009de4530a855dc3e77",
      measurementId: "G-N20FQD5CNZ"
    }
  )
}

export default firebase