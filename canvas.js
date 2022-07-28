// seting up canvas //
const canvas = document.getElementById("canvas1");
const canvas2 = document.getElementById("canvas2");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//canvas.style.backgroundColor = "#25367c";
let ctx = canvas.getContext("2d");

var smokeArray = []

function SmokeCircle(x, y, radius, volX, volY, alphaValue, R, G, B) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.volX = volX;
  this.volY = volY;
  this.R = R;
  this.G = G;
  this.B = B;
  this.alphaValue = alphaValue;
  this.erase = false;

  this.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = "rgba(" + this.R + ',' + this.G + ',' + this.B + ',' + this.alphaValue + ")";
    ctx.arc(this.x, this.y, this.radius, Math.PI * 2, 0, false);
    ctx.fill();
  }
  this.update = function () {

    this.alphaValue -= 0.02;

    if (this.alphaValue == 0 || this.alphaValue < 0) {
      this.erase = true;
    }

    if (this.volX > 0) {
      this.volX -= 0.1;
    } else if (this.volX < 0) {
      this.volX += 0.1;
    }
    if (this.volY > 0) {
      this.volY -= 0.1;
    } else if (this.volY < 0) {
      this.volY += 0.1;
    }


    this.x += this.volX;
    this.y -= this.volY;
    this.draw();
  }
  this.update();

}

function Rocket(x, y, width, height, yVol, R, G, B) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.yVol = yVol;
  this.R = R;
  this.G = G;
  this.B = B;
  this.boom = false;

  this.draw = function () {
    ctx.fillStyle = "rgb(" + this.R + ',' + this.G + ',' + this.B + ")";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  this.update = function () {
    this.y -= this.yVol;
    if (this.y < 200 + Math.floor(Math.random() * 10)) {
      this.boom = true;
      var boomSound = new Audio();
      boomSound.volume = 0.5;
      boomSound.play();

      for (var i = 0; i < 40; i++) {
        var radius = Math.floor(Math.random() * 5);
        var volXSwitch = Math.floor(Math.random() * 2);
        var volYSwitch = Math.floor(Math.random() * 2);
        var vol = { x: undefined, y: undefined };
        if (volXSwitch == 0) {
          vol.x = Math.floor(Math.random() * 5) + 2;
        } else {
          vol.x = Math.floor(Math.random() * -5) + -2;
        }
        if (volYSwitch == 0) {
          vol.y = Math.floor(Math.random() * 7) + 1.5;
        } else {
          vol.y = Math.floor(Math.random() * -7) + -1.5;
        }
        var yVol = (Math.random() * 3) + 2.5;
        smokeArray.push(new SmokeCircle(
          this.x,
          this.y,
          radius,
          vol.x,
          vol.y,
          1,
          this.R,
          this.G,
          this.B
        ));
      }
      rocketArray.push(new Rocket(
        Math.random() * canvas.width,
        canvas.height,
        (Math.random() * 2) + 3,
        (Math.random() * 5) + 5,
        (Math.random() * 6) + 4,
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255)

      ));
    }
    this.draw();
  }
  this.update();
}

function fireworks() {
  var audio2 = document.getElementById("audio3");
  audio2.play();

  setTimeout(letsgo, 3000)
  
}

var rocketArray = [];

function letsgo() {
  canvas.style.backgroundColor = "#000000";
  canvas2.style.backgroundColor = "#000000";

  for (var j = 0; j < 5; j++) {
    var x = Math.random() * canvas.width;
    var y = canvas.height;
    var width = (Math.random() * 2) + 3;
    var height = (Math.random() * 5) + 5;
    var yVol = (Math.random() * 6) + 4;
    var R = Math.floor(Math.random() * 255);
    var G = Math.floor(Math.random() * 255);
    var B = Math.floor(Math.random() * 255);

    rocketArray.push(new Rocket(x, y, width, height, yVol, R, G, B));
  }
}

function animateLoop() {
  requestAnimationFrame(animateLoop);
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (var i = 0; i < smokeArray.length; i++) {
    smokeArray[i].update();
  }
  for (var j = 0; j < rocketArray.length; j++) {
    rocketArray[j].update();
  }

  rocketArray = rocketArray.filter(object => !object.boom);
  smokeArray = smokeArray.filter(object => !object.erase);
}
animateLoop();

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});