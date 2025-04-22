// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { collection, doc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, getDownloadURL, ref, listAll } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCmUyneVlb1DOg0Jix-17CWJ2vOHsY8nl4",
    authDomain: "pin-array.firebaseapp.com",
    projectId: "pin-array",
    storageBucket: "pin-array.appspot.com",
    messagingSenderId: "872633144545",
    appId: "1:872633144545:web:fb6b170e219a97324f53a0",
    measurementId: "G-PHCH9Z3SH4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize the Firebase auth service
const db = getFirestore(app); // Initialize the Firestore service
const firebaseConfigElement = document.getElementById('firebaseConfig');
const collectionName = firebaseConfigElement.getAttribute('data-collection');
const documentName = firebaseConfigElement.getAttribute('data-document');

document.getElementById('login-btn').addEventListener('click', login);
abstractcontent = document.getElementById('abstractcontent');
keywordscontent = document.getElementById('keywordscontent');

/**
 * Logs in the user using the provided email and password.
 * @function login
 */
function login() {
    var email = "";
    var password = document.getElementById('login-password').value;

    // Make sure email and password are not empty
    if (!email || !password) {
        abstractcontent.innerHTML = "password must be provided";
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in successfully
            document.getElementById('login').style.display = 'none';
            abstractcontent.innerHTML = "Loading...";
            requestData2();
        })
        .catch((error) => {
            abstractcontent.innerHTML = "Password is incorrect";
        });
}

async function requestData2() {
    // console.log('requestData2');
    // You already have a reference to the 'test' document in 'table1' collection
    var documentRef = doc(db, collectionName, documentName);

    try {
        const docSnapshot = await getDoc(documentRef);
        if (docSnapshot.exists()) {
            // display the data on paragraph
            document.getElementById('abstract').style.display = 'block';
            abstractcontent.innerHTML = docSnapshot.data().abstract;
            document.getElementById('keywords').style.display = 'block';
            keywordscontent.innerHTML = docSnapshot.data().keywords;
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error getting document:", error);
    }
}