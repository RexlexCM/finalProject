const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Set the title of the main window
  mainWindow.setTitle('MealPlanner');

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();

  // Create a custom menu
  const template = [
    {
      label: 'Options',
      submenu: [
        {
          label: 'Create',
          click: () => {
            const createWindow = new BrowserWindow({
              width: 800,
              height: 600,
              webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
              },
            });
            createWindow.loadFile(path.join(__dirname, 'create.html'));
          },
        },
        {
          label: 'Read/Update/Delete',
          click: () => {
            const readWindow = new BrowserWindow({
              width: 800,
              height: 600,
              webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
              },
            });
            readWindow.loadFile(path.join(__dirname, 'read.html'));
          },
        },
        {
          label: 'Go Back to Index',
          click: () => {
            // Close all windows before opening the index.html window
            BrowserWindow.getAllWindows().forEach((window) => {
              window.close();
            });
  
            const indexWindow = new BrowserWindow({
              width: 800,
              height: 600,
              webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
              },
            });
            indexWindow.loadFile(path.join(__dirname, 'index.html'));
          },
        },
        {
          label: 'Reload',
          role: 'reload',
        },
        {
          label: 'Quit',
          click: () => {
            app.quit();
          },
        },
      ],
    },
  ];
  
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file, you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
