const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const question = document.getElementById('question');
const buttonsWrapper = document.querySelector('.buttons');

function moveNoButton() {
  const maxX = window.innerWidth - noBtn.offsetWidth - 24;
  const maxY = window.innerHeight - noBtn.offsetHeight - 24;
  const x = Math.max(12, Math.random() * maxX);
  const y = Math.max(12, Math.random() * maxY);

  noBtn.style.position = 'fixed';
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', moveNoButton);
noBtn.addEventListener('focus', moveNoButton);
noBtn.addEventListener('click', moveNoButton);

yesBtn.addEventListener('click', () => {
  question.textContent = 'I knew it! 🥰❤️🌹';
  noBtn.style.display = 'none';
  yesBtn.style.transform = 'scale(1.05)';
  buttonsWrapper.style.justifyContent = 'center';

  for (let i = 0; i < 30; i++) {
    createHeart();
  }
});

function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart-particle');
  heart.textContent = Math.random() > 0.5 ? '❤️' : '🌹';

  const rect = yesBtn.getBoundingClientRect();
  heart.style.left = `${rect.left + rect.width / 2}px`;
  heart.style.top = `${rect.top + rect.height / 2}px`;

  const xTransform = (Math.random() - 0.5) * 300;
  const yTransform = (Math.random() - 0.8) * 300;
  heart.style.setProperty('--x', `${xTransform}px`);
  heart.style.setProperty('--y', `${yTransform}px`);

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 1500);
}
