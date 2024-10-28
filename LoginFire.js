const signInButton = document.getElementById('signIn');
const signUpButton = document.getElementById('signUp');
const container = document.getElementById('container');

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, connectAuthEmulator, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDUtGUh3WRQ9ZMpvOm26ZGVP9O_brS4jKg",
    authDomain: "mymoshalallowance.firebaseapp.com",
    databaseURL: "https://mymoshalallowance-default-rtdb.firebaseio.com",
    projectId: "mymoshalallowance",
    storageBucket: "mymoshalallowance.appspot.com",
    messagingSenderId: "607619034226",
    appId: "1:607619034226:web:e9c117dea2ccf9bd59e6eb",
    measurementId: "G-NCTW2CSPR8"
  };

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Variables for login attempt tracking
let loginAttempts = 0;
const maxAttempts = 3; // Maximum allowed attempts
const lockoutDuration = 30000; // Lockout duration in milliseconds (30 seconds)
let lockoutTimeout = null;

// Function to validate phone number
function validatePhoneNumber(phoneNo) {
    const phonePattern = /^\d{10}$/; // Regex to match exactly 10 digits
    return phonePattern.test(phoneNo);
}

// Function to validate password strength
function isStrongPassword(password) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordPattern.test(password);
}

document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const student_number = document.getElementById("Student Number").value;
    const email = document.getElementById("RegisterEmail").value;
    const password = document.getElementById("RegisterPassword").value;
    const firstName = document.getElementById("Fname").value;
    const lastName = document.getElementById("Lname").value;
    const phoneNo = document.getElementById("PhoneNo").value;
    const selectedUniversity = document.getElementById('Varsity').value;

    // Validate phone number
    if (!validatePhoneNumber(phoneNo)) {
        alert("Please enter a valid 10-digit phone number without letters.");
        return; // Stop form submission if validation fails
    }

    // Validate password strength
    if (!isStrongPassword(password)) {
        alert("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.");
        return; // Stop form submission if validation fails
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                Student_ID: student_number,
                Student_email: email,
                Student_FName: firstName,
                Student_LName: lastName,
                Student_Varsity: selectedUniversity,
                Student_PhoneNo: phoneNo
            };

            const docRef = doc(db, "Student", user.uid);
            setDoc(docRef, userData)
                .then(() => {
                    window.location.href = "first.html";
                })
                .catch((error) => {
                    console.error("Error writing document", error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode == 'auth/email-already-in-use') {
                alert(error.message);
            }
            console.error('Signup error:', error);
        });
});

document.getElementById("loginForm").addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById("LoginEmail").value;
    const password = document.getElementById("LoginPassword").value;

    // Check if the user is currently locked out
    if (loginAttempts >= maxAttempts) {
        alert("Too many failed login attempts. Please wait before trying again.");
        return; // Prevent further login attempts
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Logged in
            window.location.href = "first.html";
            console.log('Login successful:', userCredential.user);
            // Reset login attempts on successful login
            loginAttempts = 0;
            if (lockoutTimeout) {
                clearTimeout(lockoutTimeout);
                lockoutTimeout = null;
            }
        })
        .catch((error) => {
            loginAttempts++;
            console.error('Login error:', error);
            alert("You have entered incorrect login credentials, please try again.");

            // Lock out the user if maximum attempts are reached
            if (loginAttempts >= maxAttempts) {
                alert("You have reached the maximum number of attempts. Please wait before trying again.");
                lockoutTimeout = setTimeout(() => {
                    loginAttempts = 0; // Reset attempts after lockout duration
                }, lockoutDuration);
            }
        });
});
