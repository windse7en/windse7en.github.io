// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Video Background Sound Toggle
    const heroVideo = document.getElementById('hero-video');
    const soundToggle = document.getElementById('sound-toggle');
    const soundIcon = soundToggle.querySelector('i');
    
    if (heroVideo && soundToggle) {
        // Set initial state
        heroVideo.muted = true;
        
        soundToggle.addEventListener('click', function() {
            // Toggle mute state
            heroVideo.muted = !heroVideo.muted;
            
            // Update icon
            if (heroVideo.muted) {
                soundIcon.className = 'fas fa-volume-mute';
            } else {
                soundIcon.className = 'fas fa-volume-up';
            }
        });
        
        // Ensure video plays on mobile devices
        document.addEventListener('touchstart', function() {
            if (heroVideo.paused) {
                heroVideo.play();
            }
        }, { once: true });
    }
    
    // Header Canvas Animation
    const canvas = document.getElementById('headerCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 70; // Increased particle count
    const colors = ['#B88D35', '#D9A84E', '#F0C16D', '#FFFFFF', '#E6C98F']; // Added more gold variations
    
    // Resize canvas to match header
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = 80; // Match header height
    }
    
    // Initialize canvas
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3.5 + 0.8; // Slightly larger particles
            this.speedX = Math.random() * 0.6 - 0.3; // Slightly faster movement
            this.speedY = Math.random() * 0.4 - 0.2;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.opacity = Math.random() * 0.7 + 0.3; // Higher opacity for better visibility
            this.blinking = Math.random() > 0.6; // 40% of particles will blink
            this.blinkSpeed = Math.random() * 0.02 + 0.005;
            this.blinkDirection = 1;
            this.pulse = Math.random() > 0.7; // Some particles will pulse in size
            this.pulseSpeed = Math.random() * 0.05 + 0.01;
            this.pulseDirection = 1;
            this.originalSize = this.size;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap around edges
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
            
            // Blinking effect for some particles
            if (this.blinking) {
                this.opacity += this.blinkSpeed * this.blinkDirection;
                
                if (this.opacity >= 0.8) {
                    this.blinkDirection = -1;
                } else if (this.opacity <= 0.3) {
                    this.blinkDirection = 1;
                }
            }
            
            // Pulsing size effect for some particles
            if (this.pulse) {
                this.size += this.pulseSpeed * this.pulseDirection;
                
                if (this.size >= this.originalSize * 1.5) {
                    this.pulseDirection = -1;
                } else if (this.size <= this.originalSize * 0.7) {
                    this.pulseDirection = 1;
                }
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            
            // Add a subtle glow effect to some particles
            if (this.size > 2) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity * 0.3;
                ctx.fill();
            }
            
            ctx.globalAlpha = 1;
        }
    }
    
    // Create particles
    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // Connect particles with lines
    function connectParticles() {
        const maxDistance = 120; // Increased connection distance
        for (let i = 0; i < particles.length; i++) {
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    const opacity = 1 - (distance / maxDistance);
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(184, 141, 53, ${opacity * 0.3})`; // Increased line opacity
                    ctx.lineWidth = 0.7; // Slightly thicker lines
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw gradient background with more transparency
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, 'rgba(5, 22, 37, 0.2)');
        gradient.addColorStop(0.5, 'rgba(11, 41, 69, 0.2)');
        gradient.addColorStop(1, 'rgba(5, 22, 37, 0.2)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add a subtle gold accent line at the bottom
        const accentGradient = ctx.createLinearGradient(0, canvas.height - 2, canvas.width, canvas.height - 2);
        accentGradient.addColorStop(0, 'rgba(184, 141, 53, 0)');
        accentGradient.addColorStop(0.5, 'rgba(184, 141, 53, 0.5)');
        accentGradient.addColorStop(1, 'rgba(184, 141, 53, 0)');
        ctx.fillStyle = accentGradient;
        ctx.fillRect(0, canvas.height - 2, canvas.width, 2);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Connect particles
        connectParticles();
        
        requestAnimationFrame(animate);
    }
    
    // Initialize and start animation
    initParticles();
    animate();
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Cascade section animation
    const cascadeSections = document.querySelectorAll('.cascade-section');
    
    // Initial check for sections in viewport
    checkSections();
    
    // Check sections on scroll
    window.addEventListener('scroll', checkSections);
    
    function checkSections() {
        cascadeSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // If section is in viewport
            if (sectionTop < windowHeight * 0.85) {
                section.classList.add('active');
            }
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation link based on scroll position
    window.addEventListener('scroll', function() {
        let current = '';
        
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Form submission
    const contactForm = document.querySelector('#contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Form will be submitted to formsubmit.co service
            // We'll just add some visual feedback here
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Store original button text and update it while submitting
            submitBtn.textContent = 'Sending...';
            
            // We're not preventing default form submission since we want the form to submit to formsubmit.co
            // This is just for visual feedback before the page redirects
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
            }, 2000);
        });
    }
    
    // Project card hover effect enhancement
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Service card hover effect enhancement
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Process Steps Interaction
    const stepCards = document.querySelectorAll('.step-card');
    const isMobile = window.innerWidth <= 768;
    
    // Function to handle step card activation
    function activateStepCard(card) {
        // Remove active class from all cards
        stepCards.forEach(c => c.classList.remove('active'));
        // Add active class to current card
        card.classList.add('active');
        
        // On mobile, scroll the card into view
        if (isMobile) {
            setTimeout(() => {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }
    
    // Set the first step as active by default
    if (stepCards.length > 0) {
        setTimeout(() => {
            activateStepCard(stepCards[0]);
        }, 1000);
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const newIsMobile = window.innerWidth <= 768;
        if (newIsMobile !== isMobile) {
            location.reload(); // Reload page on mobile/desktop transition for best layout
        }
    });
    
    // Desktop hover interaction
    if (!isMobile) {
        stepCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                activateStepCard(this);
            });
        });
    } else {
        // For mobile devices - make cards fully visible by default
        stepCards.forEach(card => {
            const content = card.querySelector('.step-content p');
            if (content) {
                content.style.opacity = '1';
                content.style.maxHeight = 'none';
            }
        });
        
        // Add touch interaction
        stepCards.forEach(card => {
            card.addEventListener('click', function() {
                const isActive = this.classList.contains('active');
                
                if (!isActive) {
                    activateStepCard(this);
                }
            });
        });
    }
}); 