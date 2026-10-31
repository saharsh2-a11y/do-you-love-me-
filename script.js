const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const question = document.getElementById('question');

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', moveButton);

function moveButton() {
  const x = Math.floor(Math.random() * (window.innerWidth - noBtn.offsetWidth));
  const y = Math.floor(Math.random() * (window.innerHeight - noBtn.offsetHeight));

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

yesBtn.addEventListener('click', () => {
  question.innerHTML = 'I knew it! 🥰❤️';
  noBtn.style.display = 'none';

  const heartColors = ['💖', '💗', '💕', '💞', '💘'];
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement('div');
    heart.textContent = heartColors[Math.floor(Math.random() * heartColors.length)];
    heart.style.position = 'fixed';
    heart.style.left = `${yesBtn.getBoundingClientRect().left + 30}px`;
    heart.style.top = `${yesBtn.getBoundingClientRect().top + 10}px`;
    heart.style.fontSize = '22px';
    heart.style.pointerEvents = 'none';
    heart.style.animation = 'floatHeart 1.2s ease-out forwards';
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1200);
  }
});

const style = document.createElement('style');
style.textContent = `
@keyframes floatHeart {
  0% { transform: translate(0, 0) scale(1); opacity: 1; }
  100% { transform: translate(${(Math.random() - 0.5) * 150}px, -120px) scale(1.4); opacity: 0; }
}
`;
document.head.appendChild(style);
