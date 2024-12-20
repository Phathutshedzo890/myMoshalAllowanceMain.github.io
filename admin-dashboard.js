import { getFirestore, collection, query, onSnapshot, getDocs,deleteDoc,where,updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
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

// Function to messages
// Function to loadonly messages without an admin response)
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
  const firstNameInput = document.getElementById("searchFirstName").value.toLowerCase();
  const lastNameInput = document.getElementById("searchLastName").value.toLowerCase();
  const emailInput = document.getElementById("searchEmail").value.toLowerCase();
  const studentRows = document.querySelectorAll("#studentTableBody tr");

  studentRows.forEach((row) => {
    const firstName = row.children[0].textContent.toLowerCase();
    const lastName = row.children[1].textContent.toLowerCase();
    const email = row.children[2].textContent.toLowerCase(); // Assuming email is in the third column

    // Check if any input is filled and match accordingly
    const matchesFirstName = firstNameInput && firstName.includes(firstNameInput);
    const matchesLastName = lastNameInput && lastName.includes(lastNameInput);
    const matchesEmail = emailInput && email.includes(emailInput);

    if (matchesFirstName || matchesLastName || matchesEmail) {
      row.style.display = ""; // Show row if there’s a match
    } else {
      row.style.display = "none"; // Hide row if no match
    }
  });
});


// Initial load
loadStudents();
loadNotifications();
