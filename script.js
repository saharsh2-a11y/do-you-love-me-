const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const question = document.getElementById('question');

// Make the "NO" button run away on hover/touch
noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', moveButton);
noBtn.addEventListener('click', moveButton);
function moveButton() {
  const x = Math.floor(Math.random() * (window.innerWidth - noBtn.offsetWidth));
  const y = Math.floor(Math.random() * (window.innerHeight - noBtn.offsetHeight));
  
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

// Show success message when clicking "YES"
yesBtn.addEventListener('click', () => {
  question.innerHTML = "I Love you more gabbu 😘❤️";
  noBtn.style.display = "none";
});
