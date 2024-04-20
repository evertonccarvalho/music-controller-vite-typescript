import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import fs from "node:fs"
const preload = path.join(__dirname,'preload.js');
const musicDir = path.join(__dirname,'..','..','public','musicas');
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow: BrowserWindow;
const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
			nodeIntegration: true,
			contextIsolation: true,
      preload: preload,
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

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

ipcMain.on('music-upload', (event, file) => {
  const filePath = path.join(musicDir, file.name);
  fs.writeFile(filePath, file.data, async (err) => {
      if (err) {
        console.log(err)
          mainWindow.webContents.send('toast:recive', err.message);
      } else {
        console.log("Arquivo recebido com sucesso")
        sendUpdateList();
        mainWindow.webContents.send('toast:recive', 'Arquivo recebido com sucesso');
      }
  });
})  


ipcMain.on("music-get", ()=>{
  sendUpdateList()
})

async function sendUpdateList() {
  const files = await fs.promises.readdir(musicDir)
  mainWindow.webContents.send('music-list', files)  
}

ipcMain.on('music-delete', async (event, file) => {
  const filePath = path.join(musicDir, file);
  fs.unlink(filePath, async (err) => {
    if (err) {
      mainWindow.webContents.send("toast:recive", err)
    } else {
      sendUpdateList();
      mainWindow.webContents.send("toast:recive", "File deleted successfully");
    }
  });
});

ipcMain.on('music-to-play', (event, fileName) => {
  mainWindow.webContents.send("music-playable", fileName)
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
