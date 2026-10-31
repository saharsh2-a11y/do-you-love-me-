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

You are the sweetest part of my life, and every moment with you feels lighter, warmer, and more beautiful. I still smile when I think about you, and I thank my heart every day for choosing you. You make my world feel brighter, softer, and infinitely more meaningful.

I love your kindness, your smile, and the way you make the world feel softer just by being in it. Every dream I have feels brighter because you are in it. I want to keep making memories with you, sharing laughter, and holding on to the love that makes life feel complete.

You are my forever, my favorite person, and my home. I love you more than words can say. 💖💌`;

const galleryImages = [
  'images/WhatsApp%20Image%202026-10-31%20at%2010.43.52%20PM.jpeg',
  'images/WhatsApp%20Image%202026-10-31%20at%2010.43.54%20PM.jpeg',
  'images/WhatsApp%20Image%202026-10-31%20at%2010.44.00%20PM.jpeg',
  'images/WhatsApp%20Image%202026-10-31%20at%2011.49.39%20PM.jpeg',
  'images/WhatsApp%20Image%202026-10-31%20at%2011.49.42%20PM.jpeg',
  'images/WhatsApp%20Image%202026-10-31%20at%2011.49.43%20PM.jpeg',
  'images/WhatsApp%20Image%202026-10-31%20at%2011.49.45%20PM.jpeg',
  'images/WhatsApp%20Image%202026-10-31%20at%2011.49.48%20PM.jpeg'
];

let audioCtx;
let isMusicPlaying = false;
let melodyTimer = null;
let heartsInterval = null;

loveMessage.textContent = personalLoveLetter;

function createBackgroundGallery() {
  backgroundGallery.innerHTML = '';

  const placements = [
    { left: '8%', top: '4%', rotate: '-10deg' },
    { right: '8%', top: '10%', rotate: '9deg' },
    { left: '18%', bottom: '12%', rotate: '7deg' },
    { right: '12%', bottom: '16%', rotate: '-8deg' },
    { left: '48%', top: '46%', rotate: '3deg' },
    { left: '10%', top: '46%', rotate: '-5deg' },
    { right: '18%', top: '48%', rotate: '6deg' },
    { left: '60%', bottom: '16%', rotate: '-9deg' }
  ];

  galleryImages.forEach((image, index) => {
    const polaroid = document.createElement('div');
    polaroid.className = 'polaroid';
    polaroid.style.backgroundImage = `url("${image}")`;

    const placement = placements[index % placements.length];
    if (placement.left) polaroid.style.left = placement.left;
    if (placement.right) polaroid.style.right = placement.right;
    if (placement.top) polaroid.style.top = placement.top;
    if (placement.bottom) polaroid.style.bottom = placement.bottom;
    polaroid.style.setProperty('--tilt', placement.rotate);
    polaroid.style.animationDelay = `${index * 0.18}s`;

    backgroundGallery.appendChild(polaroid);
  });
}

function startBackgroundScene() {
  createBackgroundGallery();
  backgroundGallery.classList.add('show');

  if (heartsInterval) clearInterval(heartsInterval);

  heartsInterval = setInterval(() => {
    createFallingHeart();
  }, 550);
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

  startBackgroundScene();

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

for (let i = 0; i < 6; i++) {
  setTimeout(() => createFallingHeart(), i * 260);
}
