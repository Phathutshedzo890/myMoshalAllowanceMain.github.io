import { getFirestore, collection, query, onSnapshot, getDocs,deleteDoc,where,updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
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
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to load student data from Firestore
async function loadStudents() {
  const studentTableBody = document.getElementById("studentTableBody");
  const studentsQuery = query(collection(db, "Student"));

  const snapshot = await getDocs(studentsQuery);
  studentTableBody.innerHTML = ""; // Clear previous rows

  snapshot.forEach((doc) => {
    const student = doc.data();
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.Student_FName}</td>
      <td>${student.Student_LName}</td>
      <td>${student.Student_email}</td>
      <td>${student.Student_Varsity}</td>
    `;
    studentTableBody.appendChild(row);
  });
}

// Load admin messages from Firestore
function loadAdminMessages() {
  const messageQuery = collection(db, "Create_Query");
  onSnapshot(messageQuery, (querySnapshot) => {
    const adminMessageHistory = document.getElementById("adminMessageHistory");
    adminMessageHistory.innerHTML = ""; // Clear previous messages

    querySnapshot.forEach((doc) => {
      const message = doc.data();

      // Only process messages without an admin response
      if (!message.adminResponse) {
        const messageDiv = document.createElement("div");
        messageDiv.textContent = `${message.userName || 'User'}: ${message.userMessage}`;

        // Create an input and button for the admin response
        const responseInput = document.createElement("input");
        responseInput.type = "text";
        responseInput.placeholder = "Type your response...";
        const sendResponseBtn = document.createElement("button");
        sendResponseBtn.textContent = "Send Response";
        sendResponseBtn.onclick = () => sendResponse(doc.id, responseInput.value);
        
        // Append response input and button to the message div
        messageDiv.appendChild(responseInput);
        messageDiv.appendChild(sendResponseBtn);

        // Create a delete button for the message
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteMessage(doc.id);
        messageDiv.appendChild(deleteBtn);

        // Add the message div to the history display
        adminMessageHistory.appendChild(messageDiv);
      }
    });
  });
}


// Send response to Firestore
async function sendResponse(messageId, response) {
  if (response.trim()) {
    await updateDoc(doc(db, "Create_Query", messageId), {
      adminResponse: response,
    });
  }
}

// Delete message from Firestore
async function deleteMessage(messageId) {
  await deleteDoc(doc(db, "Create_Query", messageId));
}
const messageBoard = document.getElementById("adminMessageHistory");
messageBoard.style.overflowY = "auto";
messageBoard.style.maxHeight = "500px"; // adjust the height as needed

// Load admin messages on page load
loadAdminMessages();

// Function to load notifications (messages)
// Function to load notifications (only messages without an admin response)
function loadNotifications() {
    const notificationsCount = document.getElementById("notificationsCount");
    const messagesQuery = collection(db, "Create_Query");
  
    onSnapshot(messagesQuery, (snapshot) => {
      let newMessages = 0;
      
      snapshot.forEach((doc) => {
        const message = doc.data();
        // Count only messages that don't have an admin response
        if (!message.adminResponse || message.adminResponse.trim() === "") {
          newMessages += 1;
        }
      });
  
      notificationsCount.textContent = `You have ${newMessages} new messages awaiting response`;
    });
  }
  
// Search functionality
document.getElementById("searchBtn").addEventListener("click", () => {
  const searchInput = document.getElementById("searchInput").value.toLowerCase();
  const studentRows = document.querySelectorAll("#studentTableBody tr");

  studentRows.forEach((row) => {
    const firstName = row.children[0].textContent.toLowerCase();
    const lastName = row.children[1].textContent.toLowerCase();

    if (firstName.includes(searchInput) || lastName.includes(searchInput)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});

// Initial load
loadStudents();
loadNotifications();
