const { ipcRenderer } = require('electron');
window.$ = window.jQuery = require('jquery');
$(document).ready(function () {
    $('#login-form').submit(function (event) {
        event.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();
        if (username === "admin" && password === "123456") {
            window.location.href = "home.html"
        } else {
            alert("Your username or password is incorrect.");
        }
    });
    $('#ivLoginClose').click(function () {
        ipcRenderer.send('quit-app');
    });
});

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