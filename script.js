const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const question = document.getElementById('question');

// Switch standard position to absolute window mode smoothly on first interaction
function moveButton(e) {
  e.preventDefault();
  
  // Calculate a random spot within the browser window padding margins
  const padding = 50;
  const x = Math.floor(Math.random() * (window.innerWidth - noBtn.offsetWidth - padding * 2)) + padding;
  const y = Math.floor(Math.random() * (window.innerHeight - noBtn.offsetHeight - padding * 2)) + padding;
  
  // Switch to fixed body coordinate layout so it can travel smoothly outside the card boundaries
  noBtn.style.position = 'fixed';
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', moveButton);

// Show romantic celebration when YES is clicked
yesBtn.addEventListener('click', () => {
  question.innerHTML = "I knew it! 🥰❤️🌹";
  noBtn.style.display = "none";
  
  // Reset Yes button layout to center smoothly
  yesBtn.style.position = 'static';
  document.querySelector('.buttons').style.display = 'flex';
  document.querySelector('.buttons').style.justifyContent = 'center';
  
  // Trigger bursting hearts storm
  for (let i = 0; i < 30; i++) {
    createHeart();
  }
});

// Helper function to generate dynamic sweet floating hearts
function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart-particle');
  heart.innerHTML = Math.random() > 0.5 ? '❤️' : '🌹';
  
  // Center spawn points directly over the user's cursor / target button click point
  const rect = yesBtn.getBoundingClientRect();
  heart.style.left = `${rect.left + rect.width / 2}px`;
  heart.style.top = `${rect.top + rect.height / 2}px`;
  
  // Distribute individual flight trajectories randomly into variables passed directly to CSS vectors
  const xTransform = (Math.random() - 0.5) * 300;
  const yTransform = (Math.random() - 0.8) * 300;
  heart.style.setProperty('--x', `${xTransform}px`);
  heart.style.setProperty('--y', `${yTransform}px`);
  
  document.body.appendChild(heart);
  
  // Clear memory footprints
  setTimeout(() => {
    heart.remove();
  }, 1500);
}
