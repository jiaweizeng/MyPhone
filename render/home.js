const { ipcRenderer } = require('electron');

document.addEventListener('mousedown', (event) => {
    const position = { x: event.screenX, y: event.screenY }
    ipcRenderer.send('mousedown', position)
})

document.addEventListener('mousemove', (event) => {
    const position = { x: event.screenX, y: event.screenY }
    ipcRenderer.send('mousemove', position)
})

document.addEventListener('mouseup', () => {
    ipcRenderer.send('mouseup')
})