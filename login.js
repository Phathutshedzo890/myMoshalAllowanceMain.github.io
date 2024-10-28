const signInButton = document.getElementById('signIn');
const signUpButton = document.getElementById('signUp');
const container = document.getElementById('container');

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import{getAuth,connectAuthEmulator,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import{createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import{getFirestore,doc,setDoc,collection,addDoc,query,where,getDocs} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"
import { getDatabase,ref,set } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyC9dZ0tqvqLw5GE2WthGrY2qgdwwPcDyhM",
  authDomain: "mmmma-c2403.firebaseapp.com",
  projectId: "mmmma-c2403",
  storageBucket: "mmmma-c2403.appspot.com",
  messagingSenderId: "133407121519",
  appId: "1:133407121519:web:3a7868efcfc2f7aba82d9a",
  measurementId: "G-NBSGM52XGG"
};
const firebaseApp= initializeApp(firebaseConfig);

document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const student_number = document.getElementById("Student Number").value;
  const email = document.getElementById("RegisterEmail").value;
  const password = document.getElementById("RegisterPassword").value;
  const firstName = document.getElementById("Fname").value;
  const lastName = document.getElementById("Lname").value;
  const varsity = document.getElementById("Varsity").value;
  const phoneNo = document.getElementById("PhoneNo").value;

  const auth = getAuth();
  const db = getFirestore();

  createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          const user = userCredential.user;
          const userData = {
            Student_ID: student_number,             // Primary key
            Student_email: email,             // Student's email address
            Student_FName: firstName,         // Student's first name
            Student_LName: lastName,          // Student's last name
            Student_Varsity: varsity,         // Student's university
            Student_PhoneNo: phoneNo          // Student's phone number
          };

          // Adding the document to the "Student" collection and let Firestore generate the document ID
      addDoc(collection(db, "Studant"), userData)
            .then(() => {
                const user = auth.currentUser; // Use auth.currentUser instead of firebase.auth().currentUser
                const email = user.email;
                localStorage.setItem(email, student_number);
                window.location.href = "calc.html"; 
            })
            .catch((error) => {
                console.error("Error writing document:", error);
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
  const auth = getAuth();
  const email = document.getElementById("LoginEmail").value;
  const password = document.getElementById("LoginPassword").value;
  const db = getFirestore();

  auth.signOut().then(() => {
    console.log('Previous user signed out.');

    // Now proceed with signing in the new user
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Logged in UID:', userCredential.user.uid);

        // Fetch student number from Firestore using the user's email
        const userDocRef = collection(db, "Studant");
        const q = query(userDocRef, where("Student_email", "==", email));
        
        getDocs(q)
          .then((querySnapshot) => {
            if (!querySnapshot.empty) {
              querySnapshot.forEach((doc) => {
                const studentNumber = doc.data().Student_ID;
                console.log('Student number:', studentNumber);
                
                // Store student number in localStorage
                localStorage.setItem(email, studentNumber);
                
                // Redirect to documents page
                window.location.href = "calc.html";
              });
            } else {
              console.error('No matching student document found for this email:', email);
            }
          })
          .catch((error) => {
            console.error('Error fetching student document from Firestore:', error);
          });
      })
      .catch((error) => {
        console.error('Login error:', error);
      });
  }).catch((error) => {
    console.error('Sign-out error:', error);
  });
});
