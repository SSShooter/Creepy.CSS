let creepy = {
  jumpScare(url) {
    let conteiner = document.createElement('div')
    conteiner.style.cssText = `
        display: none;
        position:fixed;
        top:0;
        left:0;
        height: 100%;
        width: 100%;
        background-color: #000000;
        background-image:url(${url});
        background-size: contain;
        background-repeat:no-repeat;
        background-position:center; 
      `
    document.body.appendChild(conteiner)
    return {
      show(during) {
        conteiner.style.display = 'block'
        setTimeout(() => {
          conteiner.style.display = 'none'
        }, during || 1000)
      },
      hide() {
        conteiner.style.display = 'none'
      },
      loop(interval, during) {
        if (window.creepyJsJumpScareLoop) return
        window.creepyJsJumpScareLoop = setInterval(() => {
          conteiner.style.display = 'block'
          setTimeout(() => {
            conteiner.style.display = 'none'
          }, during || 1000)
        }, interval || 1000 * 60)
      },
      cancelLoop() {
        clearInterval(window.creepyJsJumpScareLoop)
      }
    }
  },
  BloodyBoxInit(){
    var elList = document.querySelectorAll('.bloody-box')
    elList.forEach(el => {
      var newCanvas = document.createElement('canvas')
      el.appendChild(newCanvas)
      this.BloodyBox(newCanvas)
    });
    
  },
  BloodyBox(canvas) {
    var PEAK = 100
    var ctx
    var VertexList = []
    var VertexListLength = 270
    var YValueList = []
    var peak = PEAK // 最高值
    var baseHeight = 20
    var emitCenter = VertexListLength / 2 // 触发中心值
    var dd = 15 // 黏稠度
    var color1 = '#af111c'
    var color2 = '#af111c'

    window.addEventListener('load', init)
    window.addEventListener('resize', resize)

    function resize() {
      initCanvas()
      var cW = canvas.width
      for (var i = 0; i < VertexListLength; i++)
        VertexList[i] = new Vertex(
          (cW / (VertexListLength - 1)) * i,
          0,
          baseHeight
        )
      initDiffPt()
    }
    function init() {
      resize()
      var FPS = 30
      var interval = (1000 / FPS) >> 0
      var timer = setInterval(update, interval)
      var auto = setInterval(function() {
        peak = PEAK
        emitCenter = Math.floor(VertexListLength * Math.random())
      }, 3000)

      canvas.addEventListener('click', function(e) {
        var mouseX = e.pageX
        peak = PEAK
        if (mouseX < canvas.width - 2) {
          emitCenter =
            1 + Math.floor(((VertexListLength - 2) * mouseX) / canvas.width)
        }
      })
    }

    function initDiffPt() {
      for (var i = 0; i < VertexListLength; i++) YValueList[i] = 0
    }

    function update() {
      peak = peak * 0.1
      YValueList[emitCenter] = peak

      for (var i = emitCenter - 1; i > 0; i--) {
        var distance = emitCenter - i
        if (distance > dd) distance = dd
        YValueList[i] =
          YValueList[i] -
          (YValueList[i] - YValueList[i + 1]) * (1 - 0.01 * distance)
      }

      for (var i = emitCenter + 1; i < VertexListLength; i++) {
        var distance = i - emitCenter
        if (distance > dd) distance = dd
        YValueList[i] -=
          (YValueList[i] - YValueList[i - 1]) * (1 - 0.01 * distance)
      }

      for (var i = 0; i < VertexList.length; i++) {
        VertexList[i].updateY(YValueList[i])
      }
      draw()
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.fillStyle = color1
      ctx.lineTo(VertexList[0].x, VertexList[0].y)
      for (var i = 1; i < VertexList.length; i += 10) {
        ctx.lineTo(VertexList[i].x, VertexList[i].y)
      }
      ctx.lineTo(canvas.width, VertexList[269].y)
      ctx.lineTo(canvas.width, 0)
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.fillStyle = color2
      ctx.lineTo(VertexList[0].x - 15, VertexList[0].y - 5)
      for (var i = 1; i < VertexList.length; i += 10) {
        ctx.lineTo(VertexList[i].x - 15, VertexList[i].y - 5)
      }
      ctx.lineTo(canvas.width, VertexList[269].y - 5)
      ctx.lineTo(canvas.width, 0)
      ctx.fill()
    }

    function initCanvas() {
      canvas.width = canvas.parentElement.offsetWidth
      canvas.height = 20
      ctx = canvas.getContext('2d')
    }

    function Vertex(x, y, baseY) {
      this.baseY = baseY
      this.x = x
      this.y = y
      this.vy = 0
      this.targetY = 0
      this.friction = 0.15
      this.deceleration = 0.95
    }

    Vertex.prototype.updateY = function(diffVal) {
      this.targetY = diffVal + this.baseY
      this.vy += this.targetY - this.y
      this.y += this.vy * this.friction
      this.vy *= this.deceleration
    }
  }
}
