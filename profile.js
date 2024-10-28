import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import{getAuth,onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import{getFirestore,doc,getDoc,collection,updateDoc} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyC9dZ0tqvqLw5GE2WthGrY2qgdwwPcDyhM",
  authDomain: "mmmma-c2403.firebaseapp.com",
  projectId: "mmmma-c2403",
  storageBucket: "mmmma-c2403.appspot.com",
  messagingSenderId: "133407121519",
  appId: "1:133407121519:web:3a7868efcfc2f7aba82d9a",
  measurementId: "G-NBSGM52XGG"
};
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth();
  const db = getFirestore();
  
  // Load user profile details
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const loggedInUserId = user.uid;
      const docRef = doc(db, "Student", loggedInUserId);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const userData = docSnap.data();
        document.getElementById('loggedUserFName').innerText = userData.Student_FName;
        document.getElementById('loggedUserLName').innerText = userData.Student_LName;
        document.getElementById('loggedUserEmail').innerText = userData.Student_email;
        document.getElementById('loggedStudent_ID').innerText = userData.Student_ID;
        document.getElementById('loggedUserPhoneNo').innerText = userData.Student_PhoneNo;
        document.getElementById('loggedUserVarsity').innerText = userData.Student_Varsity;
  
        // Pre-fill inputs with existing data
        document.getElementById('editFName').value = userData.Student_FName;
        document.getElementById('editLName').value = userData.Student_LName;
        document.getElementById('editEmail').value = userData.Student_email;
        document.getElementById('editStudentID').value = userData.Student_ID;
        document.getElementById('editPhoneNo').value = userData.Student_PhoneNo;
        document.getElementById('editVarsity').value = userData.Student_Varsity;
      } else {
        console.error("No document found for this user.");
      }
    }
  });

  // Add event listener for 'Forgot Password' link
document.getElementById('forgotPasswordLink').addEventListener('click', function () {
  const email = prompt("Please enter your registered email address:");
  
  if (email) {
    // Send password reset email
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent! Please check your inbox.");
      })
      .catch((error) => {
        console.error("Error sending password reset email: ", error);
        alert("Error: " + error.message);
      });
  } else {
    alert("Please enter a valid email address.");
  }
});
  
  // Toggle between edit and view mode
  document.getElementById('editProfileButton').addEventListener('click', function () {
    toggleEditProfile(true);
  });
  
  document.getElementById('cancelProfileButton').addEventListener('click', function () {
    toggleEditProfile(false);
  });
  
  document.getElementById('saveProfileButton').addEventListener('click', function () {
    const loggedInUserId = auth.currentUser.uid;
    const docRef = doc(db, "Student", loggedInUserId);
  
    // Get input values
    const updatedData = {
      Student_FName: document.getElementById('editFName').value.trim(),
      Student_LName: document.getElementById('editLName').value.trim(),
      Student_email: document.getElementById('editEmail').value.trim(),
      Student_ID: document.getElementById('editStudentID').value.trim(),
      Student_PhoneNo: document.getElementById('editPhoneNo').value.trim(),
      Student_Varsity: document.getElementById('editVarsity').value.trim()
    };
  
    // Validate that no field is left empty
    for (let key in updatedData) {
      if (!updatedData[key]) {
        alert(`${key.replace(/_/g, ' ')} cannot be empty.`);
        return; // Stop the function if any field is empty
      }
    }
  
    // If all fields are valid, proceed to update the document
    updateDoc(docRef, updatedData)
      .then(() => {
        console.log("Profile updated successfully.");
        // Update UI with new data
        document.getElementById('loggedUserFName').innerText = updatedData.Student_FName;
        document.getElementById('loggedUserLName').innerText = updatedData.Student_LName;
        document.getElementById('loggedUserEmail').innerText = updatedData.Student_email;
        document.getElementById('loggedStudent_ID').innerText = updatedData.Student_ID;
        document.getElementById('loggedUserPhoneNo').innerText = updatedData.Student_PhoneNo;
        document.getElementById('loggedUserVarsity').innerText = updatedData.Student_Varsity;
  
        toggleEditProfile(false); // Switch back to view mode
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  });
  
  
  function toggleEditProfile(isEditing) {
    const displayStyle = isEditing ? 'none' : 'inline';
    const editStyle = isEditing ? 'inline' : 'none';
  
    // Toggle visibility of profile info
    document.getElementById('loggedUserFName').style.display = displayStyle;
    document.getElementById('loggedUserLName').style.display = displayStyle;
    document.getElementById('loggedUserEmail').style.display = displayStyle;
    document.getElementById('loggedStudent_ID').style.display = displayStyle;
    document.getElementById('loggedUserPhoneNo').style.display = displayStyle;
    document.getElementById('loggedUserVarsity').style.display = displayStyle;
  
    // Toggle visibility of input fields
    document.getElementById('editFName').style.display = editStyle;
    document.getElementById('editLName').style.display = editStyle;
    document.getElementById('editEmail').style.display = editStyle;
    document.getElementById('editStudentID').style.display = editStyle;
    document.getElementById('editPhoneNo').style.display = editStyle;
    document.getElementById('editVarsity').style.display = editStyle;
  
    // Toggle buttons
    document.getElementById('editProfileButton').style.display = displayStyle;
    document.getElementById('saveProfileButton').style.display = editStyle;
    document.getElementById('cancelProfileButton').style.display = editStyle;
  }
  document.getElementById('logout').addEventListener('click', (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        window.location.href = "index.html";  // Redirect to login page after logout
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  });
  document.getElementById("stay").addEventListener('click', (e)=>{
    window.location.href = "profile.html"; // Redirect to
  });
// onAuthStateChanged(auth,async (user)=>{
//     console.log(user);
//     if(user){
//         const docRef= doc(db,'users',user.id);
//         try{
//             const docSnap= await getDoc(docRef);
//             const userData=docSnap.data();
//                 document.getElementById('loggedUserFName').innerText=userData.name;
//                 document.getElementById('loggedUserEmail').innerText=userData.email;
//                 document.getElementById('loggedUserLName').innerText=userData.Surname;
//         }catch(error){
//             console.log(error.code);
//         }

//     }else{console.log("User not found");}
// })
