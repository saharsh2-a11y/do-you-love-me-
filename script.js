const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const question = document.getElementById('question');
const mainCard = document.getElementById('mainCard');
const loveCard = document.getElementById('loveCard');
const loveMessage = document.getElementById('loveMessage');
const loveNote = document.getElementById('loveNote');
const musicBtn = document.getElementById('musicBtn');
const backgroundGallery = document.getElementById('backgroundGallery');
const buttonsRow = document.querySelector('.buttons');

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

Because if it had, I might never have met you the most beautiful, unexpected chapter of my story.

♡`;

const galleryImages = Array.isArray(window.galleryImages) ? window.galleryImages : [];

let audioCtx = null;
let isMusicPlaying = false;
let melodyTimer = null;
let heartsInterval = null;
let noButtonHasMoved = false;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function safeSetText(element, value) {
  if (element) element.textContent = value;
}

function initializeLoveMessage() {
  safeSetText(loveMessage, personalLoveLetter);
}

// Keep YES and NO together in the normal layout on every screen size.
function setupButtonLayout() {
  if (buttonsRow) {
    buttonsRow.style.display = 'flex';
    buttonsRow.style.flexDirection = 'row';
    buttonsRow.style.flexWrap = 'nowrap';
    buttonsRow.style.justifyContent = 'center';
    buttonsRow.style.alignItems = 'center';
    buttonsRow.style.gap = 'clamp(8px, 3vw, 20px)';
    buttonsRow.style.minHeight = '52px';
  }

  [yesBtn, noBtn].forEach((button) => {
    if (!button) return;
    button.style.flex = '0 1 auto';
    button.style.width = 'auto';
    button.style.minWidth = '0';
    button.style.paddingInline = 'clamp(16px, 5vw, 30px)';
    button.style.whiteSpace = 'nowrap';
  });

  if (noBtn && !noButtonHasMoved) {
    noBtn.style.position = 'relative';
    noBtn.style.left = 'auto';
    noBtn.style.top = 'auto';
    noBtn.style.width = 'auto';
    noBtn.style.height = 'auto';
  }
}

function createBackgroundGallery() {
  if (!backgroundGallery || galleryImages.length === 0) return;

  backgroundGallery.innerHTML = '';
  const columns = 8;

  galleryImages.forEach((image, index) => {
    const polaroid = document.createElement('div');
    polaroid.className = 'polaroid';
    polaroid.style.backgroundImage = `url("${image}")`;
    polaroid.style.setProperty('--delay', `${index * 0.06}s`);

    const row = Math.floor(index / columns);
    const col = index % columns;
    polaroid.style.left = `${4 + col * 11.5 + (row % 2 === 0 ? 0 : 1.2)}%`;
    polaroid.style.top = `${6 + row * 15.5}%`;
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
  heartsInterval = setInterval(createFallingPhoto, 550);
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
    if (audioCtx.state === 'suspended') audioCtx.resume();
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

// On initial render and resize, restore the normal-flow side-by-side layout.
function positionNoButton() {
  if (!noBtn || noButtonHasMoved) return;
  setupButtonLayout();
}

function moveButton() {
  if (!mainCard || !noBtn || !yesBtn || mainCard.classList.contains('is-celebrating')) return;

  const padding = 12;
  const cardRect = mainCard.getBoundingClientRect();
  const yesRect = yesBtn.getBoundingClientRect();
  const buttonRect = noBtn.getBoundingClientRect();
  const width = buttonRect.width;
  const height = buttonRect.height;

  const minX = Math.max(padding, cardRect.left + padding);
  const maxX = Math.min(window.innerWidth - width - padding, cardRect.right - width - padding);
  const minY = Math.max(padding, cardRect.top + padding);
  const maxY = Math.min(window.innerHeight - height - padding, cardRect.bottom - height - padding);
  if (maxX < minX || maxY < minY) return;

  let left = minX + Math.random() * (maxX - minX);
  let top = minY + Math.random() * (maxY - minY);
  const gap = 12;

  // Try several card-contained positions so NO avoids YES when there is room.
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const overlapsYes =
      left + width > yesRect.left - gap && left < yesRect.right + gap &&
      top + height > yesRect.top - gap && top < yesRect.bottom + gap;
    if (!overlapsYes) break;
    left = minX + Math.random() * (maxX - minX);
    top = minY + Math.random() * (maxY - minY);
  }

  noButtonHasMoved = true;
  noBtn.style.position = 'fixed';
  noBtn.style.width = `${width}px`;
  noBtn.style.height = `${height}px`;
  noBtn.style.left = `${clamp(left, minX, maxX)}px`;
  noBtn.style.top = `${clamp(top, minY, maxY)}px`;
  noBtn.style.transition = 'left 0.35s ease, top 0.35s ease';
}

function createFallingPhoto() {
  if (galleryImages.length === 0) return;
  const photo = document.createElement('img');
  photo.className = 'falling-photo';
  photo.src = galleryImages[Math.floor(Math.random() * galleryImages.length)];
  photo.alt = '';
  photo.setAttribute('aria-hidden', 'true');
  photo.style.left = `${Math.random() * 100}vw`;
  photo.style.top = '-12vh';
  photo.style.width = `${Math.random() * 58 + 46}px`;
  photo.style.height = `${Math.random() * 74 + 56}px`;
  photo.style.setProperty('--drift', `${(Math.random() - 0.5) * 220}px`);
  photo.style.animationDelay = `${Math.random() * 4}s`;
  document.body.appendChild(photo);
  setTimeout(() => photo.remove(), 8500);
}

// Burst gallery photo thumbnails from the YES button when the answer is accepted.
function createCelebrationPhoto(startX, startY) {
  if (galleryImages.length === 0) return;

  const photo = document.createElement('img');
  photo.className = 'celebration-photo';
  photo.src = galleryImages[Math.floor(Math.random() * galleryImages.length)];
  photo.alt = '';
  photo.setAttribute('aria-hidden', 'true');
  photo.style.left = `${startX}px`;
  photo.style.top = `${startY}px`;
  photo.style.setProperty('--dx', `${(Math.random() - 0.5) * 260}px`);
  photo.style.setProperty('--dy', `${-100 - Math.random() * 190}px`);
  photo.style.setProperty('--rotation', `${(Math.random() - 0.5) * 50}deg`);
  document.body.appendChild(photo);
  setTimeout(() => photo.remove(), 1800);
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
  requestAnimationFrame(() => loveCard.classList.add('show'));

  const yesRect = yesBtn.getBoundingClientRect();
  const startX = yesRect.left + yesRect.width / 2;
  const startY = yesRect.top + yesRect.height / 2;
  for (let i = 0; i < 30; i += 1) {
    createCelebrationPhoto(startX, startY);
  }
}

function bindEvents() {
  if (musicBtn) musicBtn.addEventListener('click', toggleMusic);
  if (noBtn) {
    noBtn.addEventListener('mouseover', moveButton);
    noBtn.addEventListener('touchstart', moveButton, { passive: true });
    noBtn.addEventListener('focus', moveButton);
  }
  if (yesBtn) yesBtn.addEventListener('click', handleYesClick);
  window.addEventListener('resize', positionNoButton);
}

function initialize() {
  initializeLoveMessage();
  setupButtonLayout();
  bindEvents();
  requestAnimationFrame(positionNoButton);

  for (let i = 0; i < 6; i++) {
    setTimeout(createFallingHeart, i * 260);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}
