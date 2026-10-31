const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const question = document.getElementById('question');
const card = document.querySelector('.card');
const loveNote = document.getElementById('loveNote');

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', moveButton);
noBtn.addEventListener('focus', moveButton);

function moveButton() {
  const maxX = window.innerWidth - noBtn.offsetWidth - 30;
  const maxY = window.innerHeight - noBtn.offsetHeight - 30;
  const x = Math.max(20, Math.random() * maxX);
  const y = Math.max(20, Math.random() * maxY);

  noBtn.style.position = 'fixed';
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

yesBtn.addEventListener('click', () => {
  card.classList.add('is-celebrating');
  question.innerHTML = 'I knew it! 🥰❤️';
  loveNote.style.display = 'block';
  noBtn.style.display = 'none';

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
