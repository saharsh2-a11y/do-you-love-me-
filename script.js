const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const question = document.getElementById('question');
const mainCard = document.getElementById('mainCard');
const loveCard = document.getElementById('loveCard');
const loveMessage = document.getElementById('loveMessage');
const loveNote = document.getElementById('loveNote');
const musicBtn = document.getElementById('musicBtn');
const backgroundGallery = document.getElementById('backgroundGallery');

const personalLoveLetter = `You were the best unplanned thing that ever happened in my life.

I never searched for you.
I never expected you.
I never imagined that an ordinary day would introduce me to someone who would quietly change the way I looked at life.

You came into my world without a warning, without a perfect plan, and without any promises.

Yet somehow, you became one of the greatest blessings I have ever known.

You taught me that not everything beautiful needs to be planned.

Some of life's most precious moments happen.

when we stop trying to control every detail and simply allow life to surprise us.

You became my comfort on difficult days, my smile when life felt heavy, and the reminder that the universe sometimes knows exactly what we need before we do.

If someone had asked me before we met what my future would look like, I would never have described you.

And maybe that's the beauty of it. Because the best things in life rarely arrive when we're expecting them.

They appear quietly, change us gently, and leave our hearts fuller than they were before.

So if there's one thing I'll always be grateful for,

it's that life didn't follow my plans.

Because if it had, I might never have met you—the most beautiful, unexpected chapter of my story.

♡`;

const galleryImages = Array.isArray(window.galleryImages) ? window.galleryImages : [];

let audioCtx = null;
let isMusicPlaying = false;
let melodyTimer = null;
let heartsInterval = null;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function safeSetText(element, value) {
  if (element) {
    element.textContent = value;
  }
}

function initializeLoveMessage() {
  safeSetText(loveMessage, personalLoveLetter);
}

