import { getFirestore, collection, onSnapshot, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
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
const db = getFirestore(app);

function loadAdminMessages() {
    const messageQuery = collection(db, "Create_Query");
    onSnapshot(messageQuery, (querySnapshot) => {
        const adminMessageHistory = document.getElementById("adminMessageHistory");
        adminMessageHistory.innerHTML = ""; // Clear previous messages

        // Create a map to group messages by user
        const groupedMessages = {};

        querySnapshot.forEach((doc) => {
            const message = doc.data();
            const userName = message.userName || 'User';
            
            if (!groupedMessages[userName]) {
                groupedMessages[userName] = [];
            }

            groupedMessages[userName].push({ id: doc.id, ...message });
        });

        // Render grouped messages
        for (const [userName, messages] of Object.entries(groupedMessages)) {
            const userDiv = document.createElement("div");
            userDiv.classList.add('user-messages');
            userDiv.innerHTML = `<strong>${userName}</strong>`;

            messages.forEach((message) => {
                const messageDiv = document.createElement("div");
                messageDiv.textContent = `${message.userMessage}`;

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
                    sendResponseBtn.onclick = () => sendResponse(message.id, responseInput.value);
                    messageDiv.appendChild(responseInput);
                    messageDiv.appendChild(sendResponseBtn);
                }

                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";
                deleteBtn.onclick = () => deleteMessage(message.id);
                messageDiv.appendChild(deleteBtn);
                userDiv.appendChild(messageDiv);
            });

            adminMessageHistory.appendChild(userDiv);
        }
    });
}
async function sendResponse(messageId, response) {
    if (response.trim()) {
        await updateDoc(doc(db, "Create_Query", messageId), {
            adminResponse: response,
        });
    }
}

async function deleteMessage(messageId) {
    await deleteDoc(doc(db, "Create_Query", messageId));
}

loadAdminMessages();

