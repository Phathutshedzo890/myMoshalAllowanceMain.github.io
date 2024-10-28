import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, query, where, onSnapshot, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyC9dZ0tqvqLw5GE2WthGrY2qgdwwPcDyhM",
    authDomain: "mmmma-c2403.firebaseapp.com",
    projectId: "mmmma-c2403",
    storageBucket: "mmmma-c2403.appspot.com",
    messagingSenderId: "133407121519",
    appId: "1:133407121519:web:3a7868efcfc2f7aba82d9a",
    measurementId: "G-NBSGM52XGG"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let currentUser;
let name;

onAuthStateChanged(auth, async (user) => {
    const loggedInUserId = user.uid;
        if(loggedInUserId){
        const docRef=doc(db,"Student",loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData = docSnap.data();
                //console.log(userData);
                 name=userData.Student_FName;
                // const email=userData.email;
                // const Lastname=userData.Surname;
                // console.log(name,email,Lastname);
                // document.getElementById('loggedUserFName').innerText=name;
                // document.getElementById('loggedUserEmail').innerText=email;
                // document.getElementById('loggedUserLName').innerText=Lastname;
            }else{
            console.log("No document found matching id");
            }
        })
        .catch((error)=>{
            console.log("Error getting document");
        })
    }
    if (user) {
        currentUser = user;
        loadMessages();
    } else {
        // Redirect to login page
    }
});

async function loadMessages() {
    const messageQuery = query(collection(db, "Create_Query"), where("userId", "==", currentUser.uid));
    onSnapshot(messageQuery, (querySnapshot) => {
        const messageHistory = document.getElementById("messageHistory");
        messageHistory.innerHTML = ""; // Clear previous messages
        querySnapshot.forEach((doc) => {
            const message = doc.data();
            const messageDiv = document.createElement("div");
            messageDiv.textContent = `Admin: ${message.adminResponse || 'Pending'} | You: ${message.userMessage}`;
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.onclick = () => deleteMessage(doc.id);
            messageDiv.appendChild(deleteBtn);
            messageHistory.appendChild(messageDiv);
        });
    });
}

async function sendMessage() {
    const messageInput = document.getElementById("userMessage");
    const userMessage = messageInput.value;
    if (userMessage.trim()) {
        await addDoc(collection(db, "Create_Query"), {
            userId: currentUser.uid,
            userName: name || "Anonymous",
            userMessage: userMessage,
            adminResponse: null,
            timestamp: Date.now(),
        });
        messageInput.value = "";
    }
}

async function deleteMessage(messageId) {
    await deleteDoc(doc(db, "Create_Query", messageId));
}

document.getElementById("sendMessageBtn").addEventListener("click", sendMessage);
