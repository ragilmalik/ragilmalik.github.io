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
        
        // Dynamic repository data - loaded from repos.json (auto-synced via GitHub Actions)
        this.repositories = [];
        this.repoData = null;
        this.stats = {
            totalRepos: 0,
            followers: 0,
            yearsActive: 0
        };
        this.languageStats = [];
        this.timeline = [];
        this.skills = [];
        
        this.languageColors = {
            'Python': '#3776ab',
            'CSS': '#1572B6',
            'JavaScript': '#F7DF1E',
            'HTML': '#E34F26',
            'TypeScript': '#3178C6',
            'PHP': '#777BB4',
            'C': '#A8B9CC',
            'C++': '#f34b7d',
            'Java': '#b07219',
            'Go': '#00ADD8',
            'Rust': '#dea584'
        };
        
        this.init();
    }

    async init() {
        try {
            console.log('Initializing portfolio...');
            await this.setupLoading();
            await this.loadRepositoryData();
            await this.initializeComponents();
            this.hideLoading();
        } catch (error) {
            console.error('Error initializing portfolio:', error);
            this.hideLoading();
        }
    }

    async loadRepositoryData() {
        try {
            console.log('Loading repository data from repos.json...');
            const response = await fetch('repos.json?t=' + Date.now());

            if (!response.ok) {
                console.warn(`repos.json not found or error: ${response.statusText}`);
                console.warn('Using fallback: empty repository list. Run the GitHub Actions workflow to populate data.');
                return;
            }

            this.repoData = await response.json();
            this.repositories = this.repoData.repositories || [];
            this.stats = this.repoData.stats || this.stats;
            this.languageStats = this.repoData.languageStats || [];
            this.timeline = this.repoData.timeline || [];
            this.skills = this.repoData.skills || [];

            console.log(`✅ Loaded ${this.repositories.length} repositories`);
            console.log(`📊 Stats: ${this.stats.totalRepos} repos, ${this.stats.followers} followers, ${this.stats.yearsActive} years active`);
            console.log(`📈 Language stats:`, this.languageStats);
            console.log(`🏷️ Skills:`, this.skills);

            // Update stats in the DOM
            this.updateStatsDisplay();
        } catch (error) {
            console.error('❌ Error loading repository data:', error);
            console.error('This is expected if repos.json does not exist yet.');
            console.error('Solution: Run the GitHub Actions workflow to generate repos.json');
            // Don't modify arrays - keep them empty and let the site still load
        }
    }

    updateStatsDisplay() {
        // Update stats counters with dynamic data
        const statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers.length >= 3) {
            // Update data-count attributes for animation
            statNumbers[0].dataset.count = this.stats.totalRepos || 0;
            statNumbers[1].dataset.count = this.stats.yearsActive || 0;

            // Calculate Python percentage from language stats
            const pythonStat = this.languageStats.find(stat => stat.language === 'Python');
            const pythonPercentage = pythonStat ? Math.round(pythonStat.percentage) : 0;
            statNumbers[2].dataset.count = pythonPercentage;

            // Trigger animation after updating data
            this.animateCounters();
        }

        // Update GitHub Overview card in ADVANCED ANALYTICS section
        const totalReposElement = document.getElementById('total-repos');
        if (totalReposElement) {
            totalReposElement.textContent = this.stats.totalRepos || 0;
        }

        const totalFollowersElement = document.getElementById('total-followers');
        if (totalFollowersElement) {
            totalFollowersElement.textContent = this.stats.followers || 0;
        }

        const yearsActiveElement = document.getElementById('years-active');
        if (yearsActiveElement) {
            yearsActiveElement.textContent = this.stats.yearsActive || 0;
        }

        // Update new stat cards: Total Stars and Total Languages
        // Calculate total stars from all repositories
        const totalStars = this.repositories.reduce((sum, repo) => sum + (repo.stars || 0), 0);
        const totalStarsElement = document.getElementById('total-stars');
        if (totalStarsElement) {
            totalStarsElement.textContent = totalStars;
        }

        // Update total languages count from languageStats
        const totalLanguages = this.languageStats.length || 0;
        const totalLanguagesElement = document.getElementById('total-languages');
        if (totalLanguagesElement) {
            totalLanguagesElement.textContent = totalLanguages;
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
            // First, ensure stat cards are visible by clearing any stuck inline styles
            gsap.set('.stat-card', { clearProps: 'all' });

            gsap.timeline()
                .from('.hero-greeting', { duration: 1, y: 50, opacity: 0, ease: 'power3.out' })
                .from('.hero-title .title-main', { duration: 1.2, y: 100, opacity: 0, ease: 'power3.out' }, '-=0.5')
                .from('.hero-description', { duration: 1, y: 30, opacity: 0, ease: 'power2.out' }, '-=0.3')
                .from('.hero-actions .cta-button', { duration: 0.8, y: 30, opacity: 0, stagger: 0.1, ease: 'power2.out' }, '-=0.5')
                .fromTo('.stat-card',
                    { y: 30, opacity: 0 },
                    { duration: 0.8, y: 0, opacity: 1, stagger: 0.1, ease: 'power2.out', clearProps: 'transform' },
                    '-=0.5'
                );
        } else {
            // Fallback CSS animations
            document.querySelectorAll('.hero-greeting, .hero-title, .hero-description, .cta-button, .stat-card').forEach((el, index) => {
                el.style.animation = `fadeInUp 1s ease ${index * 0.1}s forwards`;
            });
        }

        this.startTypingAnimation();
        this.animateCounters();
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
            geometry.setAttribute('particleSize', new THREE.BufferAttribute(sizes, 1));
            
            const material = new THREE.ShaderMaterial({
                uniforms: {
                    time: { value: 0 }
                },
                vertexShader: `
                    precision highp float;
                    attribute float particleSize;
                    varying vec3 vColor;
                    uniform float time;

                    void main() {
                        vColor = color;
                        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                        gl_Position = projectionMatrix * mvPosition;
                        gl_PointSize = particleSize * (300.0 / -mvPosition.z) * (1.0 + sin(time * 2.0 + position.x * 0.01) * 0.5);
                    }
                `,
                fragmentShader: `
                    precision highp float;
                    varying vec3 vColor;

                    void main() {
                        float dist = length(gl_PointCoord - vec2(0.5));
                        if (dist > 0.5) discard;

                        float alpha = (1.0 - dist * 2.0) * 0.8;
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
            trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
            
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
            const description = card.querySelector('.project-description')?.textContent || '';

            const matchesFilter = filter === 'all' ||
                                language.includes(filter) ||
                                topics.includes(filter);

            const matchesSearch = !searchTerm ||
                                name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                topics.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                description.toLowerCase().includes(searchTerm.toLowerCase());

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

            // Section animations - only animate if elements exist
            gsap.utils.toArray('section').forEach(section => {
                const titleElements = section.querySelectorAll('.section-title, .section-subtitle');
                if (titleElements.length > 0) {
                    // Ensure section titles are visible
                    gsap.set(titleElements, { clearProps: 'all' });

                    gsap.fromTo(titleElements,
                        { y: 50, opacity: 0 },
                        {
                            duration: 1,
                            y: 0,
                            opacity: 1,
                            stagger: 0.2,
                            ease: 'power2.out',
                            clearProps: 'transform',
                            scrollTrigger: {
                                trigger: section,
                                start: 'top 80%',
                                end: 'bottom 20%',
                                toggleActions: 'play none none reverse'
                            }
                        }
                    );
                }
            });

            // Stats panels animation - only if elements exist
            const statPanels = document.querySelectorAll('.stat-panel');
            if (statPanels.length > 0) {
                // First ensure panels are visible by default
                gsap.set('.stat-panel', { clearProps: 'all' });

                // Then apply scroll-triggered animation
                gsap.fromTo('.stat-panel',
                    { y: 50, opacity: 0 },
                    {
                        duration: 0.8,
                        y: 0,
                        opacity: 1,
                        stagger: 0.1,
                        ease: 'power2.out',
                        clearProps: 'transform',
                        scrollTrigger: {
                            trigger: '.stats-section',
                            start: 'top 80%',
                            once: true
                        }
                    }
                );
            }

            // Skills animation - only if elements exist
            const skillCategories = document.querySelectorAll('.skill-category');
            if (skillCategories.length > 0) {
                // First ensure skill categories are visible
                gsap.set('.skill-category', { clearProps: 'all' });

                gsap.fromTo('.skill-category',
                    { x: -50, opacity: 0 },
                    {
                        duration: 0.8,
                        x: 0,
                        opacity: 1,
                        stagger: 0.2,
                        ease: 'power2.out',
                        clearProps: 'transform',
                        scrollTrigger: {
                            trigger: '.skills-section',
                            start: 'top 80%'
                        }
                    }
                );
            }

            // Timeline animation - skip since timeline items are created dynamically after this
            // Timeline animations will be set up in setupTimeline() method

            // Contact section animation - only if elements exist
            const contactElements = document.querySelectorAll('.contact-item, .contact-form-container');
            if (contactElements.length > 0) {
                // First ensure contact elements are visible
                gsap.set('.contact-item, .contact-form-container', { clearProps: 'all' });

                gsap.fromTo('.contact-item, .contact-form-container',
                    { y: 50, opacity: 0 },
                    {
                        duration: 0.8,
                        y: 0,
                        opacity: 1,
                        stagger: 0.1,
                        ease: 'power2.out',
                        clearProps: 'transform',
                        scrollTrigger: {
                            trigger: '.contact-section',
                            start: 'top 80%'
                        }
                    }
                );
            }
        } catch (error) {
            console.error('Error setting up GSAP animations:', error);
        }
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
            console.log('Creating language chart with dynamic data...');

            // Use dynamic language stats from repos.json
            const labels = this.languageStats.map(stat => stat.language);
            const data = this.languageStats.map(stat => stat.percentage);
            const colors = labels.map(lang => this.languageColors[lang] || '#999999');

            if (labels.length === 0) {
                console.warn('No language data available');
                return;
            }

            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                        data: data,
                        backgroundColor: colors,
                        borderColor: colors.map((_, i) => i % 2 === 0 ? '#00ffff' : '#ffffff'),
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
            console.log('Language chart created successfully with dynamic data');
        } catch (error) {
            console.error('Error creating language chart:', error);
            // Fallback: Create a simple text-based chart
            this.createFallbackLanguageChart(ctx);
        }
    }

    createFallbackLanguageChart(ctx) {
        const container = ctx.parentElement;
        container.innerHTML = `
            <div style="color: white; text-align: center; padding: 20px;">
                <h4 style="margin-bottom: 15px;">Language Distribution</h4>
                <div style="display: flex; justify-content: space-around; align-items: center; flex-wrap: wrap; gap: 10px;">
                    <div style="text-align: center;">
                        <div style="width: 60px; height: 60px; background: #3776ab; border-radius: 50%; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; font-size: 12px;">55%</div>
                        <div>Python</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="width: 60px; height: 60px; background: #F7DF1E; border-radius: 50%; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center; font-weight: bold; color: black; font-size: 12px;">27%</div>
                        <div>JavaScript</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="width: 60px; height: 60px; background: #1572B6; border-radius: 50%; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; font-size: 12px;">9%</div>
                        <div>CSS</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="width: 60px; height: 60px; background: #E34F26; border-radius: 50%; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; font-size: 12px;">9%</div>
                        <div>HTML</div>
                    </div>
                </div>
            </div>
        `;
    }

    setupTimelineChart() {
        const ctx = document.getElementById('timeline-chart');
        if (!ctx) {
            console.warn('Timeline chart canvas not found');
            return;
        }

        // Wait for Chart.js to be available
        if (typeof Chart === 'undefined') {
            console.warn('Chart.js not available, retrying...');
            setTimeout(() => this.setupTimelineChart(), 1000);
            return;
        }

        try {
            console.log('Creating timeline chart with dynamic data...');

            // Use dynamic timeline data from repos.json
            const timelineData = this.timeline || [];

            if (timelineData.length === 0) {
                console.warn('No timeline data available');
                return;
            }

            new Chart(ctx, {
                type: 'line',
                data: {
                    datasets: [{
                        label: 'Total Repositories',
                        data: timelineData,
                        borderColor: '#00ffff',
                        backgroundColor: 'rgba(0, 255, 255, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#00ffff',
                        pointBorderColor: '#ffffff',
                        pointRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            ticks: {
                                color: '#ffffff'
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            }
                        },
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: '#ffffff',
                                stepSize: 1
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: '#ffffff'
                            }
                        }
                    }
                }
            });
            console.log('Timeline chart created successfully with dynamic data');
        } catch (error) {
            console.error('Error creating timeline chart:', error);
            // Fallback: Create a simple text-based chart
            this.createFallbackTimelineChart(ctx);
        }
    }

    createFallbackTimelineChart(ctx) {
        const container = ctx.parentElement;
        container.innerHTML = `
            <div style="color: white; text-align: center; padding: 20px;">
                <h4 style="margin-bottom: 15px;">Repository Timeline</h4>
                <div style="display: flex; justify-content: space-between; align-items: end; height: 120px; padding: 0 10px;">
                    <div style="text-align: center; flex: 1;">
                        <div style="width: 20px; height: 11px; background: #00ffff; margin: 0 auto 5px;"></div>
                        <small>Oct'22</small><br><small>1</small>
                    </div>
                    <div style="text-align: center; flex: 1;">
                        <div style="width: 20px; height: 44px; background: #00ffff; margin: 0 auto 5px;"></div>
                        <small>Aug'25</small><br><small>4</small>
                    </div>
                    <div style="text-align: center; flex: 1;">
                        <div style="width: 20px; height: 55px; background: #00ffff; margin: 0 auto 5px;"></div>
                        <small>Sep'25</small><br><small>5</small>
                    </div>
                    <div style="text-align: center; flex: 1;">
                        <div style="width: 20px; height: 87px; background: #00ffff; margin: 0 auto 5px;"></div>
                        <small>Oct'25</small><br><small>8</small>
                    </div>
                    <div style="text-align: center; flex: 1;">
                        <div style="width: 20px; height: 120px; background: #00ffff; margin: 0 auto 5px;"></div>
                        <small>Nov'25</small><br><small>11</small>
                    </div>
                </div>
            </div>
        `;
    }

    setupActivityGrid() {
        const activityGrid = document.getElementById('activity-grid');
        if (!activityGrid) return;

        // Generate real activity data based on repository updates
        const today = new Date();
        const activityMap = new Map();

        // Count repository updates per day for the last 84 days
        this.repositories.forEach(repo => {
            if (repo.updated) {
                const updateDate = new Date(repo.updated);
                const dateKey = updateDate.toDateString();
                activityMap.set(dateKey, (activityMap.get(dateKey) || 0) + 1);
            }
        });

        // Generate grid for last 84 days (7 days × 12 weeks)
        for (let i = 83; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateKey = date.toDateString();

            const day = document.createElement('div');
            day.className = 'activity-day';

            const activityCount = activityMap.get(dateKey) || 0;

            // Apply activity levels based on real update counts
            if (activityCount > 0) {
                day.classList.add('active');
                if (activityCount >= 3) {
                    day.classList.add('very-active');
                }
            }

            // Format tooltip with actual activity info
            const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            day.title = activityCount > 0
                ? `${dateStr}: ${activityCount} update${activityCount > 1 ? 's' : ''}`
                : `${dateStr}: No activity`;

            activityGrid.appendChild(day);
        }
    }

    renderProjects() {
        const projectsGrid = document.getElementById('projects-grid');
        if (!projectsGrid) {
            console.error('❌ Projects grid element not found');
            return;
        }

        console.log(`🎨 Rendering ${this.repositories.length} repository cards...`);
        projectsGrid.innerHTML = '';

        if (this.repositories.length === 0) {
            projectsGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #fff;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 48px; margin-bottom: 20px; color: #00ffff;"></i>
                    <h3>No Repositories Found</h3>
                    <p>repos.json is empty or not loaded. Please run the GitHub Actions workflow to sync your repositories.</p>
                </div>
            `;
            return;
        }

        this.repositories.forEach((repo, index) => {
            try {
                const projectCard = this.createProjectCard(repo);
                projectsGrid.appendChild(projectCard);
            } catch (error) {
                console.error(`❌ Error creating card for repo "${repo.name}":`, error);
            }
        });

        console.log(`✅ Successfully rendered ${this.repositories.length} repository cards`);
    }

    createProjectCard(repo) {
        const card = document.createElement('div');
        card.className = 'project-card';

        // Handle null/undefined values safely
        const language = repo.language || 'Unknown';
        const topics = repo.topics || [];
        const description = repo.description || 'No description available';

        card.dataset.language = language.toLowerCase();
        card.dataset.name = (repo.name || '').toLowerCase();
        card.dataset.topics = topics.join(' ').toLowerCase();

        const languageColor = this.languageColors[language] || '#999999';
        const updatedDate = new Date(repo.updated).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        card.innerHTML = `
            <div class="project-header">
                <h3 class="project-title">${repo.name}</h3>
                <div class="project-links">
                    <a href="${repo.url}" target="_blank" class="project-link" title="View Repository">
                        <i class="fab fa-github"></i>
                    </a>
                    <a href="${repo.url.replace('github.com', 'github.dev')}" target="_blank" class="project-link" title="Open in VS Code">
                        <i class="fas fa-code"></i>
                    </a>
                </div>
            </div>

            <p class="project-description">${description}</p>

            <div class="project-topics">
                ${topics.map(topic => `<span class="topic-tag">${topic}</span>`).join('')}
            </div>

            <div class="project-meta">
                <div class="project-stats">
                    <div class="stat-item">
                        <span class="language-dot" style="background-color: ${languageColor}"></span>
                        ${language}
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-star"></i>
                        ${repo.stars || 0}
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-code-branch"></i>
                        ${repo.forks || 0}
                    </div>
                </div>
                <div class="updated-date">${updatedDate}</div>
            </div>
        `;

        return card;
    }

    setupTimeline() {
        const timelineItems = document.getElementById('timeline-items');
        if (!timelineItems) return;

        const timelineData = [
            {
                date: 'March 2018',
                title: 'The Beginning',
                description: 'Joined GitHub and started exploring the vast world of programming. First steps into Python development and understanding version control systems.'
            },
            {
                date: 'October 2022',
                title: 'Security & Encryption Focus',
                description: 'Launched RPG (Random Password Generator) - my first security-focused Python project. Developed strong foundations in cryptographic principles and secure password generation algorithms.'
            },
            {
                date: 'August 2025',
                title: 'GUI Development Renaissance',
                description: 'Breakthrough into GUI development with PySide6. Created Python-GUI-Media-Organizer and Python-GUI-Mover—powerful desktop applications for file management. Mastered event-driven programming and modern UI/UX design patterns.'
            },
            {
                date: 'September 2025',
                title: 'Advanced File Operations',
                description: 'Built Python-GUI-Clipboard-Manager with OCR capabilities and Quick Paste features. Developed Python-GUI-Duplicate-File-Finder using SHA-256 hashing for enterprise-grade duplicate detection. Enhanced skills in multithreading and database integration with SQLite.'
            },
            {
                date: 'October 2025',
                title: 'Web & Cloud Expansion',
                description: 'Launched this advanced portfolio website with Three.js 3D animations and Chart.js analytics. Deployed microfeed CMS on Cloudflare Workers. Created Python-CLI-Email-Validator for robust email verification. Expanded into full-stack web development with modern frameworks.'
            },
            {
                date: 'November 2025',
                title: 'Multi-Platform Innovation',
                description: 'Deployed CloudPaste—a Cloudflare-based file sharing platform with Markdown rendering, WebDAV support, and S3 storage integration. Built modern URL shortener with glassmorphism UI and analytics. Developed Telegram TikTok Downloader bot. Ventured into IoT with ESP01 DDNS client in C. Curated games-collection featuring 1000+ HTML5 games.'
            }
        ];
        
        timelineData.forEach((item, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';

            timelineItem.innerHTML = `
                <div class="timeline-content">
                    <div class="timeline-date">${item.date}</div>
                    <h3 class="timeline-title">${item.title}</h3>
                    <p class="timeline-description">${item.description}</p>
                </div>
                <div class="timeline-dot"></div>
            `;

            timelineItems.appendChild(timelineItem);
        });

        // Setup GSAP animation for timeline items after they're created
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            const timelineItemElements = document.querySelectorAll('.timeline-item');
            if (timelineItemElements.length > 0) {
                // Ensure timeline items are visible
                gsap.set('.timeline-item', { clearProps: 'all' });

                gsap.fromTo('.timeline-item',
                    (index) => ({
                        x: index % 2 === 0 ? -100 : 100,
                        opacity: 0
                    }),
                    {
                        duration: 0.8,
                        x: 0,
                        opacity: 1,
                        stagger: 0.2,
                        ease: 'power2.out',
                        clearProps: 'transform',
                        scrollTrigger: {
                            trigger: '.timeline-section',
                            start: 'top 80%'
                        }
                    }
                );
            }
        }
    }

    startTypingAnimation() {
        const typingElement = document.getElementById('typing-text');
        if (!typingElement) return;
        
        const type = () => {
            const currentFullText = this.typingTexts[this.typingIndex];
            
            if (this.isDeleting) {
                this.currentText = currentFullText.substring(0, this.currentText.length - 1);
            } else {
                this.currentText = currentFullText.substring(0, this.currentText.length + 1);
            }
            
            typingElement.textContent = this.currentText;
            
            let typeSpeed = this.isDeleting ? 50 : 100;
            
            if (!this.isDeleting && this.currentText === currentFullText) {
                typeSpeed = 2000;
                this.isDeleting = true;
            } else if (this.isDeleting && this.currentText === '') {
                this.isDeleting = false;
                this.typingIndex = (this.typingIndex + 1) % this.typingTexts.length;
                typeSpeed = 500;
            }
            
            setTimeout(type, typeSpeed);
        };
        
        type();
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.count);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    return;
                }
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            };
            
            updateCounter();
        });
        
        // Animate skill bars
        setTimeout(() => {
            document.querySelectorAll('.skill-item').forEach(item => {
                const level = item.dataset.level;
                const skillFill = item.querySelector('.skill-fill');
                if (skillFill && level) {
                    skillFill.style.width = `${level}%`;
                }
            });
        }, 1000);
    }

    setupPerformanceMonitor() {
        const fpsDisplay = document.getElementById('fps-value');
        if (!fpsDisplay) return;
        
        let frames = 0;
        let lastTime = performance.now();
        
        const updateFPS = () => {
            frames++;
            const now = performance.now();
            
            if (now >= lastTime + 1000) {
                this.fps = Math.round((frames * 1000) / (now - lastTime));
                fpsDisplay.textContent = this.fps;
                
                // Update FPS display color based on performance
                if (this.fps >= 55) {
                    fpsDisplay.style.color = '#00ff41';
                } else if (this.fps >= 30) {
                    fpsDisplay.style.color = '#ffff00';
                } else {
                    fpsDisplay.style.color = '#ff0080';
                }
                
                frames = 0;
                lastTime = now;
            }
            
            requestAnimationFrame(updateFPS);
        };
        
        updateFPS();
    }

    startAnimationLoop() {
        const animate = (time) => {
            this.frameCount++;
            
            // Update Three.js scene
            if (this.particles && this.particles.material.uniforms) {
                this.particles.rotation.y += 0.002;
                this.particles.material.uniforms.time.value = time * 0.001;
            }
            
            // Animate floating shapes
            if (this.floatingShapes) {
                this.floatingShapes.forEach((shape, index) => {
                    if (shape.userData) {
                        shape.rotation.x += shape.userData.rotationSpeed.x;
                        shape.rotation.y += shape.userData.rotationSpeed.y;
                        shape.rotation.z += shape.userData.rotationSpeed.z;
                        
                        // More noticeable floating motion
                        const floatOffset = Math.sin(time * shape.userData.floatSpeed + index) * shape.userData.floatRange;
                        shape.position.y = shape.userData.originalY + floatOffset;
                    }
                });
            }
            
            // Update camera position based on scroll
            const scrollPercent = window.pageYOffset / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
            if (this.camera) {
                this.camera.position.y = scrollPercent * -30;
                this.camera.position.z = 30 + scrollPercent * 15;
            }
            
            // Render Three.js scene
            if (this.renderer && this.scene && this.camera) {
                this.renderer.render(this.scene, this.camera);
            }
            
            requestAnimationFrame(animate);
        };
        
        animate(0);
    }

    handleResize() {
        if (this.camera && this.renderer) {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }
        
        // Update mouse trail canvas
        const canvas = document.getElementById('mouse-trail');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing portfolio...');
    new AdvancedPortfolio();
});

