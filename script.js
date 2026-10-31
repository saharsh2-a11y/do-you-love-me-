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
