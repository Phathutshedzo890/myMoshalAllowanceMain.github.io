import { getFirestore, collection, onSnapshot, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


function loadAdminMessages() {
    const messageQuery = collection(db, "messages");
    onSnapshot(messageQuery, (querySnapshot) => {
        const adminMessageHistory = document.getElementById("adminMessageHistory");
        adminMessageHistory.innerHTML = ""; // Clear previous messages
        querySnapshot.forEach((doc) => {
            const message = doc.data();
            const messageDiv = document.createElement("div");
            messageDiv.textContent = `${message.userName || 'User'}: ${message.userMessage}`;
            if (message.adminResponse) {
                const responseDiv = document.createElement("div");
                responseDiv.textContent = `Admin: ${message.adminResponse}`;
                messageDiv.appendChild(responseDiv);
            } else {
                const responseInput = document.createElement("input");
                responseInput.type = "text";
                responseInput.placeholder = "Type your response...";
                const sendResponseBtn = document.createElement("button");
                sendResponseBtn.textContent = "Send Response";
                sendResponseBtn.onclick = () => sendResponse(doc.id, responseInput.value);
                messageDiv.appendChild(responseInput);
                messageDiv.appendChild(sendResponseBtn);
            }
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.onclick = () => deleteMessage(doc.id);
            messageDiv.appendChild(deleteBtn);
            adminMessageHistory.appendChild(messageDiv);
        });
    });
}

async function sendResponse(messageId, response) {
    if (response.trim()) {
        await updateDoc(doc(db, "messages", messageId), {
            adminResponse: response,
        });
    }
}

async function deleteMessage(messageId) {
    await deleteDoc(doc(db, "messages", messageId));
}

loadAdminMessages();
