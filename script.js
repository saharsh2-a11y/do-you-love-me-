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

You were the best unplanned thing that ever happened in my life.

I never searched for you.
I never expected you.
I never imagined that an ordinary day would introduce me to someone who would quietly change the way I looked at life.

You came into my world without a warning, without a perfect plan, and without any promises.
Yet somehow, you became one of the greatest blessings I have ever known.

You taught me that not everything beautiful needs to be planned.
Some of life’s most precious moments happen when we stop trying to control every detail and simply allow life to surprise us.

You became my comfort on difficult days, my smile when life felt heavy, and the reminder that the universe sometimes knows exactly what we need before we do.

If someone had asked me before we met what my future would look like, I would never have described you.
And maybe that’s the beauty of it. Because the best things in life rarely arrive when we’re expecting them.
They appear quietly, change us gently, and leave our hearts fuller than they were before.

So if there’s one thing I’ll always be grateful for,
it’s that life didn’t follow my plans.
Because if it had, I might never have met you — the most beautiful, unexpected chapter of my story.

♡`;

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

let audioCtx = null;
let isMusicPlaying = false;
let melodyTimer = null;
let heartsInterval = null;

function safeSetText(element, value) {
  if (element) {
    element.textContent = value;
  }
}

function initializeLoveMessage() {
  safeSetText(loveMessage, personalLoveLetter);
}

function createBackgroundGallery() {
  if (!backgroundGallery) return;

  backgroundGallery.innerHTML = '';

  const placements = [
    { left: '8%', top: '4%', rotate: '-10' },
    { right: '8%', top: '10%', rotate: '9' },
    { left: '18%', bottom: '12%', rotate: '7' },
    { right: '12%', bottom: '16%', rotate: '-8' },
    { left: '48%', top: '46%', rotate: '3' },
    { left: '10%', top: '46%', rotate: '-5' },
    { right: '18%', top: '48%', rotate: '6' },
    { left: '60%', bottom: '16%', rotate: '-9' }
  ];

  galleryImages.forEach((image, index) => {
    const polaroid = document.createElement('div');
    polaroid.className = 'polaroid';
    polaroid.style.backgroundImage = `url("${image}")`;
    polaroid.style.setProperty('--delay', index);

    const placement = placements[index % placements.length];
    polaroid.style.setProperty('--tilt', `${placement.rotate}deg`);

    if (placement.left) polaroid.style.left = placement.left;
    if (placement.right) polaroid.style.right = placement.right;
    if (placement.top) polaroid.style.top = placement.top;
    if (placement.bottom) polaroid.style.bottom = placement.bottom;
    polaroid.style.transform = `rotate(${placement.rotate}deg)`;

    backgroundGallery.appendChild(polaroid);
  });
}

function startBackgroundScene() {
  createBackgroundGallery();

  if (!backgroundGallery) return;
  backgroundGallery.classList.add('show');

  if (heartsInterval) clearInterval(heartsInterval);
  heartsInterval = setInterval(() => createFallingHeart(), 550);
}

function createMelody() {
  if (!audioCtx) return;

  const notes = [261.63, 329.63, 392.0, 329.63, 349.23, 440.0, 392.0, 329.63];
  let index = 0;

  melodyTimer = setInterval(() => {
    if (!audioCtx || audioCtx.state === 'closed') return;

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
  if (!musicBtn) return;

  if (!audioCtx) {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) return;
    audioCtx = new AudioCtor();
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

function moveButton() {
  if (!mainCard || !noBtn) return;

  const cardRect = mainCard.getBoundingClientRect();
  const offsetW = noBtn.offsetWidth || 120;
  const offsetH = noBtn.offsetHeight || 52;

  const centerX = cardRect.left + cardRect.width / 2 - offsetW / 2;
  const centerY = cardRect.top + cardRect.height / 2 - offsetH / 2;

  const driftX = 48;
  const driftY = 26;

  const x = centerX + (Math.random() - 0.5) * driftX;
  const y = centerY + (Math.random() - 0.5) * driftY;

  const minX = 18;
  const maxX = window.innerWidth - offsetW - 18;
  const minY = 18;
  const maxY = window.innerHeight - offsetH - 18;

  noBtn.style.position = 'fixed';
  noBtn.style.left = `${Math.min(Math.max(x, minX), maxX)}px`;
  noBtn.style.top = `${Math.min(Math.max(y, minY), maxY)}px`;
  noBtn.style.transition = 'left 0.45s ease, top 0.45s ease';
}

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

function handleYesClick() {
  if (!mainCard || !question || !loveNote || !noBtn || !loveCard || !yesBtn) return;

  if (mainCard.classList.contains('is-celebrating')) return;

  mainCard.classList.add('is-celebrating');
  question.textContent = 'I knew it! 🥰❤️';
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
}

function bindEvents() {
  if (musicBtn) {
    musicBtn.addEventListener('click', toggleMusic);
  }

  if (noBtn) {
    noBtn.addEventListener('mouseover', moveButton);
    noBtn.addEventListener('touchstart', moveButton);
    noBtn.addEventListener('focus', moveButton);
  }

  if (yesBtn) {
    yesBtn.addEventListener('click', handleYesClick);
  }
}

function initialize() {
  initializeLoveMessage();
  bindEvents();

  for (let i = 0; i < 6; i++) {
    setTimeout(() => createFallingHeart(), i * 260);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}
