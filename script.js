document.getElementById('fileInput').addEventListener('change', function() {
    const file = this.files[0];
    const fileInfo = document.getElementById('fileInfo');
    
    if (file) {
        fileInfo.innerHTML = `
            <p><strong>File Name:</strong> ${file.name}</p>
            <p><strong>File Size:</strong> ${(file.size / 1024).toFixed(2)} KB</p>
            <p><strong>File Type:</strong> ${file.type}</p>
        `;
    } else {
        fileInfo.innerHTML = '<p>No file selected</p>';
    }
});
