// script.js
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.tab-button.active').classList.remove('active');
            button.classList.add('active');
            window.location.href="/documents.html";
            // Add logic to switch content based on active tab if needed
        });
    });
});
