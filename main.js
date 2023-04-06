const { app, BrowserWindow , ipcMain } = require('electron')
const createWindow = () => {
    const win = new BrowserWindow({
      // width: 320,
      // height: 400,
      width: 920,
      height: 700,
      transparent: true,
      frame: false ,
      webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          enableRemoteModule: true,
      }
    })
  
    win.webContents.openDevTools()
    win.loadFile('login.html')
  }

  app.whenReady().then(() => {
    createWindow()
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

  ipcMain.on('quit-app', () => {
    app.quit();
  });