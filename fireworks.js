// Simple fireworks animation using HTML canvas

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

// Firework particle object
function Firework(x, y, color) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.radius = random(2, 4);
  this.speedX = random(-5, 5);
  this.speedY = random(-10, -3);
  this.gravity = 0.2;
  this.alpha = 1;
}

Firework.prototype.update = function () {
  this.x += this.speedX;
  this.y += this.speedY;
  this.speedY += this.gravity;
  this.alpha -= 0.015;
};

Firework.prototype.draw = function () {
  ctx.globalAlpha = this.alpha;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
  ctx.fillStyle = this.color;
  ctx.fill();
};

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((f, i) => {
    f.update();
    f.draw();
    if (f.alpha <= 0) {
      fireworks.splice(i, 1);
    }
  });
}

function launchFireworks() {
  const colors = ["#ff007f", "#ffcc00", "#00ffff", "#ff6600", "#ff00ff", "#ffff66"];
  const count = 30;
  for (let i = 0; i < count; i++) {
    const x = random(0, canvas.width);
    const y = canvas.height;
    const color = colors[Math.floor(Math.random() * colors.length)];
    fireworks.push(new Firework(x, y, color));
  }
}

// Run fireworks for first 3 seconds
let fireInterval = setInterval(launchFireworks, 300);
setTimeout(() => clearInterval(fireInterval), 3000);

animate();

// Adjust canvas on window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
