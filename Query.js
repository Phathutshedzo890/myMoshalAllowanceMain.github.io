document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('chat-form');
    const messageInput = document.getElementById('message-input');
    const chatMessages = document.getElementById('chat-messages');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const messageText = messageInput.value.trim();
        
        if (messageText !== '') {
            appendMessage(messageText);
            messageInput.value = '';
        }
    });

    function appendMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerText = message;
        chatMessages.appendChild(messageElement);
        
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});
