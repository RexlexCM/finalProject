const { app, BrowserWindow } = require('electron');
const fs = require('fs')
const path = require('path')

// Defining the variables
var btnCreate = document.getElementById('btnCreate')
var fileName = document.getElementById('fileName')
var fileContents = document.getElementById('fileContents')

// Defining the path
let pathName = path.join(__dirname, 'Files')

// Create button function
btnCreate.addEventListener('click', function() {
    let fileNameValue = fileName.value;
    // Check if the file has .txt at the end or not
    if (!fileNameValue.endsWith('.txt')) {
        fileNameValue += '.txt';
    }

    let file = path.join(pathName, fileNameValue);
    let contents = fileContents.value;

    // Creating file
    fs.writeFile(file, contents, function(err) {
        if(err) {
            alert("An error occurred creating the file" + err.message);
            return console.log(err);
        }
        alert(fileNameValue + " text file was created, go to 'Options > Read/Update/Delete' to access it");
        console.log("The file was created");
    });
});
