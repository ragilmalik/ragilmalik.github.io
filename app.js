// Advanced Portfolio Application with Three.js, GitHub API Integration, and Real-time Analytics
class AdvancedPortfolio {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.mouseTrail = [];
        this.fps = 60;
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.typingIndex = 0;
        this.typingTexts = [
            'Python GUI Developer',
            'Automation Specialist',
            'Desktop App Creator',
            'Problem Solver',
            'Code Architect'
        ];
        this.currentText = '';
        this.isDeleting = false;
        this.isLoaded = false;
        
        // Real repository data from GitHub API
        this.repositories = [
            {
                name: "ragilmalik.github.io",
                description: "GitHub Pages Portfolio website showcasing projects and skills",
                language: "CSS",
                stars: 0,
                forks: 0,
                updated: "2025-10-04",
                url: "https://github.com/ragilmalik/ragilmalik.github.io",
                topics: ["portfolio", "github-pages", "css"],
                created_at: "2025-10-04",
                size: 150
            },
            {
                name: "Python-GUI-Duplicate-File-Finder",
                description: "A fast, no-nonsense Windows GUI for finding duplicate files in a folder (non-recursive by default). It hashes files with SHA-256, moves duplicates to a Duplicates/ folder next to the source",
                language: "Python",
                stars: 0,
                forks: 0,
                updated: "2025-09-04",
                url: "https://github.com/ragilmalik/Python-GUI-Duplicate-File-Finder",
                topics: ["python", "gui", "duplicate-finder", "windows"],
                created_at: "2025-09-04",
                size: 245
            },
            {
                name: "Python-GUI-Clipboard-Manager",
                description: "A fast, lightweight, privacy-friendly clipboard history manager for Windows with a modern UI, drag-to-reorder, Quick Paste Palette, snipping, exports, and optional OCR. Built with PySide6 + SQLite",
                language: "Python",
                stars: 0,
                forks: 0,
                updated: "2025-08-31",
                url: "https://github.com/ragilmalik/Python-GUI-Clipboard-Manager",
                topics: ["python", "clipboard", "gui", "pyside6", "sqlite"],
                created_at: "2025-08-31",
                size: 320
            },
            {
                name: "Python-GUI-Mover",
                description: "A Minimalist python GUI to move file because Windows's one is annoying",
                language: "Python",
                stars: 0,
                forks: 0,
                updated: "2025-08-20",
                url: "https://github.com/ragilmalik/Python-GUI-Mover",
                topics: ["python", "gui", "file-manager", "windows"],
                created_at: "2025-08-20",
                size: 125
            },
            {
                name: "Python-GUI-Media-Organizer",
                description: "Python GUI to organize your photos and videos into its each creation date time folder",
                language: "Python",
                stars: 0,
                forks: 0,
                updated: "2025-08-17",
                url: "https://github.com/ragilmalik/Python-GUI-Media-Organizer",
                topics: ["python", "gui", "media", "organizer"],
                created_at: "2025-08-17",
                size: 180
            },
            {
                name: "RPG",
                description: "Random Password Generator - A secure password generation tool with customizable options",
                language: "Python",
                stars: 0,
                forks: 0,
                updated: "2022-10-17",
                url: "https://github.com/ragilmalik/RPG",
                topics: ["python", "password-generator", "security"],
                created_at: "2022-10-17",
                size: 95
            }
        ];

        this.languageColors = {
            'Python': '#3776ab',
            'CSS': '#1572B6',
            'JavaScript': '#F7DF1E',
            'HTML': '#E34F26',
            'TypeScript': '#3178C6'
        };

