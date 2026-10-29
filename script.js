const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const questionScreen = document.getElementById('questionScreen');
const celebrationScreen = document.getElementById('celebrationScreen');
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
const questionContainer = document.getElementById('card');

let yesScale = 1;

// Set canvas dimensions
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Floating background hearts particle class
class HeartParticle {
  constructor() {
    this.reset();
    this.y = Math.random() * canvas.height; 
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 20;
    this.size = Math.random() * 15 + 10;
    this.speed = Math.random() * 1.5 + 0.5;
    this.opacity = Math.random() * 0.5 + 0.2;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = '#ff4081';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + this.size / 4);
    ctx.quadraticCurveTo(this.x, this.y, this.x - this.size / 2, this.y);
    ctx.quadraticCurveTo(this.x - this.size, this.y, this.x - this.size, this.y + this.size / 2);
    ctx.quadraticCurveTo(this.x - this.size, this.y + (this.size * 3) / 4, this.x, this.y + this.size);
    ctx.quadraticCurveTo(this.x + this.size, this.y + (this.size * 3) / 4, this.x + this.size, this.y + this.size / 2);
    ctx.quadraticCurveTo(this.x + this.size, this.y, this.x + this.size / 2, this.y);
    ctx.quadraticCurveTo(this.x, this.y, this.x, this.y + this.size / 4);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  update() {
    this.y -= this.speed;
    if (this.y < -20) this.reset();
  }
}

const heartsArray = Array.from({ length: 30 }, () => new HeartParticle());

function animateBackground() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  heartsArray.forEach(heart => {
    heart.update();
    heart.draw();
  });
  requestAnimationFrame(animateBackground);
}
animateBackground();

// Fixed interaction snippet
noBtn.addEventListener("mouseover", () => {
  const newX = Math.floor(Math.random() * (questionContainer.offsetWidth - noBtn.offsetWidth));
  const newY = Math.floor(Math.random() * (questionContainer.offsetHeight - noBtn.offsetHeight));
  
  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;

  yesScale += 0.15;
  yesBtn.style.transform = `scale(${yesScale})`;
});

// Touch device handling
noBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  noBtn.dispatchEvent(new Event('mouseover'));
});

// Confetti explosion logic
function triggerConfettiBlast() {
  for(let i = 0; i < 70; i++) {
    const confetti = new HeartParticle();
    confetti.x = window.innerWidth / 2;
    confetti.y = window.innerHeight / 2;
    confetti.speed = Math.random() * 8 + 4;
    confetti.angle = Math.random() * Math.PI * 2;
    confetti.opacity = 1;
    
    confetti.update = function() {
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
      this.speed *= 0.95; 
      this.opacity -= 0.015;
    };
    confetti.draw = function() {
      if (this.opacity <= 0) return;
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = `hsl(${Math.random() * 40 + 330}, 100%, 65%)`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, Math.random() * 6 + 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
    heartsArray.push(confetti);
  }
}

// Toggle Celebration State
yesBtn.addEventListener('click', () => {
  questionScreen.style.display = 'none';
  celebrationScreen.style.display = 'block';
  triggerConfettiBlast();
});
