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
    const documentsContainer = document.getElementById('documents-container');
    documentsContainer.innerHTML = ''; // Clear the container before adding new content

    try {
        // Display loading spinner while fetching documents
        showLoadingSpinner(documentsContainer);

        // Start fetching each collection separately and display them incrementally
        await Promise.all([
            fetchAndDisplayDocuments('feeStatements', documentsContainer),
            fetchAndDisplayDocuments('proofOfFunding', documentsContainer),
            fetchAndDisplayExternalFunding(documentsContainer)
        ]);

        // Hide loading spinner after fetching all documents
        hideLoadingSpinner(documentsContainer);
    } catch (error) {
        console.error('Error fetching documents:', error);
    }
}

// Function to fetch and display documents for feeStatements and proofOfFunding
async function fetchAndDisplayDocuments(collectionName, container) {
    const snapshot = await getDocs(collection(db, collectionName));
    
    for (const doc of snapshot.docs) {
        const studentName = await getStudentName(doc.id);
        const card = createDocumentCard({
            fileName: doc.data().fileName,
            fileUrl: doc.data().fileUrl,
            uploadedBy: studentName || 'Unknown',
            category: collectionName === 'feeStatements' ? 'Fee Statement' : 'Proof of Funding',
        });
        container.appendChild(card);
    }
}

// Function to fetch and display external funding documents
async function fetchAndDisplayExternalFunding(container) {
    const externalFundingSnapshot = await getDocs(collection(db, 'ExternalFunding'));

    for (const doc of externalFundingSnapshot.docs) {
        const studentName = await getStudentNameByStudentID(doc.data().Student_ID);
        const card = createDocumentCard({
            fileName: doc.data().ExtFunding_Name,
            fileUrl: doc.data().ExtFunding_Doc_URL,
            uploadedBy: studentName || 'Unknown',
            category: 'External Funding',
        });
        container.appendChild(card);
    }
}

// Function to create a card element for a document
function createDocumentCard(doc) {
    const card = document.createElement('div');
    card.classList.add('card'); // Add consistent styling class
    card.innerHTML = `
        <h2>${doc.category}</h2>
        <p><strong>Uploaded by:</strong> ${doc.uploadedBy}</p>
        <p><strong>File Name:</strong> ${doc.fileName}</p>
        <a href="${doc.fileUrl}" target="_blank" class="view-button">View Document</a>
    `;
    return card;
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
        <div class="loader">Loading...</div>
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
