if(document.body.ontouchstart){
  document.body.ontouchstart = function(eee){
    eee.preventDefault()
  }
}

// canvas 元素会创建一个固定大小的画布，它公开一个或者多个渲染上下文，用来回执或者处理要展示的内容
var canvas = document.getElementById('myCanvas');
// 创建一个2D的渲染上下文，用来获得渲染上下文和它的绘画功能。只接受一个参数，即上下文格式
var context = canvas.getContext('2d');

var lineWidth = 5

// 自动设置canvas窗口大小与界面大小一致
autoSetCanvasSize(canvas)

// 监听用户行为并给出对应的响应
listenToUser(canvas)

var eraserEnabled = false

// 绘画笔控制逻辑
pen.onclick = function() {
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
}

// 橡皮擦控制逻辑
eraser.onclick = function(){
  eraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')
}

red.click()

// 颜色控制逻辑
red.onclick = function(){
    context.strokeStyle = 'red'
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
green.onclick = function(){
    context.strokeStyle = 'green'
    red.classList.remove('active')
    green.classList.add('active')
    blue.classList.remove('active')
}
blue.onclick = function(){
    context.strokeStyle = 'blue'
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.add('active')
}

// 线条控制逻辑
thin.onclick = function(){
    lineWidth = 5
}
thick.onclick = function(){
    lineWidth = 10
}

// 清除控制逻辑
clear.onclick = function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}

// 下载控制逻辑
download.onclick = function(){
    var url = canvas.toDataURL("image/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '图'
    a.target = '_blank'
    a.click()
}


/******/
// 根据用户屏幕自动设置canvas的大小
function autoSetCanvasSize(canvas) {

  setCanvasSize()

  // 监听界面变化，一旦变化就调用函数
  window.onresize = function() {
    setCanvasSize()
  }

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

// 绘制圆
function drawCircle(x, y, radius) {
  context.beginPath()  // 新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径
  context.fillStyle = 'black'  // 设置填充颜色
  context.arc(x, y, radius, 0, Math.PI * 2);  // 画圆
  context.fill()  // 通过填充路径的内容区域生成实心的图形
}

// 绘制线
function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.fillStyle = 'red'
  context.moveTo(x1, y1) // 起点
  context.lineWidth = lineWidth
  context.lineTo(x2, y2) // 终点
  context.stroke()  // 通过线条来绘制图形轮廓
  context.closePath()
}

// 这个函数用于监听用户行为
function listenToUser(canvas) {
  var using = false
  var lastPoint = {
    x: undefined,
    y: undefined
  }
  if(document.body.ontouchstart !== undefined){
    // 触屏设备逻辑
    // 监听触摸开始
    canvas.ontouchstart = function(aaa) {
        var x = aaa.touches[0].clientX
        var y = aaa.touches[0].clientY
        using = true
        if (eraserEnabled) {
          context.clearRect(x - 5, y - 5, 10, 10)
        } else {
          lastPoint = {
            "x": x,
            "y": y
          }
        }
      }
    // 监听触摸移动
    canvas.ontouchmove = function(aaa) {
        var x = aaa.touches[0].clientX
        var y = aaa.touches[0].clientY
    
        if (!using) {return}
    
        if (eraserEnabled) {
          context.clearRect(x - 5, y - 5, 10, 10)
        } else {
          var newPoint = {
            "x": x,
            "y": y
          }
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
          lastPoint = newPoint
        }
      }
    // 监听触摸结束
    canvas.ontouchend = function(aaa) {
        using = false
      }

  }else{
    //   非触屏设备
    canvas.onmousedown = function(aaa) {
        console.log(aaa)
        var x = aaa.clientX
        var y = aaa.clientY
        using = true
        if (eraserEnabled) {
          context.clearRect(x - 5, y - 5, 10, 10)
        } else {
          lastPoint = {
            "x": x,
            "y": y
          }
        }
      }
    canvas.onmousemove = function(aaa) {
        var x = aaa.clientX
        var y = aaa.clientY
    
        if (!using) {return}
    
        if (eraserEnabled) {
          context.clearRect(x - 5, y - 5, 10, 10)
        } else {
          var newPoint = {
            "x": x,
            "y": y
          }
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
          lastPoint = newPoint
        }
      }
    canvas.onmouseup = function(aaa) {
        using = false
      }
    }
  }