// Fallback initialization if DOMContentLoaded already fired
if (document.readyState === 'loading') {
    console.log('Document still loading...');
} else {
    console.log('Document already loaded, initializing immediately...');
    new AdvancedPortfolio();
}

// Add keyboard shortcuts and easter eggs
document.addEventListener('keydown', (e) => {
    // Konami code easter egg
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    if (!window.konamiSequence) window.konamiSequence = [];
    
    window.konamiSequence.push(e.code);
    window.konamiSequence = window.konamiSequence.slice(-konamiCode.length);
    
    if (window.konamiSequence.join(',') === konamiCode.join(',') && window.konamiSequence.length === konamiCode.length) {
        createMatrixRain();
        showEasterEggMessage();
        window.konamiSequence = []; // Reset sequence
    }
});

function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 9999;
        pointer-events: none;
        mix-blend-mode: screen;
    `;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const ctx = canvas.getContext('2d');
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    document.body.appendChild(canvas);
    
    const interval = setInterval(draw, 35);
    
    setTimeout(() => {
        clearInterval(interval);
        if (document.body.contains(canvas)) {
            document.body.removeChild(canvas);
        }
    }, 5000);
}

function showEasterEggMessage() {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: #00ff41;
        padding: 2rem;
        border: 2px solid #00ff41;
        border-radius: 8px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 1.2rem;
        z-index: 10000;
        text-align: center;
        box-shadow: 0 0 50px #00ff41;
    `;
    message.innerHTML = `
        <h3>🎉 KONAMI CODE ACTIVATED! 🎉</h3>
        <p>Welcome to the Matrix, Neo...</p>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        if (document.body.contains(message)) {
            document.body.removeChild(message);
        }
    }, 3000);
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdvancedPortfolio;
}