const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const { spawn } = require('child_process');
let pythonProcess;

var mainWindow = null;

app.on('ready', ()=>{
    // Start the WebSocket server.
    pythonProcess = spawn('python', ['backend/python_server.py']);

    pythonProcess.stdout.on('data', (data) => {
        console.log(`Python stdout: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`Python process exited with code ${code}`);
    });

    mainWindow = new BrowserWindow({
        width:1000,
        height:800,
        //icon:"assets/app_icon.ico",
        webPreferences:{nodeIntegration:true, contextIsolation:false}
    });
    mainWindow.loadFile('src/index.html');  // Load an HTML file to start a rendering thread.

    mainWindow.on('closed', (e)=>{
        mainWindow = null;

        if (pythonProcess) {
            pythonProcess.kill();
        }
    });
});