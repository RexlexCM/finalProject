const { ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

// Define the list and function
const fileList = document.getElementById('fileList');
const fileNameInput = document.getElementById('fileNameInput');
const fileContents = document.getElementById('fileContents');
const btnAccess = document.getElementById('btnAccess');
const btnUpdate = document.getElementById('btnUpdate');
const btnDelete = document.getElementById('btnDelete');

// Define the files path
let pathName = path.join(__dirname, 'Files');

// Update file list here
function updateFileList() {
    fs.readdir(pathName, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }

        fileList.innerHTML = '';
        files.forEach((file) => {
            const listItem = document.createElement('li');
            listItem.textContent = file;
            fileList.appendChild(listItem);
        });
    });
}

// Call updateFileList() to always update it to current available text file
updateFileList();

// Read function here
btnAccess.addEventListener('click', () => {
    const selectedFileName = fileNameInput.value;
    const filePath = path.join(pathName, selectedFileName);

    // Read the selected file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        fileContents.value = data;
    });
});

// Update function here
btnUpdate.addEventListener('click', () => {
    const selectedFileName = fileNameInput.value;
    const filePath = path.join(pathName, selectedFileName);
    const newContents = fileContents.value;

    // rewrite the content of the files
    fs.writeFile(filePath, newContents, (err) => {
        if (err) {
            console.error(err);
            return;
        }

        alert(`${selectedFileName} text file was updated, please press "options > go back to index"`);
        updateFileList();
    });
});

// Delete function here
btnDelete.addEventListener('click', () => {
    const selectedFileName = fileNameInput.value;
    const filePath = path.join(pathName, selectedFileName);

    // Remove/Delete the files
    fs.unlink(filePath, (err) => {
        if (err) {
            alert(`An error occurred deleting the file: ${err.message}`);
            console.error(err);
            return;
        }

        alert(`${selectedFileName} text file was deleted, please press "options > go back to index"`);
        fileNameInput.value = '';
        fileContents.value = '';
        updateFileList();
    });
});

// List all the files, allow the user to click the files
fileList.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        fileNameInput.value = event.target.textContent;
        btnAccess.click();
    }
});
