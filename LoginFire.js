const signInButton = document.getElementById('signIn');
const signUpButton = document.getElementById('signUp');
const container = document.getElementById('container');

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import{getAuth,connectAuthEmulator,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import{createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import{getFirestore,doc,setDoc,collection} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"
import { getDatabase,ref,set } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
  const firebaseConfig = {
    apiKey: "AIzaSyAaqxo2Tyfw2fk-WLTPoFtLBC_cAuvtptc",
    authDomain: "mymoshalallowance-34e68.firebaseapp.com",
    projectId: "mymoshalallowance-34e68",
    storageBucket: "mymoshalallowance-34e68.appspot.com",
    messagingSenderId: "387609738002",
    appId: "1:387609738002:web:38cf56b731375650d751cb",
    measurementId: "G-5E13X2QNFC"
  };
const firebaseApp= initializeApp(firebaseConfig);
//const auth= getAuth(firebaseApp);
//const database= getFirestore(firebaseApp);
// connectAuthEmulator(auth,"http://localhost:9099/");

// const loginEmailPassword = async()=>{
//   const loginEmail= document.getElementById("loginEmail").value;
//   const LoginPassword= document.getElementById("loginPassword").value;

//   const userCredential = await signInWithEmailAndPassword(auth, loginEmail, LoginPassword);
//   console.log(userCredential.user);
// }
// signInButton.addEventListener('click', () => {
//   container.classList.remove('right-panel-active');
//   window.location.href = "/calc.html";
// });
// Function to validate phone number
function validatePhoneNumber(phoneNo) {
  const phonePattern = /^\d{10}$/; // Regex to match exactly 10 digits
  return phonePattern.test(phoneNo);
}

document.getElementById('registerForm').addEventListener('submit', function(event) {
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

  const auth = getAuth();
  const db = getFirestore();

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

document.getElementById("loginForm").addEventListener('submit', function(event) {
  event.preventDefault();
  const auth= getAuth();
  const email = document.getElementById("LoginEmail").value;
  const password = document.getElementById("LoginPassword").value;

  signInWithEmailAndPassword(auth,email, password)
      .then((userCredential) => {
          // Logged in
          
          window.location.href = "first.html";
          console.log('Login successful:', userCredential.user);
      })
      .catch((error) => {
          console.error('Login error:', error);
      });
});