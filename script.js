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
            this.classList.toggle('active');
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
                if (mobileMenuBtn) {
                    mobileMenuBtn.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    if (icon && icon.classList.contains('fa-times')) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
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

    // Project Gallery Popup Functionality
    const projectGalleryPopup = document.getElementById('projectGalleryPopup');
    const closePopup = document.querySelector('.close-popup');
    const projectListItems = document.querySelectorAll('.project-list li');
    const projectMainImage = document.getElementById('projectMainImage');
    const projectTitle = document.getElementById('projectTitle');
    const projectLocation = document.getElementById('projectLocation');
    const projectDescription = document.getElementById('projectDescription');
    const projectThumbnails = document.querySelector('.project-thumbnails');
    const prevImageBtn = document.querySelector('.prev-image');
    const nextImageBtn = document.querySelector('.next-image');

    // Enhanced project data structure with categories
    const projectsData = {
        residential: {
            'redmond-a': {
                title: 'Redmond-A',
                location: '98052',
                description: 'A beautiful custom home built in Redmond\'s exclusive neighborhood.',
                images: [
                    'media/residential-projects/Redmond-A.jpg',
                    'media/residential-projects/Lot381.png',
                    'media/residential-projects/Lot382.png',
                    'media/residential-projects/Lot383.png',
                    'media/residential-projects/Lot384.png',
                    'media/residential-projects/Lot385.png',
                    'media/residential-projects/Lot386.png',
                    'media/residential-projects/Lot387.png',
                    'media/residential-projects/Lot388.png',
                    'media/residential-projects/Lot389.png',
                ],
                loaded: false
            },
            'redmond-b': {
                title: 'Redmond-B',
                location: '98052',
                description: 'Modern luxury home with premium finishes.',
                images: [
                    'media/residential-projects/Redmond-B.jpg',
                    'media/residential-projects/Lot391.png',
                    'media/residential-projects/Lot392.png',
                    'media/residential-projects/Lot393.png',
                    'media/residential-projects/Lot394.png',
                    'media/residential-projects/Lot395.png',
                    'media/residential-projects/Lot396.png',
                    'media/residential-projects/Lot397.png',
                ],
                loaded: false
            },
            'bellevue-a': {
                title: 'Bellevue-A',
                location: '98006',
                description: 'Elegant family home in Bellevue.',
                images: [
                    'media/residential-projects/Bellevue-A.JPG',
                ],
                loaded: false
            },
            'queenanne-a': {
                title: 'QueenAnne-A',
                location: '98109',
                description: 'Classic Seattle home with modern updates.',
                images: [
                    'media/residential-projects/QueenAnne-A.jpg',
                    'media/residential-projects/1925-1.png',
                    'media/residential-projects/1925-2.png',
                    'media/residential-projects/1925-3.png',
                    'media/residential-projects/1925-4.png',
                    'media/residential-projects/1925-5.png',
                    'media/residential-projects/1925-6.png',
                ],
                loaded: false
            }
        },
        commercial: {
            'twinkleland': {
                title: 'Twinkleland',
                location: '98006',
                description: '',
                images: [
                    'media/commercial-projects/twinkleland.jpg',
                    'media/commercial-projects/T-1.png',
                    'media/commercial-projects/T-2.png',
                    'media/commercial-projects/T-3.png',
                    'media/commercial-projects/T-4.png',
                    'media/commercial-projects/T-5.png',
                ],
                loaded: false
            },
        }
    };

    let currentProject = 'redmond-a';
    let currentCategory = 'residential';
    let currentImageIndex = 0;
    let imageCache = {};

    // Update project list based on category
    function updateProjectList(category) {
        const projectList = document.querySelector('.project-list ul');
        projectList.innerHTML = '';
        
        const projects = projectsData[category];
        Object.keys(projects).forEach((projectId, index) => {
            const li = document.createElement('li');
            li.setAttribute('data-project', projectId);
            li.textContent = projects[projectId].title;
            if (index === 0) li.classList.add('active');
            
            li.addEventListener('click', function() {
                const projectId = this.getAttribute('data-project');
                
                // Update active class
                document.querySelectorAll('.project-list li').forEach(li => li.classList.remove('active'));
                this.classList.add('active');
                
                // Preload images for the clicked project
                preloadProjectImages(projectId, category);
                
                // Load project
                loadProject(projectId, category);
            });
            
            projectList.appendChild(li);
        });
    }

    // Modified open project gallery function
    function openProjectGallery(projectId, category) {
        if (!category || !projectsData[category] || !projectsData[category][projectId]) {
            // Default to first residential project if invalid
            category = 'residential';
            projectId = Object.keys(projectsData[category])[0];
        }
        
        currentProject = projectId;
        currentCategory = category;
        
        // Show loading state while preparing the gallery
        projectGalleryPopup.classList.add('loading');
        projectGalleryPopup.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Update project list for the category
        updateProjectList(category);
        
        // Preload the project images
        preloadProjectImages(projectId, category);
        
        // Load project content
        loadProject(projectId, category);
        
        // Remove loading state
        setTimeout(() => {
            projectGalleryPopup.classList.remove('loading');
        }, 300);
    }

    // Modified load project function
    function loadProject(projectId, category) {
        currentProject = projectId;
        currentImageIndex = 0;
        const project = projectsData[category][projectId];
        
        // Update project info
        projectTitle.textContent = project.title;
        projectLocation.textContent = project.location;
        projectDescription.textContent = project.description;
        
        // Create a placeholder container with proper aspect ratio while loading
        const mainImageContainer = projectMainImage.parentElement;
        mainImageContainer.style.minHeight = '300px';
        
        // Load main image with enhanced lazy loading
        projectMainImage.classList.add('lazy-loading');
        projectMainImage.style.opacity = '0';
        projectMainImage.removeAttribute('src');
        projectMainImage.dataset.src = project.images[0];
        
        // If image is already cached, load it immediately
        if (imageCache[project.images[0]]) {
            projectMainImage.src = project.images[0];
            projectMainImage.classList.remove('lazy-loading');
            setTimeout(() => {
                projectMainImage.style.opacity = '1';
                mainImageContainer.style.minHeight = 'auto';
            }, 50);
        } else {
            // Create a new image object to determine the actual dimensions
            const tempImg = new Image();
            tempImg.onload = function() {
                const aspectRatio = tempImg.width / tempImg.height;
                if (aspectRatio > 1) {
                    mainImageContainer.style.minHeight = `${Math.min(window.innerHeight * 0.5, 400)}px`;
                } else {
                    mainImageContainer.style.minHeight = `${Math.min(window.innerHeight * 0.6, 500)}px`;
                }
                
                projectMainImage.src = project.images[0];
                projectMainImage.classList.remove('lazy-loading');
                
                setTimeout(() => {
                    projectMainImage.style.opacity = '1';
                    mainImageContainer.style.minHeight = 'auto';
                }, 50);
            };
            
            tempImg.src = project.images[0];
            imageCache[project.images[0]] = true;
        }
        
        // Load thumbnails
        projectThumbnails.innerHTML = '';
        project.images.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = index === 0 ? 'thumbnail active' : 'thumbnail';
            
            const img = document.createElement('img');
            img.classList.add('lazy-loading');
            img.style.opacity = '0';
            img.dataset.src = image;
            img.alt = `Project image ${index + 1}`;
            
            if (imageCache[image]) {
                img.src = image;
                img.classList.remove('lazy-loading');
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 50);
            }
            
            thumbnail.appendChild(img);
            projectThumbnails.appendChild(thumbnail);
            
            thumbnail.addEventListener('click', function() {
                setActiveImage(index);
            });
            
            if (!imageCache[image]) {
                lazyLoadObserver.observe(img);
            }
            
            if (index === 0) {
                img.onload = function() {
                    setTimeout(() => {
                        for (let i = 1; i < Math.min(3, project.images.length); i++) {
                            if (!imageCache[project.images[i]]) {
                                const preloadImg = new Image();
                                preloadImg.src = project.images[i];
                                imageCache[project.images[i]] = true;
                            }
                        }
                    }, 200);
                };
            }
        });
        
        preloadNextImages();
    }

    // Modified preload project images function
    function preloadProjectImages(projectId, category, count = 2) {
        const project = projectsData[category][projectId];
        if (project && !project.loaded) {
            for (let i = 0; i < Math.min(count, project.images.length); i++) {
                const imageSrc = project.images[i];
                if (!imageCache[imageSrc]) {
                    const preloadImg = new Image();
                    preloadImg.src = imageSrc;
                    imageCache[imageSrc] = true;
                }
            }
            project.loaded = true;
        }
    }

    // Modified preload next images function
    function preloadNextImages() {
        const project = projectsData[currentCategory][currentProject];
        const nextIndex = (currentImageIndex + 1) % project.images.length;
        const prevIndex = (currentImageIndex - 1 + project.images.length) % project.images.length;
        
        if (!imageCache[project.images[nextIndex]]) {
            const nextImg = new Image();
            nextImg.src = project.images[nextIndex];
            imageCache[project.images[nextIndex]] = true;
        }
        
        if (!imageCache[project.images[prevIndex]]) {
            const prevImg = new Image();
            prevImg.src = project.images[prevIndex];
            imageCache[project.images[prevIndex]] = true;
        }
    }

    // Update project cards click events
    projectCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const category = this.classList.contains('commercial') ? 'commercial' : 'residential';
            openProjectGallery(projectId, category);
        });
    });

    // Initialize Intersection Observer for lazy loading
    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    // Create a new image object to load in background
                    const tempImg = new Image();
                    
                    // Set up load event before setting source
                    tempImg.onload = function() {
                        // Only set the src once the image is loaded
                        img.src = img.dataset.src;
                        img.classList.remove('lazy-loading');
                        
                        // Store in cache
                        imageCache[img.dataset.src] = true;
                        
                        // Animation for smooth appearance
                        img.style.opacity = '0';
                        setTimeout(() => {
                            img.style.opacity = '1';
                        }, 50);
                    };
                    
                    // Set source to begin loading
                    tempImg.src = img.dataset.src;
                    
                    // Stop observing this element
                    observer.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '200px', // Increased margin to load earlier
        threshold: 0.1
    });

    // Close project gallery popup
    closePopup.addEventListener('click', function() {
        projectGalleryPopup.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });

    // Close popup on click outside content
    projectGalleryPopup.addEventListener('click', function(e) {
        if (e.target === this) {
            projectGalleryPopup.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (projectGalleryPopup.style.display === 'block') {
            if (e.key === 'Escape') {
                projectGalleryPopup.style.display = 'none';
                document.body.style.overflow = 'auto';
            } else if (e.key === 'ArrowLeft') {
                navigateImage(-1);
            } else if (e.key === 'ArrowRight') {
                navigateImage(1);
            }
        }
    });

    // Pre-initialize the gallery data to avoid empty state
    function initializeGallery() {
        // Preload first project images (just the main image initially)
        preloadProjectImages('redmond-a', 'residential', 1);
        
        // Add data-project attributes to project cards that are missing them
        projectCards.forEach((card, index) => {
            if (!card.getAttribute('data-project')) {
                // Get the project ID from the corresponding position in the list
                const projectIds = Object.keys(projectsData.residential);
                if (index < projectIds.length) {
                    card.setAttribute('data-project', projectIds[index]);
                }
            }
        });
    }

    // Navigate between images
    function navigateImage(direction) {
        const project = projectsData[currentCategory][currentProject];
        const newIndex = (currentImageIndex + direction + project.images.length) % project.images.length;
        setActiveImage(newIndex);
        
        // Preload the next few images after navigation
        setTimeout(preloadNextImages, 100);
    }

    // Set active image
    function setActiveImage(index) {
        currentImageIndex = index;
        const project = projectsData[currentCategory][currentProject];
        
        // Get main image container for proper sizing during loading
        const mainImageContainer = projectMainImage.parentElement;
        mainImageContainer.style.minHeight = '300px'; // Default minimum height
        
        // Update main image with enhanced lazy loading
        projectMainImage.classList.add('lazy-loading');
        projectMainImage.style.opacity = '0';
        
        // If image is already cached, load it immediately
        if (imageCache[project.images[index]]) {
            projectMainImage.src = project.images[index];
            projectMainImage.classList.remove('lazy-loading');
            setTimeout(() => {
                projectMainImage.style.opacity = '1';
                // Reset container min-height once image is loaded
                mainImageContainer.style.minHeight = 'auto';
            }, 50);
        } else {
            // Create a new image object to determine the actual dimensions
            const tempImg = new Image();
            tempImg.onload = function() {
                // Calculate aspect ratio and set placeholder dimensions accordingly
                const aspectRatio = tempImg.width / tempImg.height;
                if (aspectRatio > 1) {
                    // Landscape image
                    mainImageContainer.style.minHeight = `${Math.min(window.innerHeight * 0.5, 400)}px`;
                } else {
                    // Portrait or square image
                    mainImageContainer.style.minHeight = `${Math.min(window.innerHeight * 0.6, 500)}px`;
                }
                
                // Load the actual image
                projectMainImage.src = project.images[index];
                projectMainImage.classList.remove('lazy-loading');
                
                setTimeout(() => {
                    projectMainImage.style.opacity = '1';
                    // Reset container min-height once image is loaded
                    mainImageContainer.style.minHeight = 'auto';
                }, 50);
            };
            
            tempImg.src = project.images[index];
            imageCache[project.images[index]] = true;
        }
        
        // Update thumbnail active class
        const thumbnails = projectThumbnails.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, i) => {
            if (i === index) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    // Load images when they're visible (outside the popup)
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            if (!imageCache[img.dataset.src]) {
                lazyLoadObserver.observe(img);
            }
        });
    }

    // Initialize everything
    initializeGallery();
    initLazyLoading();
}); 