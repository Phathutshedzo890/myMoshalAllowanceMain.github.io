import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import{getAuth,onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import{getFirestore,doc,getDoc,collection} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"

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

  const auth = getAuth();
  const db=getFirestore();

  onAuthStateChanged(auth, async (user)=>{
    const loggedInUserId = user.uid;

    if(loggedInUserId){
        const docRef=doc(db,"users",loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData = docSnap.data();
                //console.log(userData);
                const name=userData.name;
                const email=userData.email;
                const Lastname=userData.Surname;
                //console.log(name,email,Lastname);
                document.getElementById('loggedUserFName').innerText=name;
                document.getElementById('loggedUserEmail').innerText=email;
                document.getElementById('loggedUserLName').innerText=Lastname;
            }else{
            console.log("No document found matching id");
            }
        })
        .catch((error)=>{
            console.log("Error getting document");
        })
    }else{
        console.log("user id not found in database");
    }
  });

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
