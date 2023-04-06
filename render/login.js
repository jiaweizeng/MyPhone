// const { ipcRenderer } = require('electron');
// const $ = require('jquery');
$(document).ready(function () {
    $('#login-form').submit(function (event) {
        event.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();

        if (username === "admin" && password === "123456") {
            window.location.href = "main.html";
        } else {
            alert("Your username or password is incorrect.");
        }
    });
    $('#ivLoginClose').click(function () {
        // app.quit();
        // alert("asdjkflajsdflksa");
        // ipcRenderer.send('close-app');
    });
});