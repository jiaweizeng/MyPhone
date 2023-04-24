const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron')

let isDragging = false
let mousePosition
const log = require('electron-log')
const path = require('path')
let tray = null
let win = null

const createWindow = () => {
  win = new BrowserWindow({
    // width: 320,
    // height: 400,
    width: 920,
    height: 700,
    transparent: true,
    frame: false,
    icon: path.join(__dirname, 'drawable/ic_launcher.png'), // 设置应用程序图标
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  })

  win.show()
  win.webContents.openDevTools()
  win.loadFile('home.html')
}

// app.on('ready', () => {
// })
app.whenReady().then(() => {
  createWindow()
  // 创建一个 Tray 对象并设置图标
  tray = new Tray(path.join(__dirname, 'drawable/ic_launcher.png'))

  const contextMenu = Menu.buildFromTemplate([
    { label: '打开应用', click: () => { win.show() } },
    { label: '退出应用', click: () => { app.quit() } }
  ])

  // 设置 Tray 工具提示
  tray.setToolTip('My Phone')

  // 点击 Tray 图标时触发的事件
  tray.on('click', () => {
    // 在这里编写点击 Tray 图标后的响应事件代码
    win.show()
  })

  tray.setContextMenu(contextMenu)

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

})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('quit-app', () => {
  app.quit();
});

ipcMain.on('hide', () => {
  win.hide()
});

