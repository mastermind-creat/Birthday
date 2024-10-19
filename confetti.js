// Confetti Animation
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createParticles(x, y) {
    const particleCount = 100;
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: x,
            y: y,
            radius: Math.random() * 5 + 2,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            speed: Math.random() * 5 + 2,
            direction: Math.random() * 2 * Math.PI,
            gravity: Math.random() * 0.1 + 0.05
        });
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, index) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        particle.x += Math.cos(particle.direction) * particle.speed;
        particle.y += Math.sin(particle.direction) * particle.speed + particle.gravity;

        if (particle.y > canvas.height) {
            particles.splice(index, 1);
        }
    });
}

function animate() {
    drawParticles();
    requestAnimationFrame(animate);
}

window.addEventListener('load', () => {
    // Start confetti animation on page load
    createParticles(canvas.width / 2, canvas.height / 2);
    animate();
});

// Create confetti on countdown completion
function createConfettiOnCountdownComplete() {
    const distance = new Date("Oct 21, 2024 00:00:00").getTime() - new Date().getTime();
    if (distance < 0) {
        createParticles(canvas.width / 2, canvas.height / 2);
    }
}

// Check countdown to trigger confetti
setInterval(createConfettiOnCountdownComplete, 1000);