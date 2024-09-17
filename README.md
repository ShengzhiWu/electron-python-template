# electron-python-template
An Electron template with python backend based on WebSocket.

## Instructions

### 1.Prepare Your Python Environment 

Assume you have a default anaconda environment.

Open Anaconda Prompt and run:

```bash
pip install websockets
```

### 2.Initialize the project

Clone to local.

Open VSCode and open the folder.

Create a new terminal in VSCode and run:

```bash
npm i
```

```bash
python 0.py
```

`0.py` is an empty script. I don't know why we have to run this before run the Electron app. If we don't, `backend\python_server.py` will not run correctly when `electron .`. You only need to do this once. I think this is a bug. Tell me please in case you know the reason.

```bash
electron .
```

Enjoy!
