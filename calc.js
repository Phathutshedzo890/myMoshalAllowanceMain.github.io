// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const user = auth.currentUser; // Use auth.currentUser instead of firebase.auth().currentUser

// Function to get the current logged-in student's number
// async function getStudentNumber() {
//   // Check if a user is currently logged in
  
//   console.log("this the UID I found:", user.uid);
  
//   if (user) {
//     try {
//       // Retrieve the student's document ID from Firestore using the user's UID
//       const userRef = doc(db, 'Student', user.uid); // Assuming you have a Users collection to map UIDs to Student_IDs
//       const userSnapshot = await getDoc(userRef);
  
//       if (userSnapshot.exists()) {
//         const userData = userSnapshot.data();
//         const studentID = userData.uid; // Adjust field name if necessary
        
        
//         // Now use the studentID to retrieve the actual student data
//         const studentRef = doc(db, 'Student', studentID);
//         const studentSnapshot = await getDoc(studentRef);


//            if (studentSnapshot.exists()) {
//           const studentData = studentSnapshot.data();
//           const studentNumber = studentData.Student_Number; // Adjust field name if necessary

//           console.log("Student Number:", studentNumber);
//           return studentNumber;
//         } else {
//           console.error("No student document found with the ID:", studentID);
//           return null;
//         }
//       } else {
//         console.error("No user document found for the UID:", user.uid);
//         return null;
//       }
//     } catch (error) {
//       console.error("Error retrieving student number:", error);
//       return null;
//     }
//   } else {
//     console.error("No user is currently logged in!");
//     return null;
//   }
// }

// Event listener for the calculate button
document.querySelector(".calculate-button").addEventListener("click", async (event) => {
    event.preventDefault(); // Prevents the form from submitting
    await saveExternalFundingData();
  });
  
  // Optional: Monitor authentication state changes
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const email = user.email;
      console.log("User is logged in:", user.email);
    } else {
      console.log("No user is logged in.");
      // You may choose to redirect to the login page here
    }
  });
  
  async function saveExternalFundingData() {
    // Retrieve form values
    const ExtFunding_Name = document.getElementById("ExtFunding_Name").value; // This will now capture the dropdown value
    const ExtFunding_Amt = document.getElementById("annual_amount").value.trim();
    const ExtFunding_Type = document.querySelector('input[name="ExtFunding_Type"]:checked')?.value;
    const ExtFunding_Date = document.getElementById("ExtFunding_Date").value.trim();
    const NSFAS_Status = document.querySelector('input[name="NSFAS_Status"]:checked')?.value;
    const ExtFunding_Doc = document.getElementById("fileInput").files[0];
  
    // Validate that all required fields are filled out
    if (
      !ExtFunding_Name ||
      !ExtFunding_Amt ||
      !ExtFunding_Type ||
      !ExtFunding_Date ||
      !NSFAS_Status
    ) {
      alert("Please fill out all fields and upload the required document.");
      return;
    }
  
    // Ensure a user is logged in
    const user = auth.currentUser;
    if (!user) {
      console.error("No user is currently logged in!");
      return;
    }
  
    const userUID = user.uid;
  
    try {
      // Get the Student_ID from the 'Student' collection using the UID
      const studentDocRef = doc(db, 'Student', userUID);
      const studentDocSnap = await getDoc(studentDocRef);
  
      if (!studentDocSnap.exists()) {
        console.error("No student document found for the current user.");
        return;
      }
  
      const studentData = studentDocSnap.data();
      const studentID = studentData.Student_ID; // Assuming the field name is Student_ID
  
      console.log("Student_ID retrieved:", studentID);
  
      // Upload the document to Firebase Storage and get its URL
      const docUploadRef = storageRef(storage, `proofOfFunding/${studentID}/${ExtFunding_Doc.name}`);
      await uploadBytes(docUploadRef, ExtFunding_Doc);
      const ExtFunding_Doc_URL = await getDownloadURL(docUploadRef);
  
      // Use the logged-in user's UID as the document ID for ExternalFunding
      const externalFundingRef = doc(db, "ExternalFunding", userUID);
  
      // Save data to Firestore
      await setDoc(externalFundingRef, {
        ExtFundingID: userUID, // Use the UID as the ID
        ExtFunding_Name: ExtFunding_Name, // This will now save GCRA or NSFAS
        ExtFunding_Amt: Number(ExtFunding_Amt),
        ExtFunding_Type: ExtFunding_Type,
        ExtFunding_Date: ExtFunding_Date,
        NSFAS_Status: NSFAS_Status,
        ExtFunding_Doc_URL: ExtFunding_Doc_URL,
        Student_ID: studentID, // Store the retrieved Student_ID
      });
  
      alert("External funding information saved successfully!");
      console.log("External funding information saved with UID:", userUID);
  
    } catch (error) {
      console.error("Error saving external funding information:", error);
    }
  }
  
  




