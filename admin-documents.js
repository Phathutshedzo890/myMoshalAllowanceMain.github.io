import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Firebase configuration (replace with your config)
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
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

document.addEventListener('DOMContentLoaded', function() {
    fetchDocuments();
});

async function fetchDocuments() {
    const documentsTable = document.getElementById('documents-table');
    documentsTable.innerHTML = ''; // Clear the table before adding new content

    try {
        // Display loading spinner while fetching documents
        showLoadingSpinner(documentsTable);

        // Start fetching each collection separately and display them incrementally
        await Promise.all([
            fetchAndDisplayDocuments('feeStatements', documentsTable),
            fetchAndDisplayDocuments('proofOfFunding', documentsTable),
            fetchAndDisplayExternalFunding(documentsTable)
        ]);

        // Hide loading spinner after fetching all documents
        hideLoadingSpinner(documentsTable);
    } catch (error) {
        console.error('Error fetching documents:', error);
    }
}

// Function to fetch and display documents for feeStatements and proofOfFunding
async function fetchAndDisplayDocuments(collectionName, table) {
    const snapshot = await getDocs(collection(db, collectionName));

    for (const doc of snapshot.docs) {
        const studentName = await getStudentName(doc.id);
        const row = createDocumentRow({
            fileName: doc.data().fileName,
            fileUrl: doc.data().fileUrl,
            uploadedBy: studentName || 'Unknown',
            category: collectionName === 'feeStatements' ? 'Fee Statement' : 'Proof of Funding',
        });
        table.appendChild(row);
    }
}

// Function to fetch and display external funding documents
async function fetchAndDisplayExternalFunding(table) {
    const externalFundingSnapshot = await getDocs(collection(db, 'ExternalFunding'));

    for (const doc of externalFundingSnapshot.docs) {
        const studentName = await getStudentNameByStudentID(doc.data().Student_ID);
        const row = createDocumentRow({
            fileName: doc.data().ExtFunding_Name,
            fileUrl: doc.data().ExtFunding_Doc_URL,
            uploadedBy: studentName || 'Unknown',
            category: 'External Funding',
        });
        table.appendChild(row);
    }
}

// Function to create a table row for a document with custom preview images
function createDocumentRow(doc) {
    let previewImageUrl;
    let ribbonClass;

    // Assign appropriate preview image based on document category and set ribbon class
    if (doc.category === 'Proof of Funding') {
        previewImageUrl = 'https://elements-resized.envatousercontent.com/elements-cover-images/c6c694e1-d7e0-4cf2-9640-7723e689f1db?w=2038&cf_fit=scale-down&q=85&format=auto&s=d5b6ccc9437820d9a73640c33551954a8fa68cb42a7b81c9ccee76cb8bd6a92b';
        ribbonClass = 'ribbon-red'; // Class for Proof of Funding
    } else if (doc.category === 'Fee Statement') {
        previewImageUrl = 'https://elements-resized.envatousercontent.com/elements-preview-images/0777c9c4-27ab-490e-af76-9ee4154408ef?w=1370&cf_fit=scale-down&q=85&format=auto&s=6cc65006876abb5b5af4649316ad9f8f6dd6e34c0f6a624170a95604c41e6782';
        ribbonClass = 'ribbon-blue'; // Class for Fee Statement
    } else if (doc.category === 'External Funding') {
        previewImageUrl = 'https://elements-resized.envatousercontent.com/elements-cover-images/077dfed2-692b-4275-9196-f77224c78513?w=2038&cf_fit=scale-down&q=85&format=auto&s=c4439eaa78adb8caac574ac7f70deb2e096fbaba011b838400d9362c7effec4d';
        ribbonClass = 'ribbon-green'; // Class for External Funding
    }

    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
            <div class="image-wrapper">
                <div class="${ribbonClass}">${doc.category}</div>
                <img src="${previewImageUrl}" alt="${doc.fileName} thumbnail" class="thumbnail" style="width: 100px; height: auto;"/>
            </div>
        </td>
        <td>${doc.uploadedBy}</td>
        <td>${doc.fileName}</td>
        <td><a href="${doc.fileUrl}" target="_blank" class="view-button">View Document</a></td>
    `;
    return row;
}


// Function to get the student's name by UID from the Student collection
async function getStudentName(uid) {
    const studentDoc = await getDoc(doc(db, 'Student', uid));
    if (studentDoc.exists()) {
        const data = studentDoc.data();
        return `${data.Student_FName} ${data.Student_LName}`;
    } else {
        return null;
    }
}

// Function to get student name by Student_ID
async function getStudentNameByStudentID(studentID) {
    const studentsSnapshot = await getDocs(collection(db, 'Student'));
    for (const student of studentsSnapshot.docs) {
        if (student.data().Student_ID === studentID) {
            const data = student.data();
            return `${data.Student_FName} ${data.Student_LName}`;
        }
    }
    return null;
}

// Display a loading spinner while documents are loading
function showLoadingSpinner(container) {
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    spinner.innerHTML = `
       
        <div class="loader">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
    </div>
    `;
    container.appendChild(spinner);
}

// Hide the loading spinner after documents have loaded
function hideLoadingSpinner(container) {
    const spinner = container.querySelector('.spinner');
    if (spinner) {
        spinner.remove();
    }
}


//header
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

 