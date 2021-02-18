import firebase from 'firebase'

const firebaseApp = firebase.initializeApp ({
    apiKey: "AIzaSyBY_jLfeH9hr2HC5kK0MB1QX9W2OhLj2zs",
    authDomain: "electro-school.firebaseapp.com",
    databaseURL: "https://electro-school-default-rtdb.firebaseio.com",
    projectId: "electro-school",
    storageBucket: "electro-school.appspot.com",
    messagingSenderId: "847420419528",
    appId: "1:847420419528:web:f9cbe03b7632018e5764fd",
    measurementId: "G-X06MFWQC77"
})

const db = firebaseApp.firestore()

export default db;