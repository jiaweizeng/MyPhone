const { ipcRenderer } = require('electron');
window.$ = window.jQuery = require('jquery');
const keys = document.querySelectorAll('.key');
const tvKeyInput = document.getElementById('tvKeyInput');
const ivKeyDel = document.getElementById('ivKeyDel');
const ivKeySwitch = document.getElementById('ivKeySwitch');
const ivCall = document.getElementById('ivCall');

// 更改 src 属性值会导致浏览器重新下载图像。如果需要在页面中多次更改图像内容，可以将图像预加载到缓存中，以避免重复下载。可以使用 Image() 对象来实现预加载
const imgHangup = new Image();
imgHangup.src = "drawable/hang_up3.png";
imgHangup.onload = function() {
  // 图像已加载完成
};
const imgSwitch = new Image();
imgSwitch.src = "drawable/keyboard_select.png";
imgSwitch.onload = function() {
  // 图像已加载完成
};
const imgMicOpen = new Image();
imgMicOpen.src = "drawable/mic_open_circle.png";
imgMicOpen.onload = function() {
  // 图像已加载完成
};
const imgMicClose = new Image();
imgMicClose.src = "drawable/mic_close_circle.png";
imgMicClose.onload = function() {
  // 图像已加载完成
};
$(document).ready(function () {

});

keys.forEach(button => {
    button.addEventListener('click', () => {
        // 获取按钮的文本信息
        const text = button.textContent;
        tvKeyInput.textContent = tvKeyInput.textContent + text;
    });
});
ivKeyDel.addEventListener('click', () => {
    const length = tvKeyInput.textContent.length
    tvKeyInput.textContent = tvKeyInput.textContent.substring(0, length - 1)
});
ivCall.addEventListener('click', () => {
    ivKeySwitch.src=imgSwitch.src
    ivKeySwitch.style.visibility="visible"
    ivKeyDel.src=imgMicOpen.src
    ivKeyDel.style.width="40px"
    ivKeyDel.style.height="40px"
    ivKeyDel.style.padding="0px"
    ivCall.src=imgHangup.src
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