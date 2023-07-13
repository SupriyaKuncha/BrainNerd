
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAMuIc1w9fPNYOHZpPI3siZFz9Uje6d_QM",
    authDomain: "booknerd-c65e9.firebaseapp.com",
    projectId: "booknerd-c65e9",
    storageBucket: "booknerd-c65e9.appspot.com",
    messagingSenderId: "402452331579",
    appId: "1:402452331579:web:8098279e20b5e4eee5301e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

console.log(app);

//Getting all the HTML objects
var email = document.getElementById("email");
var password = document.getElementById("password");

// Making a function for storing data and signup
window.signup = function (e) {
    e.preventDefault();

    var obj = {
        email: email.value,
        password: password.value
    };

    console.log(obj);
    createUserWithEmailAndPassword(auth, obj.email, obj.password)
        .then(function (success) {
            window.location.replace('login.html')
            // alert("SignUp successful.")
        })
        .catch(function (err) {
            alert("error" + err)
        });
};

// Making a function for logging in
window.login = function (e) {
    e.preventDefault();

    var obj = {
        email: email.value,
        password: password.value
    };

    signInWithEmailAndPassword(auth, obj.email, obj.password)
        .then(function (success) {
            alert("Login Successful")
            window.location.replace('books.html')
            // alert("Login successful.")
        })
        .catch(function (err) {
            window.location.replace('signup.html')
            alert("error" + err)
        });
    console.log(obj);
}

// window.logout = function (e) {
//     e.preventDefault();

//     var obj = {
//         email: email.value,
//         password: password.value
//     };

//     signOut(auth)
//         .then(function (success) {
//             alert("Logout Successful")
//             window.location.replace('../login.html')
//             // alert("Login successful.")
//         })
//         .catch(function (err) {
//             // window.location.replace('../signup.html')
//             alert("error" + err)
//         });
//     console.log(obj);
// }

// document.getElementById("logout").addEventListener("click", function () {
//     signOut(auth).then(() => {
//         // Sign-out successful.
//         console.log('Sign-out successful.');
//         alert('Sign-out successful.');
//         window.location.replace('../login.html');
//         //document.getElementById('logout').style.display = 'none';
//     }).catch((error) => {
//         // An error happened.
//         console.log('An error happened.');
//     });
// });