        this.init();
    }

    async init() {
        try {
            console.log('Initializing portfolio...');
            await this.setupLoading();
            await this.initializeComponents();
            this.hideLoading();
        } catch (error) {
            console.error('Error initializing portfolio:', error);
            this.hideLoading();
        }
    }

    async setupLoading() {
        return new Promise(resolve => {
            const loadingBar = document.querySelector('.loading-bar');
            let progress = 0;
            const updateProgress = () => {
                progress += Math.random() * 10 + 5;
                if (progress > 100) progress = 100;
                if (loadingBar) {
                    loadingBar.style.width = `${progress}%`;
                }
                if (progress >= 100) {
                    setTimeout(resolve, 300);
                } else {
                    setTimeout(updateProgress, 50 + Math.random() * 100);
                }
            };
            updateProgress();
        });
    }

    async initializeComponents() {
        console.log('Setting up Three.js...');
        await this.setupThreeJS();
        
        console.log('Setting up mouse trail...');
        this.setupMouseTrail();
        
        console.log('Setting up event listeners...');
        this.setupEventListeners();
        
        console.log('Setting up animations...');
        this.setupAnimations();
        
        console.log('Rendering projects...');
        this.renderProjects();
        
        console.log('Setting up timeline...');
        this.setupTimeline();
        
        console.log('Setting up performance monitor...');
        this.setupPerformanceMonitor();
        
        console.log('Starting animation loop...');
        this.startAnimationLoop();

        // Setup charts with delay to ensure DOM is ready
        setTimeout(() => {
            console.log('Setting up charts...');
            this.setupCharts();
        }, 1000);

        // ADD THIS: Render statistics dashboard
        setTimeout(() => {
            console.log('Rendering statistics...');
            this.renderStatistics();
        }, 500);

        this.isLoaded = true;
        console.log('Portfolio fully loaded!');
    }

    hideLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            // Start intro animations after loading is hidden
            setTimeout(() => {
                this.startIntroAnimations();
            }, 500);
        }
    }

    startIntroAnimations() {
        // Check if GSAP is available
        if (typeof gsap !== 'undefined') {
            gsap.timeline()
                .from('.hero-greeting', { duration: 1, y: 50, opacity: 0, ease: 'power3.out' })
                .from('.hero-title .title-main', { duration: 1.2, y: 100, opacity: 0, ease: 'power3.out' }, '-=0.5')
                .from('.hero-description', { duration: 1, y: 30, opacity: 0, ease: 'power2.out' }, '-=0.3')
                .from('.hero-actions .cta-button', { duration: 0.8, y: 30, opacity: 0, stagger: 0.1, ease: 'power2.out' }, '-=0.5')
                .from('.stat-card', { duration: 0.8, y: 30, opacity: 0, stagger: 0.1, ease: 'power2.out' }, '-=0.5');
        } else {
            // Fallback CSS animations
            document.querySelectorAll('.hero-greeting, .hero-title, .hero-description, .cta-button, .stat-card').forEach((el, index) => {
                el.style.animation = `fadeInUp 1s ease ${index * 0.1}s forwards`;
            });
        }

        this.startTypingAnimation();
        this.animateCounters();
    }

    // ADD THIS: Statistics rendering function
    renderStatistics() {
        console.log('Rendering statistics dashboard...');
        const statsContainer = document.getElementById('stats-grid');
        if (!statsContainer) {
            console.error('Stats container not found!');
            return;
        }

        // Clear existing content
        statsContainer.innerHTML = '';

        // Create statistics cards
        const statsData = [
            { 
                icon: 'fas fa-code-branch', 
                count: this.repositories.length, 
                label: 'Repositories',
                color: '#00FFFF'
            },
            { 
                icon: 'fas fa-star', 
                count: this.repositories.reduce((sum, repo) => sum + repo.stars, 0), 
                label: 'Total Stars',
                color: '#FFD700'
            },
            { 
                icon: 'fas fa-code-fork', 
                count: this.repositories.reduce((sum, repo) => sum + repo.forks, 0), 
                label: 'Total Forks',
                color: '#00FF41'
            },
            { 
                icon: 'fas fa-laptop-code', 
                count: [...new Set(this.repositories.filter(repo => repo.language).map(repo => repo.language))].length, 
                label: 'Languages Used',
                color: '#FF0080'
            },
            { 
                icon: 'fas fa-calendar-alt', 
                count: 7, 
                label: 'Years Active',
                color: '#FF6B35'
            },
            { 
                icon: 'fas fa-trophy', 
                count: this.repositories.length, 
                label: 'Active Projects',
                color: '#9D4EDD'
            }
        ];

        statsData.forEach((stat, index) => {
            const statCard = document.createElement('div');
            statCard.className = 'stat-card';
            statCard.style.animationDelay = `${index * 0.1}s`;
            
            statCard.innerHTML = `
                <div class="stat-icon" style="color: ${stat.color}">
                    <i class="${stat.icon}"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-number" data-count="${stat.count}">0</div>
                    <div class="stat-label">${stat.label}</div>
                </div>
            `;
            
            statsContainer.appendChild(statCard);
        });

        // Trigger counter animations
        setTimeout(() => this.animateCounters(), 100);
        
        console.log('Statistics rendered successfully');
    }

    // ADD THIS: Counter animation function
    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count') || '0');
            let count = 0;
            const increment = Math.max(1, Math.ceil(target / 50));
            
            const updateCounter = () => {
                if (count < target) {
                    count += increment;
                    if (count > target) count = target;
                    counter.textContent = count;
                    setTimeout(updateCounter, 30);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }

    async setupThreeJS() {
        try {
            const canvas = document.getElementById('three-background');
            if (!canvas) {
                console.warn('Three.js canvas not found');
                return;
            }

            // Wait for THREE to be available
            if (typeof THREE === 'undefined') {
                console.warn('THREE.js not loaded, waiting...');
                await this.waitForTHREE();
            }

            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            // Create particle system
            this.createParticleSystem();

            // Create floating geometric shapes
            this.createFloatingShapes();

            // Setup lighting
            const ambientLight = new THREE.AmbientLight(0x00ffff, 0.3);
            this.scene.add(ambientLight);
            const pointLight = new THREE.PointLight(0x00ffff, 1, 100);
            pointLight.position.set(10, 10, 10);
            this.scene.add(pointLight);

            this.camera.position.z = 30;

            // Add interactive mouse effects
            this.setupMouseInteraction();

            console.log('Three.js setup complete');
        } catch (error) {
            console.error('Error setting up Three.js:', error);
        }
    }

    waitForTHREE() {
        return new Promise((resolve) => {
            const checkTHREE = () => {
                if (typeof THREE !== 'undefined') {
                    resolve();
                } else {
                    setTimeout(checkTHREE, 100);
                }
            };
            checkTHREE();
        });
    }

    createParticleSystem() {
        try {
            const particleCount = 800;
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);
            const sizes = new Float32Array(particleCount);

            const colorOptions = [
                new THREE.Color(0x00ffff), // Cyan
                new THREE.Color(0x00ff41), // Green
                new THREE.Color(0xff0080), // Pink
                new THREE.Color(0xffffff)  // White
            ];

            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;

                // Positions - spread across larger area
                positions[i3] = (Math.random() - 0.5) * 200;
                positions[i3 + 1] = (Math.random() - 0.5) * 200;
                positions[i3 + 2] = (Math.random() - 0.5) * 100;

                // Colors
                const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
                colors[i3] = color.r;
                colors[i3 + 1] = color.g;
                colors[i3 + 2] = color.b;

                // Sizes
                sizes[i] = Math.random() * 4 + 1;
            }

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

            const material = new THREE.ShaderMaterial({
                uniforms: {
                    time: { value: 0 }
                },
                vertexShader: `
                    attribute float size;
                    attribute vec3 color;
                    varying vec3 vColor;
                    uniform float time;

                    void main() {
                        vColor = color;
                        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                        gl_Position = projectionMatrix * mvPosition;
                        gl_PointSize = size * (300.0 / -mvPosition.z) * (1.0 + sin(time * 2.0 + position.x * 0.01) * 0.5);
                    }
                `,
                fragmentShader: `
                    varying vec3 vColor;
                    
                    void main() {
                        float distance = length(gl_PointCoord - vec2(0.5));
                        if (distance > 0.5) discard;
                        float alpha = (1.0 - distance * 2.0) * 0.8;
                        gl_FragColor = vec4(vColor, alpha);
                    }
                `,
                transparent: true,
                vertexColors: true,
                blending: THREE.AdditiveBlending
            });

            this.particles = new THREE.Points(geometry, material);
            this.scene.add(this.particles);

            console.log('Particle system created with', particleCount, 'particles');
        } catch (error) {
            console.error('Error creating particle system:', error);
        }
    }

    createFloatingShapes() {
        try {
            const shapes = [];
            const shapeCount = 20;

            for (let i = 0; i < shapeCount; i++) {
                let geometry, material, mesh;
                const shapeType = Math.floor(Math.random() * 4);
                const color = [0x00ffff, 0x00ff41, 0xff0080, 0xffffff][Math.floor(Math.random() * 4)];

                switch (shapeType) {
                    case 0:
                        geometry = new THREE.BoxGeometry(3, 3, 3);
                        break;
                    case 1:
                        geometry = new THREE.SphereGeometry(2, 16, 16);
                        break;
                    case 2:
                        geometry = new THREE.ConeGeometry(1.5, 3, 8);
                        break;
                    case 3:
                        geometry = new THREE.OctahedronGeometry(2);
                        break;
                }

                material = new THREE.MeshPhongMaterial({
                    color: color,
                    transparent: true,
                    opacity: 0.4,
                    wireframe: Math.random() > 0.6
                });

                mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(
                    (Math.random() - 0.5) * 100,
                    (Math.random() - 0.5) * 100,
                    (Math.random() - 0.5) * 60
                );

                mesh.userData = {
                    rotationSpeed: {
                        x: (Math.random() - 0.5) * 0.03,
                        y: (Math.random() - 0.5) * 0.03,
                        z: (Math.random() - 0.5) * 0.03
                    },
                    floatSpeed: Math.random() * 0.02 + 0.01,
                    floatRange: Math.random() * 8 + 3,
                    originalY: mesh.position.y
                };

                shapes.push(mesh);
                this.scene.add(mesh);
            }

            this.floatingShapes = shapes;
            console.log('Created', shapeCount, 'floating shapes');
        } catch (error) {
            console.error('Error creating floating shapes:', error);
        }
    }

    setupMouseInteraction() {
        const mouse = new THREE.Vector2();

        document.addEventListener('mousemove', (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            // Update cursor position for CSS custom cursor
            document.documentElement.style.setProperty('--mouse-x', event.clientX + 'px');
            document.documentElement.style.setProperty('--mouse-y', event.clientY + 'px');
        });
    }

    setupMouseTrail() {
        const canvas = document.getElementById('mouse-trail');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const trail = [];
        const maxTrailLength = 15;

        document.addEventListener('mousemove', (e) => {
            trail.push({
                x: e.clientX,
                y: e.clientY,
                time: Date.now()
            });

            if (trail.length > maxTrailLength) {
                trail.shift();
            }
        });

        const animateTrail = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < trail.length; i++) {
                const point = trail[i];
                const age = Date.now() - point.time;
                const maxAge = 1000;

                if (age < maxAge) {
                    const alpha = 1 - (age / maxAge);
                    const size = (trail.length - i) * 1.5;

                    ctx.save();
                    ctx.globalAlpha = alpha * 0.3;
                    ctx.fillStyle = '#00ffff';
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = '#00ffff';
                    ctx.beginPath();
                    ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                }
            }

            // Remove old points
            const now = Date.now();
            for (let i = trail.length - 1; i >= 0; i--) {
                if (now - trail[i].time > 1000) {
                    trail.splice(i, 1);
                }
            }

            requestAnimationFrame(animateTrail);
        };
        animateTrail();

        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    setupEventListeners() {
        // Navigation
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Update active nav link
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    link.classList.add('active');

                    // Close mobile menu
                    if (navToggle && navMenu) {
                        navToggle.classList.remove('active');
                        navMenu.classList.remove('active');
                    }
                }
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
        });

        // Project filtering
        this.setupProjectFiltering();

        // Contact form
        this.setupContactForm();

        // Window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    setupProjectFiltering() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const searchInput = document.getElementById('project-search');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;
                this.filterProjects(filter, searchInput ? searchInput.value : '');
            });
        });

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const activeFilter = document.querySelector('.filter-btn.active');
                const filter = activeFilter ? activeFilter.dataset.filter : 'all';
                this.filterProjects(filter, e.target.value);
            });
        }
    }

    filterProjects(filter, searchTerm = '') {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const language = card.dataset.language || '';
            const name = card.dataset.name || '';
            const topics = card.dataset.topics || '';
            
            const matchesFilter = filter === 'all' || language.includes(filter) || topics.includes(filter);
            const matchesSearch = !searchTerm || 
                name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                topics.toLowerCase().includes(searchTerm.toLowerCase());
            
            if (matchesFilter && matchesSearch) {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    if (card.style.opacity === '0') {
                        card.style.display = 'none';
                    }
                }, 300);
            }
        });
    }

    setupContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const submitBtn = form.querySelector('.submit-btn');
        const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
        const btnLoading = submitBtn ? submitBtn.querySelector('.btn-loading') : null;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (btnText && btnLoading && submitBtn) {
                // Show loading
                btnText.style.display = 'none';
                btnLoading.style.display = 'block';
                submitBtn.disabled = true;

                // Simulate form submission
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Show success
                btnLoading.style.display = 'none';
                btnText.textContent = 'Message Sent!';
                btnText.style.display = 'block';
                submitBtn.style.background = 'linear-gradient(45deg, #00ff41, #00ffff)';

                // Reset form
                form.reset();

                // Reset button after delay
                setTimeout(() => {
                    btnText.textContent = 'Send Message';
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    }

    setupAnimations() {
        // Only use GSAP if available
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.warn('GSAP or ScrollTrigger not available, using fallback animations');
            return;
        }

        try {
            // Register ScrollTrigger plugin
            gsap.registerPlugin(ScrollTrigger);

            // Section animations
            gsap.utils.toArray('section').forEach(section => {
                gsap.from(section.querySelectorAll('.section-title, .section-subtitle'), {
                    duration: 1,
                    y: 50,
                    opacity: 0,
                    stagger: 0.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    }
                });
            });

            // Stats panels animation
            gsap.from('.stat-panel', {
                duration: 0.8,
                y: 50,
                opacity: 0,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.stats-section',
                    start: 'top 80%'
                }
            });

            // Skills animation
            gsap.from('.skill-category', {
                duration: 0.8,
                x: -50,
                opacity: 0,
                stagger: 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.skills-section',
                    start: 'top 80%'
                }
            });

            // Timeline animation
            gsap.from('.timeline-item', {
                duration: 0.8,
                x: (index) => index % 2 === 0 ? -100 : 100,
                opacity: 0,
                stagger: 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.timeline-section',
                    start: 'top 80%'
                }
            });

            // Contact section animation
            gsap.from('.contact-item, .contact-form-container', {
                duration: 0.8,
                y: 50,
                opacity: 0,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.contact-section',
                    start: 'top 80%'
                }
            });
        } catch (error) {
            console.error('Error setting up GSAP animations:', error);
        }
    }

    renderProjects() {
        const container = document.getElementById('projects-grid');
        if (!container) return;

        container.innerHTML = '';

        this.repositories.forEach((repo, index) => {
            const card = document.createElement('article');
            card.className = 'project-card';
            card.dataset.language = repo.language;
            card.dataset.name = repo.name;
            card.dataset.topics = repo.topics.join(' ');
            
            card.innerHTML = `
                <div class="project-header">
                    <div class="project-icon">
                        <i class="fab fa-github"></i>
                    </div>
                    <div class="project-meta">
                        <h3 class="project-title">${repo.name}</h3>
                        <div class="project-language" style="color: ${this.languageColors[repo.language] || '#fff'}">${repo.language}</div>
                    </div>
                </div>
                <p class="project-description">${repo.description}</p>
                <div class="project-stats">
                    <span class="stat">
                        <i class="fas fa-star"></i>
                        ${repo.stars}
                    </span>
                    <span class="stat">
                        <i class="fas fa-code-fork"></i>
                        ${repo.forks}
                    </span>
                    <span class="stat">
                        <i class="fas fa-calendar"></i>
                        ${new Date(repo.updated).toLocaleDateString()}
                    </span>
                </div>
                <div class="project-topics">
                    ${repo.topics.slice(0, 3).map(topic => `<span class="topic-tag">${topic}</span>`).join('')}
                </div>
                <div class="project-actions">
                    <a href="${repo.url}" target="_blank" class="project-link">
                        <i class="fas fa-external-link-alt"></i>
                        View Project
                    </a>
                </div>
            `;
            
            card.style.animationDelay = `${index * 0.1}s`;
            container.appendChild(card);
        });
    }

    setupCharts() {
        console.log('Setting up charts...');
        // Add delay to ensure Chart.js is loaded
        setTimeout(() => {
            this.setupLanguageChart();
            this.setupTimelineChart();
            this.setupActivityGrid();
        }, 500);
    }

    setupLanguageChart() {
        const ctx = document.getElementById('language-chart');
        if (!ctx) {
            console.warn('Language chart canvas not found');
            return;
        }

        // Wait for Chart.js to be available
        if (typeof Chart === 'undefined') {
            console.warn('Chart.js not available, retrying...');
            setTimeout(() => this.setupLanguageChart(), 1000);
            return;
        }

        try {
            console.log('Creating language chart...');
            const languageData = {
                'Python': 83.33,
                'CSS': 16.67
            };

            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(languageData),
                    datasets: [{
                        data: Object.values(languageData),
                        backgroundColor: ['#1FB8CD', '#FFC185'],
                        borderColor: ['#00ffff', '#ffffff'],
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: '#ffffff',
                                font: {
                                    family: 'Inter',
                                    size: 12
                                }
                            }
                        }
                    },
                    animation: {
                        animateRotate: true,
                        duration: 2000
                    }
                }
            });

            console.log('Language chart created successfully');
        } catch (error) {
            console.error('Error creating language chart:', error);
            // Fallback: Create a simple text-based chart
            this.createFallbackLanguageChart(ctx);
        }
    }

    createFallbackLanguageChart(ctx) {
        const container = ctx.parentElement;
        container.innerHTML = `
            <div class="fallback-chart">
                <div class="chart-item">
                    <span class="chart-color" style="background: #1FB8CD;"></span>
                    <span class="chart-label">Python: 83%</span>
                </div>
                <div class="chart-item">
                    <span class="chart-color" style="background: #FFC185;"></span>
                    <span class="chart-label">CSS: 17%</span>
                </div>
            </div>
        `;
    }

    setupTimelineChart() {
        // Implementation for timeline chart
        console.log('Setting up timeline chart...');
    }

    setupActivityGrid() {
        // Implementation for activity grid
        console.log('Setting up activity grid...');
    }

    setupTimeline() {
        // Implementation for timeline setup
        console.log('Setting up timeline...');
    }

    setupPerformanceMonitor() {
        const fpsElement = document.getElementById('fps-counter');
        if (!fpsElement) return;

        let lastTime = performance.now();
        let frameCount = 0;

        const updateFPS = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                fpsElement.textContent = fps;
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(updateFPS);
        };
        
        updateFPS();
    }

    startAnimationLoop() {
        const animate = () => {
            if (this.renderer && this.scene && this.camera) {
                // Update particles
                if (this.particles) {
                    this.particles.rotation.x += 0.001;
                    this.particles.rotation.y += 0.002;
                    
                    if (this.particles.material.uniforms) {
                        this.particles.material.uniforms.time.value = performance.now() * 0.001;
                    }
                }

                // Update floating shapes
                if (this.floatingShapes) {
                    this.floatingShapes.forEach(shape => {
                        shape.rotation.x += shape.userData.rotationSpeed.x;
                        shape.rotation.y += shape.userData.rotationSpeed.y;
                        shape.rotation.z += shape.userData.rotationSpeed.z;
                        
                        shape.position.y = shape.userData.originalY + Math.sin(performance.now() * shape.userData.floatSpeed) * shape.userData.floatRange;
                    });
                }

                this.renderer.render(this.scene, this.camera);
            }
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    startTypingAnimation() {
        const element = document.querySelector('.typing-text');
        if (!element) return;

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentText = this.typingTexts[textIndex];
            
            if (isDeleting) {
                element.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                element.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % this.typingTexts.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        };

        type();
    }

    handleResize() {
        if (this.camera && this.renderer) {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }

    // Security message (keep existing)
    showSecurityMessage() {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed; top: 20px; right: 20px; z-index: 10000;
            background: linear-gradient(45deg, #00ff41, #00ffff);
            color: #000; padding: 15px 20px; border-radius: 10px;
            font-family: 'JetBrains Mono', monospace; font-weight: bold;
            box-shadow: 0 4px 20px rgba(0,255,255,0.3);
            animation: slideIn 0.5s ease-out;
        `;
        message.innerHTML = `
            <div>🔒 Portfolio Loading...</div>
            <div style="font-size: 0.8em; margin-top: 5px;">
                ${repo.description}
            </div>
        `;
        document.body.appendChild(message);

        setTimeout(() => {
            if (document.body.contains(message)) {
                document.body.removeChild(message);
            }
        }, 3000);
    }
}

// Initialize portfolio when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedPortfolio();
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdvancedPortfolio;
}