import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import{getAuth,onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import{getFirestore,doc,getDoc,collection,updateDoc} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"

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
  
    const updatedData = {
      Student_FName: document.getElementById('editFName').value,
      Student_LName: document.getElementById('editLName').value,
      Student_email: document.getElementById('editEmail').value,
      Student_ID: document.getElementById('editStudentID').value,
      Student_PhoneNo: document.getElementById('editPhoneNo').value,
      Student_Varsity: document.getElementById('editVarsity').value
    };
  
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
