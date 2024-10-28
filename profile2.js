import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import{getAuth,onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import{getFirestore,doc,getDocs,collection} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"

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
  const colRef= collection(db,'users');
  getDocs(colRef)
    .then((snapshot)=>{
       let users=[]
       snapshot.docs.forEach((doc)=>{
        users.push({...doc.data(), id: doc.id})
       })
       console.log(users);
    })