function createBackgroundGallery() {
  if (!backgroundGallery || !Array.isArray(galleryImages) || galleryImages.length === 0) return;

  backgroundGallery.innerHTML = '';

  const columns = 8;

  galleryImages.forEach((image, index) => {
    const polaroid = document.createElement('div');
    polaroid.className = 'polaroid';
    polaroid.style.backgroundImage = `url("${image}")`;
    polaroid.style.setProperty('--delay', `${index * 0.06}s`);

    const row = Math.floor(index / columns);
    const col = index % columns;
    const left = 4 + col * 11.5 + (row % 2 === 0 ? 0 : 1.2);
    const top = 6 + row * 15.5;

    polaroid.style.left = `${left}%`;
    polaroid.style.top = `${top}%`;
    polaroid.style.setProperty('--angle', `${((index % 9) - 4) * 5}deg`);
    polaroid.style.setProperty('--driftX', `${(index % 2 === 0 ? 1 : -1) * (8 + (index % 6) * 4)}px`);
    polaroid.style.setProperty('--dropY', `${18 + row * 8}px`);

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
    if (!AudioCtor) {
      musicBtn.disabled = true;
      musicBtn.textContent = '♫ N/A';
      return;
    }

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

// Keep NO beside YES on first render (and after resize). It becomes free-moving
// only after the user tries to interact with it.
function positionNoButton() {
  if (!noBtn || !yesBtn) return;

  noBtn.style.position = 'fixed';
  noBtn.style.width = 'auto';
  noBtn.style.height = 'auto';

  const yesRect = yesBtn.getBoundingClientRect();
  const noRect = noBtn.getBoundingClientRect();
  const gap = 12;
  const padding = 12;
  const width = noRect.width;
  const height = noRect.height;

  let left = yesRect.right + gap;
  if (left + width > window.innerWidth - padding) {
    left = yesRect.left - width - gap;
  }
  left = clamp(left, padding, Math.max(padding, window.innerWidth - width - padding));

  const top = clamp(
    yesRect.top + (yesRect.height - height) / 2,
    padding,
    Math.max(padding, window.innerHeight - height - padding)
  );

  noBtn.style.left = `${left}px`;
  noBtn.style.top = `${top}px`;
  noBtn.style.transition = 'left 0.45s ease, top 0.45s ease';
}

function moveButton() {
  if (!mainCard || !noBtn || !yesBtn || mainCard.classList.contains('is-celebrating')) return;

  const padding = 12;
  const rect = mainCard.getBoundingClientRect();
  const noRect = noBtn.getBoundingClientRect();
  const width = noRect.width;
  const height = noRect.height;

  // Use the visible card area as the movement region, with a viewport-safe fallback
  // for smaller screens where the card is too narrow to contain the button.
  const minX = Math.max(padding, rect.left + padding);
  const maxX = Math.min(window.innerWidth - width - padding, rect.right - width - padding);
  const minY = Math.max(padding, rect.top + padding);
  const maxY = Math.min(window.innerHeight - height - padding, rect.bottom - height - padding);
  const canFitInsideCard = maxX >= minX && maxY >= minY;
  const rangeMinX = canFitInsideCard ? minX : padding;
  const rangeMaxX = canFitInsideCard ? maxX : Math.max(padding, window.innerWidth - width - padding);
  const rangeMinY = canFitInsideCard ? minY : padding;
  const rangeMaxY = canFitInsideCard ? maxY : Math.max(padding, window.innerHeight - height - padding);

  let left = rangeMinX + Math.random() * Math.max(0, rangeMaxX - rangeMinX);
  let top = rangeMinY + Math.random() * Math.max(0, rangeMaxY - rangeMinY);

  const yesRect = yesBtn.getBoundingClientRect();
  const noRight = left + width;
  const noBottom = top + height;
  const overlapsYes =
    noRight > yesRect.left - 12 &&
    left < yesRect.right + 12 &&
    noBottom > yesRect.top - 12 &&
    top < yesRect.bottom + 12;

  if (overlapsYes) {
    const candidates = [
      { left: yesRect.left - width - 16, top },
      { left: yesRect.right + 16, top },
      { left, top: yesRect.top - height - 16 },
      { left, top: yesRect.bottom + 16 }
    ].map((point) => ({
      left: clamp(point.left, rangeMinX, rangeMaxX),
      top: clamp(point.top, rangeMinY, rangeMaxY)
    }));
    const safeCandidate = candidates.find((point) => {
      const right = point.left + width;
      const bottom = point.top + height;
      return right <= yesRect.left - 12 || point.left >= yesRect.right + 12 ||
        bottom <= yesRect.top - 12 || point.top >= yesRect.bottom + 12;
    });
    if (safeCandidate) {
      left = safeCandidate.left;
      top = safeCandidate.top;
    }
  }

  noBtn.style.left = `${left}px`;
  noBtn.style.top = `${top}px`;
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
  loveCard.classList.remove('show');
  requestAnimationFrame(() => {
    loveCard.classList.add('show');
  });

  const heartIcons = ['💖', '💗', '💕', '💞', '💘', '❤️', '💓'];

  for (let i = 0; i < 45; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart-particle');
    heart.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];

    const startX = yesBtn.getBoundingClientRect().left + yesBtn.offsetWidth / 2;
    const startY = yesBtn.getBoundingClientRect().top + yesBtn.offsetHeight / 2;

    heart.style.left = `${startX}px`;
    heart.style.top = `${startY}px`;
    heart.style.setProperty('--dx', `${(Math.random() - 0.5) * 300}px`);
    heart.style.setProperty('--dy', `${-240 - Math.random() * 220}px`);

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1700);
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

  window.addEventListener('resize', positionNoButton);
}

function initialize() {
  initializeLoveMessage();
  bindEvents();
  requestAnimationFrame(positionNoButton);

  for (let i = 0; i < 6; i++) {
    setTimeout(() => createFallingHeart(), i * 260);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}