//Admin Dashboard

            // Toggle Profile Dropdown
            const profileIcon = document.getElementById('profile-icon');
            const profileDropdown = document.getElementById('profile-dropdown');
            
            // Toggle dropdown visibility
            profileIcon.addEventListener('click', function (event) {
                event.preventDefault(); // Prevent default anchor behavior
                profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
            });
            
            // Close dropdown if clicked outside
            window.addEventListener('click', function (event) {
                if (!profileIcon.contains(event.target) && !profileDropdown.contains(event.target)) {
                    profileDropdown.style.display = 'none'; // Hide dropdown
                }
            });
            
            // Toggle Notifications Dropdown
            const notificationsIcon = document.getElementById('notifications-icon');
            const notificationsDropdown = document.querySelector('.notifications-dropdown-menu');
            
            // Toggle notifications dropdown visibility
            notificationsIcon.addEventListener('click', function (event) {
                event.preventDefault();
                notificationsDropdown.style.display = notificationsDropdown.style.display === 'block' ? 'none' : 'block';
            });
            
            // Close notifications dropdown if clicked outside
            window.addEventListener('click', function (event) {
                if (!notificationsIcon.contains(event.target) && !notificationsDropdown.contains(event.target)) {
                    notificationsDropdown.style.display = 'none'; // Hide dropdown
                }
            });
            
            // Dark Mode Toggle
            const darkModeToggle = document.getElementById('darkModeToggle');
            darkModeToggle.addEventListener('click', function (event) {
                event.preventDefault();
                document.body.classList.toggle('dark-mode'); // Toggle dark mode
                const icon = this.querySelector('i');
                icon.classList.toggle('ri-moon-line');
                icon.classList.toggle('ri-moon-fill');
            });
            
            // Toggle Logout Dropdown
            document.getElementById('logout-icon').addEventListener('click', function (e) {
                e.preventDefault(); // Prevent default action
                const dropdown = document.getElementById('logout-dropdown');
                dropdown.style.display = (dropdown.style.display === 'none' || dropdown.style.display === '') ? 'block' : 'none';
            });
            
            // Confirm Logout - Show message and redirect
            document.getElementById('confirm-logout').addEventListener('click', function (e) {
                e.preventDefault(); // Prevent the default link behavior
                document.getElementById('logout-message').style.display = 'block';
                setTimeout(function () {
                    window.location.href = 'admin_login.html';
                }, 2000); // 2-second delay
            });
            
            // Hide logout dropdown when clicking "No"
            document.getElementById('cancel-logout').addEventListener('click', function (e) {
                e.preventDefault(); // Prevent default action
                document.getElementById('logout-dropdown').style.display = 'none'; // Close the dropdown
            });
            
            // Modal functionality
            document.addEventListener('DOMContentLoaded', () => {
                const openModalButtons = document.querySelectorAll('[data-modal-target]');
                const closeModalButtons = document.querySelectorAll('[data-close-button]');
                const overlay = document.getElementById('overlay');
            
                openModalButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const modal = document.querySelector(button.dataset.modalTarget);
                        openModal(modal);
                    });
                });
            
                overlay.addEventListener('click', () => {
                    const modals = document.querySelectorAll('.modal.active');
                    modals.forEach(modal => {
                        closeModal(modal);
                    });
                });
            
                closeModalButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const modal = button.closest('.modal');
                        closeModal(modal);
                    });
                });
            
                function openModal(modal) {
                    if (modal == null) return;
                    modal.classList.add('active');
                    overlay.classList.add('active');
                }
            
                function closeModal(modal) {
                    if (modal == null) return;
                    modal.classList.remove('active');
                    overlay.classList.remove('active');
                }
            
                
                // Sidebar expand/collapse
                const sidebar = document.querySelector('.sidebar-main');
                sidebar.addEventListener('mouseenter', () => {
                    sidebar.classList.add('expanded');
                    sidebar.classList.remove('collapsed');
                });
            
                sidebar.addEventListener('mouseleave', () => {
                    sidebar.classList.remove('expanded');
                    sidebar.classList.add('collapsed');
                });
            
                // Table Pagination
                const rowsPerPage = 5;
                let currentPage = 1;
            
                const tableBody = document.getElementById('studentTableBody');
                const prevBtn = document.getElementById('prevBtn');
                const nextBtn = document.getElementById('nextBtn');
                const pageNumber = document.getElementById('pageNumber');
            
                const students = [
                    { firstName: "John", lastName: "Doe", email: "john@example.com", university: "Wits" },
                    { firstName: "Jane", lastName: "Smith", email: "jane@example.com", university: "UCT" },
                    { firstName: "Sam", lastName: "Brown", email: "sam@example.com", university: "UP" },
                    { firstName: "Lisa", lastName: "Adams", email: "lisa@example.com", university: "Wits" },
                    { firstName: "Mike", lastName: "Johnson", email: "mike@example.com", university: "UCT" },
                    { firstName: "Sophia", lastName: "Lee", email: "sophia@example.com", university: "UP" },
                    { firstName: "Tom", lastName: "Williams", email: "tom@example.com", university: "Wits" },
                    { firstName: "Anna", lastName: "Harris", email: "anna@example.com", university: "UCT" },
                    { firstName: "James", lastName: "Martinez", email: "james@example.com", university: "UP" }
                ];
            
                function displayTable(page) {
                    tableBody.innerHTML = '';
            
                    const startIndex = (page - 1) * rowsPerPage;
                    const endIndex = Math.min(startIndex + rowsPerPage, students.length);
            
                    for (let i = startIndex; i < endIndex; i++) {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${students[i].firstName}</td>
                            <td>${students[i].lastName}</td>
                            <td>${students[i].email}</td>
                            <td>${students[i].university}</td>
                        `;
                        tableBody.appendChild(row);
                    }
            
                    pageNumber.textContent = page;
                    prevBtn.disabled = page === 1;
                    nextBtn.disabled = page === Math.ceil(students.length / rowsPerPage);
                }
            
                prevBtn.addEventListener('click', () => {
                    if (currentPage > 1) {
                        currentPage--;
                        displayTable(currentPage);
                    }
                });
            
                nextBtn.addEventListener('click', () => {
                    if (currentPage < Math.ceil(students.length / rowsPerPage)) {
                        currentPage++;
                        displayTable(currentPage);
                    }
                });
            
                displayTable(currentPage);
            });
                
