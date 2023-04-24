const { ipcRenderer } = require('electron');
window.$ = window.jQuery = require('jquery');
const keys = document.querySelectorAll('.key');
const tvKeyInput = document.getElementById('tvKeyInput');
const ivKeyDel = document.getElementById('ivKeyDel');
const ivKeySwitch = document.getElementById('ivKeySwitch');
const ivCall = document.getElementById('ivCall');
const homeTop = document.getElementById('homeTop');
const dialPad = document.getElementById('dialPad');
const talking = document.getElementById('talking');
const tabKeyboard = document.getElementById("tabKeyboard");
const ivSetting = document.getElementById("ivSetting");
const keyboardLayout = document.getElementById("keyboardLayout");
const ivSmall = document.getElementById("ivSmall");
const ivClose = document.getElementById("ivClose");

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

    const optionsCallinMusic = ['1111', '22222']

    const callinMusicSelect = document.getElementById('callinMusicSelect')
    optionsCallinMusic.forEach((option) => {
      const optionElement = document.createElement('option')
      optionElement.text = option
      callinMusicSelect.add(optionElement)
    })
    callinMusicSelect.addEventListener('change', (event) => {
        const selectedOption = event.target.value
        console.log(`选择了选项 ${selectedOption}`)
      })
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
tabKeyboard.addEventListener('click', () => {
    keyboardLayout.style.display="list-item"
    settingLayout.style.display="none"
});
ivSetting.addEventListener('click', () => {
    keyboardLayout.style.display="none"
    settingLayout.style.display="block"
});
ivCall.addEventListener('click', () => {
    ivKeySwitch.src=imgSwitch.src
    ivKeySwitch.style.visibility="visible"
    ivKeyDel.src=imgMicOpen.src
    ivKeyDel.style.width="40px"
    ivKeyDel.style.height="40px"
    ivKeyDel.style.padding="0px"
    ivCall.src=imgHangup.src
    talking.style.display="flex"
    dialPad.style.display="none"
});
ivSmall.addEventListener('click', () => {
    ipcRenderer.send('hide')
});
ivClose.addEventListener('click', () => {
    ipcRenderer.send('hide')
});
homeTop.addEventListener('mousedown', (event) => {
    const position = { x: event.screenX, y: event.screenY }
    ipcRenderer.send('mousedown', position)
})

homeTop.addEventListener('mousemove', (event) => {
    const position = { x: event.screenX, y: event.screenY }
    ipcRenderer.send('mousemove', position)
})

homeTop.addEventListener('mouseup', () => {
    ipcRenderer.send('mouseup')
})

var slider = {
  use: function(id) {
      var self = this;
      self.slider = document.getElementById(id);
      self.bar = self.slider.querySelector('.progressBar');
      self.thumb = self.slider.querySelector('.progressThumb');
      self.slider.addEventListener('mousedown', function(e) {
          if (e.button == 0) { // 判断点击左键
              self.mDown = true;
              self.beginX = e.offsetX;
              self.positionX = e.offsetX;
              self.beginClientX = e.clientX;
              self.sliderLong = parseInt(self.getStyle(self.slider, 'width'));
              console.log("offsetX=="+e.offsetX+"==clientX="+e.clientX+"==sliderLong="+self.sliderLong)
              var per = parseInt(self.positionX / self.sliderLong * 100);
              self.bar.style.width = per + '%';
          }
      });
      document.addEventListener('mousemove', function(e) {
          if (self.mDown) {
              var moveX = e.clientX - self.beginClientX;
              self.positionX = (self.beginX + moveX > self.sliderLong) ? self.sliderLong : (self.beginX + moveX < 0) ? 0 : self.beginX + moveX;
              var per = parseInt(self.positionX / self.sliderLong * 100);
              self.bar.style.width = per + '%';
          }
      });
      document.addEventListener('mouseup', function(e) {
          if (e.button == 0) {
              self.mDown = false;
          }
      });
  },
  getStyle: function(obj,styleName){ // 获取元素样式的方法
      if(obj.currentStyle){
          return obj.currentStyle[styleName];
      }else{
          return getComputedStyle(obj,null)[styleName];
      }
  }
};
slider.use('dragBar');


cbLauncher.addEventListener("change", function() {
    if (this.checked) {
      console.log("cbLauncher is checked");
    } else {
      console.log("cbLauncher is not checked");
    }
});