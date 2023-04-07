const { app, BrowserWindow, ipcMain } = require('electron')
let isDragging = false
let mousePosition
const log = require('electron-log')
const createWindow = () => {
  const win = new BrowserWindow({
    // width: 320,
    // height: 400,
    width: 920,
    height: 700,
    transparent: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  })

  win.show()
  win.webContents.openDevTools()
  win.loadFile('home.html')

  // 注册鼠标按下事件
  ipcMain.on('mousedown', (event, position) => {
    isDragging = true
    mousePosition = position
  })

  // 注册鼠标移动事件
  ipcMain.on('mousemove', (event, position) => {
    if (isDragging) {
      const { x: mouseX, y: mouseY } = position
      const [windowX, windowY] = win.getPosition()
      const dx = mouseX - mousePosition.x
      const dy = mouseY - mousePosition.y
      var newX = windowX + dx
      var newY = windowY + dy
      win.setPosition(newX, newY);
      mousePosition = { x: mouseX, y: mouseY }
    }
  })

  // 注册鼠标松开事件
  ipcMain.on('mouseup', (event) => {
    isDragging = false
  })

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

