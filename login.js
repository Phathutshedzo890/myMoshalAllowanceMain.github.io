const signInButton = document.getElementById('signIn');
const signUpButton = document.getElementById('signUp');
const container = document.getElementById('container');

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
    //window.location.href = "/calc.html";
 });

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import{getAuth,connectAuthEmulator,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import{createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
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
const firebaseApp= initializeApp(firebaseConfig);
const auth= getAuth(firebaseApp);
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


document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const email = document.getElementById("RegisterEmail").value;
  const password = document.getElementById("RegisterPassword").value;

  createUserWithEmailAndPassword(auth,email, password)
      .then((userCredential) => {
          // Signed up
          console.log('Signup successful:', userCredential.user);
          // container.classList.remove('right-panel-active');
             window.location.href = "/calc.html";
      })
      .catch((error) => {
          console.error('Signup error:', error);
      });
});

document.getElementById("loginForm").addEventListener('submit', function(event) {
  event.preventDefault();
  const email = document.getElementById("LoginEmail").value;
  const password = document.getElementById("LoginPassword").value;

  signInWithEmailAndPassword(auth,email, password)
      .then((userCredential) => {
          // Logged in
          window.location.href = "/calc.html";
          console.log('Login successful:', userCredential.user);
      })
      .catch((error) => {
          console.error('Login error:', error);
      });
});