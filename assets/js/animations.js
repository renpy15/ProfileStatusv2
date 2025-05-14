
function initCosmicBackground() {
    
    const nebulas = [
        { class: 'nebula-1', color: 'var(--nebula-color-1)' },
        { class: 'nebula-2', color: 'var(--nebula-color-2)' },
        { class: 'nebula-3', color: 'var(--nebula-color-3)' }
    ];

    const bgContainer = document.createElement('div');
    bgContainer.className = 'cosmic-bg';

    nebulas.forEach(nebula => {
        const nebulaEl = document.createElement('div');
        nebulaEl.className = `nebula ${nebula.class}`;
        nebulaEl.style.background = nebula.color;
        bgContainer.appendChild(nebulaEl);
    });

    document.body.prepend(bgContainer);

    
    createStars(200);

    
    createShootingStars(3);

    
    initParticleNetwork();
}

function createStars(count) {
    const starContainer = document.createElement('div');
    starContainer.className = 'star-container';

    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        const size = Math.random() > 0.8 ? 'large' :
            Math.random() > 0.5 ? 'medium' : 'small';
        star.className = `star ${size}`;

        
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;

        
        star.style.animationDelay = `${Math.random() * 5}s`;

        starContainer.appendChild(star);
    }

    document.body.appendChild(starContainer);
}

function createShootingStars(count) {
    for (let i = 0; i < count; i++) {
        const shooter = document.createElement('div');
        shooter.className = 'shooting-star';

        
        shooter.style.left = `${Math.random() * 20}%`;
        shooter.style.top = `${Math.random() * 100}%`;
        shooter.style.animationDelay = `${Math.random() * 20}s`;

        document.body.appendChild(shooter);
    }
}

function initParticleNetwork() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-network';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = Math.floor(window.innerWidth / 10);

    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5 + 0.5,
            speedX: Math.random() * 0.2 - 0.1,
            speedY: Math.random() * 0.2 - 0.1,
            color: `rgba(58, 134, 255, ${Math.random() * 0.2 + 0.05})`
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;

            
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

            
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            
            particles.forEach(p2 => {
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150) {
                    ctx.strokeStyle = `rgba(58, 134, 255, ${1 - dist / 150})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}


document.addEventListener('DOMContentLoaded', () => {
    initCosmicBackground();

    
    setTimeout(() => {
        document.querySelectorAll('.nebula').forEach(nebula => {
            nebula.style.animation = `colorShift ${60 + Math.random() * 60}s infinite`;
        });
    }, 1000);
});