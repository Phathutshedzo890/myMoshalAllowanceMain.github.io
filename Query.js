// Your web app's Firebase configuration
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
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const badge = document.getElementById('badge');

let messageCount = 0;

// Listen for new messages
database.ref('messages').on('child_added', function(snapshot) {
    const message = snapshot.val();
    displayMessage(message.text, message.sender);
    messageCount++;
    updateBadge(messageCount);
});

// Send a new message
sendButton.addEventListener('click', function() {
    const messageText = messageInput.value;
    const sender = "student"; // Change to "admin" if admin is sending the message

    if (messageText !== "") {
        const newMessageRef = database.ref('messages').push();
        newMessageRef.set({
            text: messageText,
            sender: sender
        });
        messageInput.value = "";
        messageCount++;
        updateBadge(messageCount);
    }
});

// Display message in chat box
function displayMessage(text, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = text;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Update notification badge
function updateBadge(count) {
    badge.textContent = count;
}
