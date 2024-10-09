// script.js
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.tab-button.active').classList.remove('active');
            button.classList.add('active');
            window.location.href="/documents.html";
            // Add logic to switch content based on active tab if needed
        });
    });
});
// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

// Firebase configuration
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

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);


// Function to handle file upload
function uploadPDF(fileInputId, storagePath, firestoreCollection, messageElementId) {
  const fileInput = document.getElementById(fileInputId);
  const file = fileInput.files[0];
  const user = auth.currentUser;
  if (file && user) {
    const fileRef = storageRef(storage, `${storagePath}/${user.uid}/${file.name}`);
    
    // Upload the file to Firebase Storage
    uploadBytes(fileRef, file).then(() => {
      console.log('File uploaded successfully');

      // Get the download URL
      return getDownloadURL(fileRef);
    }).then((url) => {
      console.log('File download URL:', url);

      // Save the download URL to Firestore
      return setDoc(doc(db, firestoreCollection, user.uid), {
        fileName: file.name,
        fileUrl: url
      }, { merge: true });
    }).then(() => {
      console.log('File URL saved to Firestore');
      document.getElementById(messageElementId).textContent = "File uploaded and saved successfully!";
    }).catch((error) => {
      console.error('Error during file upload or saving:', error);
      document.getElementById(messageElementId).textContent = "Error: " + error.message;
    });
  } else {
    document.getElementById(messageElementId).textContent = "You need to select a file and be logged in.";
  }
}

// Event listeners for document submission forms
document.querySelector('.card .submit-button').addEventListener('click', (event) => {
  event.preventDefault();
  uploadPDF('fileInput1', 'feeStatements', 'feeStatements', 'fileInfo1');
});

document.querySelector('.card2 .submit-button').addEventListener('click', (event) => {
  event.preventDefault();
  uploadPDF('fileInput2', 'proofOfFunding', 'proofOfFunding', 'fileInfo2');
});
