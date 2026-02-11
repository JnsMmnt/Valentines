// Get elements
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

// Yes button - navigate to page 2
yesBtn.addEventListener('click', () => {
    page1.classList.remove('active');
    page2.classList.add('active');
    
    // Add celebration effect
    createConfetti();
});

// No button - change position randomly
noBtn.addEventListener('click', () => {
    moveNoButton();
});

function moveNoButton() {
    const buttonRect = noBtn.getBoundingClientRect();
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate random position anywhere on the page
    // Leave some padding to ensure button stays visible
    const padding = 20;
    const maxX = viewportWidth - buttonRect.width - padding;
    const maxY = viewportHeight - buttonRect.height - padding;
    
    // Generate random position anywhere on the page
    const randomX = Math.random() * maxX + padding;
    const randomY = Math.random() * maxY + padding;
    
    // Apply position using fixed positioning (relative to viewport)
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    noBtn.style.zIndex = '1000';
    
    // Add a little bounce animation
    noBtn.style.transition = 'all 0.3s ease';
    
    // Optional: Add a shake effect
    noBtn.style.animation = 'shake 0.5s';
}

// Shake animation for No button
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Confetti effect for Yes button
function createConfetti() {
    const colors = ['#ff1744', '#ff6b9d', '#ff8fab', '#ffa8c5', '#ffc0d9', '#fff'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);
        
        // Animate confetti falling
        const duration = Math.random() * 2 + 2;
        const delay = Math.random() * 0.5;
        const xMovement = (Math.random() - 0.5) * 200;
        
        confetti.style.transition = `all ${duration}s ease-out ${delay}s`;
        confetti.style.transform = `translate(${xMovement}px, ${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`;
        confetti.style.opacity = '0';
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, (duration + delay) * 1000);
    }
}

// Make No button move slightly on hover (makes it harder to click)
noBtn.addEventListener('mouseenter', () => {
    // Only move if button hasn't been repositioned yet (still in original position)
    if (!noBtn.style.position || noBtn.style.position === 'static' || noBtn.style.position === 'relative') {
        const buttonRect = noBtn.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const padding = 20;
        const maxX = viewportWidth - buttonRect.width - padding;
        const maxY = viewportHeight - buttonRect.height - padding;
        
        const randomX = Math.random() * maxX + padding;
        const randomY = Math.random() * maxY + padding;
        
        noBtn.style.position = 'fixed';
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
        noBtn.style.zIndex = '1000';
        noBtn.style.transition = 'all 0.3s ease';
    }
});
