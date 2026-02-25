const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 600
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);
