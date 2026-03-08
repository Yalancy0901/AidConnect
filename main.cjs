const { app, BrowserWindow } = require("electron");
const { spawn } = require("child_process");
const path = require("path");

let mainWindow;
let backendProcess;

function createWindow() {

  // Start Node backend
  backendProcess = spawn("node", ["server/index.js"]);

  backendProcess.stdout.on("data", data => {
    console.log(`Backend: ${data}`);
  });

  backendProcess.stderr.on("data", data => {
    console.error(`Backend Error: ${data}`);
  });

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800
  });

  // Load React build
  mainWindow.loadFile(path.join(__dirname, "dist", "index.html"));
 
}

app.whenReady().then(createWindow);