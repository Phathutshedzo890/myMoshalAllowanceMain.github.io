// Your web app's Firebase configuration
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
