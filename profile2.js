import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import{getAuth,onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import{getFirestore,doc,getDocs,collection} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"

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
