const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const question = document.getElementById('question');
const mainCard = document.getElementById('mainCard');
const loveCard = document.getElementById('loveCard');
const loveMessage = document.getElementById('loveMessage');
const loveNote = document.getElementById('loveNote');
const musicBtn = document.getElementById('musicBtn');

const personalLoveLetter = `My love,

You are the sweetest part of my life, and every moment with you feels lighter, warmer, and more beautiful. I still smile when I think about you, and I thank my heart every day for choosing you. You are not just someone I love — you are my comfort, my joy, my safe place, and the person I want to keep choosing in every season of life.

I love your kindness, your smile, and the way you make the world feel softer just by being in it. Every dream I have feels brighter because you are in it. I want to keep making memories with you, laughing with you, growing with you, and loving you with all my heart.

You are my forever, my favorite person, and my home. I love you more than words can say. 💖💌`;

let audioCtx;
let isMusicPlaying = false;
let melodyTimer = null;

loveMessage.textContent = personalLoveLetter;

function createMelody() {
  const notes = [261.63, 329.63, 392.0, 329.63, 349.23, 440.0, 392.0, 329.63];

  let index = 0;
  melodyTimer = setInterval(() => {
    if (!audioCtx) return;

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = notes[index % notes.length];
    gainNode.gain.value = 0.0001;

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    const now = audioCtx.currentTime;
    gainNode.gain.exponentialRampToValueAtTime(0.05, now + 0.03);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    oscillator.start(now);
    oscillator.stop(now + 0.38);

    index += 1;
  }, 360);
}

function toggleMusic() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (!isMusicPlaying) {
    isMusicPlaying = true;
    musicBtn.classList.add('is-playing');
    musicBtn.textContent = '♫ On';
    createMelody();

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  } else {
    isMusicPlaying = false;
    musicBtn.classList.remove('is-playing');
    musicBtn.textContent = '♫ Music';

    if (melodyTimer) {
      clearInterval(melodyTimer);
      melodyTimer = null;
    }
  }
}

musicBtn.addEventListener('click', toggleMusic);

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', moveButton);
noBtn.addEventListener('focus', moveButton);

function moveButton() {
  const cardRect = mainCard.getBoundingClientRect();
  const centerX = cardRect.left + cardRect.width / 2 - noBtn.offsetWidth / 2;
  const centerY = cardRect.top + cardRect.height / 2 - noBtn.offsetHeight / 2;

  const driftX = 48;
  const driftY = 26;

  const x = centerX + (Math.random() - 0.5) * driftX;
  const y = centerY + (Math.random() - 0.5) * driftY;

  const minX = cardRect.left + 16;
  const maxX = cardRect.right - noBtn.offsetWidth - 16;
  const minY = cardRect.top + 16;
  const maxY = cardRect.bottom - noBtn.offsetHeight - 16;

  noBtn.style.position = 'fixed';
  noBtn.style.left = `${Math.min(Math.max(x, minX), maxX)}px`;
  noBtn.style.top = `${Math.min(Math.max(y, minY), maxY)}px`;
  noBtn.style.transition = 'left 0.45s ease, top 0.45s ease';
}

yesBtn.addEventListener('click', () => {
  mainCard.classList.add('is-celebrating');
  question.innerHTML = 'I knew it! 🥰❤️';
  loveNote.style.display = 'block';
  noBtn.style.display = 'none';

  loveCard.hidden = false;
  loveCard.classList.add('show');

  const heartIcons = ['💖', '💗', '💕', '💞', '💘', '❤️', '💓'];

  for (let i = 0; i < 40; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart-particle');
    heart.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];

    const startX = yesBtn.getBoundingClientRect().left + yesBtn.offsetWidth / 2;
    const startY = yesBtn.getBoundingClientRect().top + yesBtn.offsetHeight / 2;

    heart.style.left = `${startX}px`;
    heart.style.top = `${startY}px`;
    heart.style.setProperty('--dx', `${(Math.random() - 0.5) * 280}px`);
    heart.style.setProperty('--dy', `${-220 - Math.random() * 180}px`);

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1600);
  }
});

function createFallingHeart() {
  const heart = document.createElement('div');
  heart.classList.add('falling-heart');
  heart.textContent = ['💖', '💗', '💘', '💝', '💕'][Math.floor(Math.random() * 5)];
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.top = '-10vh';
  heart.style.setProperty('--drift', `${(Math.random() - 0.5) * 200}px`);
  heart.style.animationDelay = `${Math.random() * 6}s`;
  heart.style.fontSize = `${Math.random() * 18 + 14}px`;

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 8000);
}

for (let i = 0; i < 25; i++) {
  setTimeout(createFallingHeart, i * 240);
}

setInterval(() => {
  createFallingHeart();
}, 600);
