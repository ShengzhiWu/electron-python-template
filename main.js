const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;  // 窗口引用

const { spawn } = require('child_process');
let pythonProcess;

var mainWindow = null;  // 主窗口

app.on('ready', ()=>{
    // 启动 Python WebSocket 服务器
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
        width:1000,  // 窗口尺寸
        height:800,
        //icon:"assets/app_icon.ico",
        webPreferences:{nodeIntegration:true, contextIsolation:false}
    });
    mainWindow.loadFile('src/index.html');  // 加载HTML页面以启动一个渲染进程

    mainWindow.on('closed', (e)=>{
        mainWindow = null;

        if (pythonProcess) {
            pythonProcess.kill();
        }
    });
});