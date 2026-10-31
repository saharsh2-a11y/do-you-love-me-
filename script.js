const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const question = document.getElementById('question');
const mainCard = document.getElementById('mainCard');
const loveCard = document.getElementById('loveCard');
const loveMessage = document.getElementById('loveMessage');
const loveNote = document.getElementById('loveNote');
const musicBtn = document.getElementById('musicBtn');
const backgroundGallery = document.getElementById('backgroundGallery');

const personalLoveLetter = `My love,

You are the sweetest part of my life, and every moment with you feels lighter, warmer, and more beautiful. I still smile when I think about you, and I thank my heart every day for choosing you. You make even ordinary days feel special, and every dream I have feels brighter because you are in it.

I love your kindness, your smile, and the way you make the world feel softer just by being in it. I want to keep making memories with you, laughing together, and building a beautiful life full of love, peace, and happiness.

You are my forever, my favorite person, and my home. I love you more than words can say. 💖💌`;

const galleryImages = [
  "images/WhatsApp Image 2026-10-31 at 10.43.52 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.43.54 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.43.58 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.43.59 PM (1).jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.43.59 PM (2).jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.43.59 PM (3).jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.43.59 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.44.00 PM (1).jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.44.00 PM (2).jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.44.00 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.44.01 PM (1).jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.44.01 PM (2).jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.44.01 PM (3).jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.44.01 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.44.02 PM (1).jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.44.02 PM (2).jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.44.02 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.44.03 PM (1).jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.44.03 PM (2).jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.44.03 PM (3).jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.44.03 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.44.04 PM (1).jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.44.04 PM (2).jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.44.04 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.46.17 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.46.18 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.46.20 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.46.21 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.46.23 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.46.35 PM (1).jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.46.35 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.46.36 PM (1).jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.46.36 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.48.05 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.48.06 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.48.09 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.48.12 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.48.13 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.48.28 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.48.30 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.48.33 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.48.36 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.48.37 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.48.38 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.48.42 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.48.48 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.48.49 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.49.02 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.49.06 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.49.13 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.49.14 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.49.16 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.49.18 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.49.21 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.49.24 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.49.27 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.49.30 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.49.40 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.49.41 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.49.43 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.49.44 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.49.46 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.49.48 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.49.49 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.49.52 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.49.56 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.49.57 PM (1).jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.49.57 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.49.58 PM (1).jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.49.58 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.49.59 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.50.00 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.50.01 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.50.02 PM (1).jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.50.02 PM (2).jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.50.02 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.50.03 PM (1).jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.50.03 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.50.04 PM (1).jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.50.04 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.50.07 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.50.08 PM (1).jpeg",
  "images/WhatsApp Image 2026-10-31 at 10.50.08 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 11.49.37 PM (1).jpeg",
  "images/WhatsApp Image 2026-10-31 at 11.49.37 PM (2).jpeg",
  "images/WhatsApp Image 2026-10-31 at 11.49.37 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 11.49.38 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 11.49.39 PM (1).jpeg",
  "images/WhatsApp Image 2026-10-31 at 11.49.39 PM.jpeg",
  "images/WhatsApp Image 2026-10-31 at 11.49.41 PM.jpeg"
];

let audioCtx;
let isMusicPlaying = false;
let melodyTimer = null;
let heartsInterval = null;

loveMessage.textContent = personalLoveLetter;

function createBackgroundGallery() {
  backgroundGallery.innerHTML = '';

  galleryImages.forEach((image, index) => {
    const polaroid = document.createElement('div');
    polaroid.className = 'polaroid';
    polaroid.style.backgroundImage = `url("${image}")`;

    const angle = (Math.random() * 28) - 14;
    const left = 4 + Math.random() * 82;
    const top = -(10 + Math.random() * 22);

    polaroid.style.left = `${left}%`;
    polaroid.style.top = `${top}%`;
    polaroid.style.setProperty('--angle', `${angle}deg`);
    polaroid.style.setProperty('--driftX', `${(Math.random() - 0.5) * 90}px`);
    polaroid.style.setProperty('--dropY', `${(Math.random() * 80) + 28}px`);
    polaroid.style.animationDelay = `${index * 0.12}s`;

    backgroundGallery.appendChild(polaroid);
  });
}

function startBackgroundScene() {
  createBackgroundGallery();
  backgroundGallery.classList.add('show');

  if (heartsInterval) clearInterval(heartsInterval);

  heartsInterval = setInterval(() => {
    for (let i = 0; i < 3; i++) {
      createFallingHeart();
    }
  }, 220);
}

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

function moveButton() {
  const x = Math.floor(Math.random() * (window.innerWidth - noBtn.offsetWidth));
  const y = Math.floor(Math.random() * (window.innerHeight - noBtn.offsetHeight));
  
  noBtn.style.left = ${x}px;
  noBtn.style.top = ${y}px;

yesBtn.addEventListener('click', () => {
  if (mainCard.classList.contains('is-celebrating')) return;

  mainCard.classList.add('is-celebrating');
  question.innerHTML = 'I knew it! 🥰❤️';
  loveNote.style.display = 'block';
  noBtn.style.display = 'none';

  startBackgroundScene();

  loveCard.hidden = false;
  loveCard.classList.add('show');

  const heartIcons = ['💖', '💗', '💕', '💞', '💘', '❤️', '💓'];

  for (let i = 0; i < 50; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart-particle');
    heart.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];

    const startX = yesBtn.getBoundingClientRect().left + yesBtn.offsetWidth / 2;
    const startY = yesBtn.getBoundingClientRect().top + yesBtn.offsetHeight / 2;

    heart.style.left = `${startX}px`;
    heart.style.top = `${startY}px`;
    heart.style.setProperty('--dx', `${(Math.random() - 0.5) * 320}px`);
    heart.style.setProperty('--dy', `${-260 - Math.random() * 220}px`);

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1700);
  }
});

function createFallingHeart() {
  const heart = document.createElement('div');
  heart.classList.add('falling-heart');
  heart.textContent = ['💖', '💗', '💘', '💝', '💕'][Math.floor(Math.random() * 5)];
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.top = '-10vh';
  heart.style.setProperty('--drift', `${(Math.random() - 0.5) * 260}px`);
  heart.style.animationDelay = `${Math.random() * 6}s`;
  heart.style.fontSize = `${Math.random() * 18 + 18}px`;

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 9000);
}

for (let i = 0; i < 9; i++) {
  setTimeout(() => createFallingHeart(), i * 180);
}
