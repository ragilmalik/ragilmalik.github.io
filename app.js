// Repository data
const repositoryData = {
  "repositories": [
    {
      "name": "python-web-scraper",
      "description": "A beginner-friendly web scraping tool built with Python for extracting data from websites",
      "language": "Python",
      "stars": 12,
      "forks": 3,
      "updated": "2024-08-15",
      "topics": ["python", "web-scraping", "automation"],
      "url": "https://github.com/ragilmalik/python-web-scraper"
    },
    {
      "name": "portfolio-website",
      "description": "My personal portfolio website built with HTML, CSS, and JavaScript",
      "language": "JavaScript",
      "stars": 8,
      "forks": 2,
      "updated": "2024-09-20",
      "topics": ["portfolio", "website", "responsive"],
      "url": "https://github.com/ragilmalik/portfolio-website"
    },
    {
      "name": "content-marketing-tools",
      "description": "Collection of tools and scripts for content marketing automation",
      "language": "Python",
      "stars": 15,
      "forks": 5,
      "updated": "2024-07-30",
      "topics": ["marketing", "automation", "tools"],
      "url": "https://github.com/ragilmalik/content-marketing-tools"
    },
    {
      "name": "beginner-ethical-hacking",
      "description": "Learning repository with ethical hacking scripts and documentation",
      "language": "Python",
      "stars": 25,
      "forks": 8,
      "updated": "2024-09-10",
      "topics": ["security", "ethical-hacking", "learning"],
      "url": "https://github.com/ragilmalik/beginner-ethical-hacking"
    },
    {
      "name": "responsive-landing-page",
      "description": "Modern responsive landing page template with smooth animations",
      "language": "CSS",
      "stars": 6,
      "forks": 1,
      "updated": "2024-06-25",
      "topics": ["css", "responsive", "template"],
      "url": "https://github.com/ragilmalik/responsive-landing-page"
    }
  ]
};

// Language colors
const languageColors = {
  'Python': '#3776ab',
  'JavaScript': '#f7df1e',
  'CSS': '#1572b6',
  'HTML': '#e34f26',
  'TypeScript': '#3178c6',
  'React': '#61dafb',
  'Vue': '#4fc08d',
  'Java': '#ed8b00',
  'C++': '#00599c',
  'PHP': '#777bb4'
};

// Typing animation texts
const typingTexts = [
  'Python Developer',
  'Web Developer', 
  'Content Marketer',
  'Security Enthusiast',
  'Problem Solver'
];

class PortfolioApp {
  constructor() {
    this.currentFilter = 'all';
    this.typingIndex = 0;
    this.typingCharIndex = 0;
    this.isDeleting = false;
    this.typingSpeed = 100;
    this.typingTimeout = null;
    this.init();
  }

  init() {
    this.handleLoadingScreen();
    this.setupEventListeners();
    this.setupIntersectionObserver();
    this.startTypingAnimation();
    this.renderProjects();
    this.setupParticleBackground();
    this.setupTheme();
    this.setupScrollAnimations();
    this.setupCounterAnimations();
    this.setupSkillAnimations();
  }

  setupEventListeners() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.initializeInteractiveElements();
      });
    } else {
      this.initializeInteractiveElements();
    }

    // Window events
    window.addEventListener('scroll', () => {
      this.handleNavbarScroll();
      this.handleBackToTopVisibility();
    });

    window.addEventListener('resize', () => {
      this.handleResize();
    });
  }

  initializeInteractiveElements() {
    this.setupSmoothScrolling();
    this.setupMobileNav();
    this.setupBackToTop();
    this.setupContactForm();
    this.setupThemeToggle();
    this.setupProjectFilters();
    this.setupProjectSearch();
  }

  setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }
  }

  setupProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const filter = e.target.dataset.filter;
        this.filterProjects(filter);
      });
    });
  }

  setupProjectSearch() {
    const searchInput = document.getElementById('project-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchProjects(e.target.value);
      });
    }
  }

  setupIntersectionObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: '-50px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          
          // Trigger specific animations
          if (entry.target.classList.contains('stat-item')) {
            this.animateCounter(entry.target);
          }
          
          if (entry.target.classList.contains('skill-item')) {
            this.animateSkillBar(entry.target);
          }
        }
      });
    }, options);

    // Observe elements with animation class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }

  handleLoadingScreen() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
          loadingScreen.classList.add('hidden');
        }
      }, 1500);
    });
  }

  setupTheme() {
    // Check for saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-color-scheme', savedTheme);
    this.updateThemeIcon(savedTheme);
  }

  toggleTheme() {
    const currentTheme = document.body.getAttribute('data-color-scheme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-color-scheme', newTheme);
    localStorage.setItem('theme', newTheme);
    this.updateThemeIcon(newTheme);
  }

  updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle?.querySelector('i');
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  startTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) {
      // Retry after a short delay if element not found
      setTimeout(() => this.startTypingAnimation(), 100);
      return;
    }

    const currentText = typingTexts[this.typingIndex];
    
    if (this.isDeleting) {
      typingElement.textContent = currentText.substring(0, this.typingCharIndex - 1);
      this.typingCharIndex--;
      this.typingSpeed = 50;
    } else {
      typingElement.textContent = currentText.substring(0, this.typingCharIndex + 1);
      this.typingCharIndex++;
      this.typingSpeed = 100;
    }

    if (!this.isDeleting && this.typingCharIndex === currentText.length) {
      this.typingSpeed = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.typingCharIndex === 0) {
      this.isDeleting = false;
      this.typingIndex = (this.typingIndex + 1) % typingTexts.length;
    }

    // Clear any existing timeout and set a new one
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
    this.typingTimeout = setTimeout(() => this.startTypingAnimation(), this.typingSpeed);
  }

  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
          const offsetTop = target.offsetTop - 70;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
          this.updateActiveNavLink(targetId);
        }
      });
    });
  }

  updateActiveNavLink(activeHref) {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === activeHref) {
        link.classList.add('active');
      }
    });
  }

  setupMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
      });

      // Close mobile nav when clicking on links
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          navToggle.classList.remove('active');
          navMenu.classList.remove('active');
        });
      });
    }
  }

  handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Update active section
    this.updateActiveSection();
  }

  updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  setupBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  handleBackToTopVisibility() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }

  renderProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;

    projectsGrid.innerHTML = '';

    repositoryData.repositories.forEach((repo, index) => {
      const projectCard = this.createProjectCard(repo);
      // Add slight delay for staggered animation
      projectCard.style.animationDelay = `${index * 100}ms`;
      projectsGrid.appendChild(projectCard);
    });

    // Force a reflow to ensure proper rendering
    projectsGrid.offsetHeight;
  }

  createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'project-card animate-on-scroll';
    card.dataset.language = repo.language.toLowerCase();
    card.dataset.name = repo.name.toLowerCase();
    card.dataset.topics = repo.topics.join(' ').toLowerCase();

    const languageColor = languageColors[repo.language] || '#6b7280';
    const updatedDate = new Date(repo.updated).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });

    // Create demo URL (GitHub Pages format)
    const demoUrl = repo.url.includes('portfolio-website') || repo.url.includes('responsive-landing-page') 
      ? repo.url.replace('github.com/ragilmalik', 'ragilmalik.github.io').replace('.git', '')
      : repo.url;

    card.innerHTML = `
      <div class="project-header">
        <div>
          <h3 class="project-title">
            <a href="${repo.url}" target="_blank" rel="noopener noreferrer">${repo.name}</a>
          </h3>
        </div>
        <div class="project-links">
          <a href="${repo.url}" target="_blank" rel="noopener noreferrer" class="project-link" title="View on GitHub">
            <i class="fab fa-github"></i>
          </a>
          <a href="${demoUrl}" target="_blank" rel="noopener noreferrer" class="project-link" title="Live Demo">
            <i class="fas fa-external-link-alt"></i>
          </a>
        </div>
      </div>
      
      <p class="project-description">${repo.description}</p>
      
      <div class="project-tech">
        ${repo.topics.map(topic => `<span class="tech-tag">${topic}</span>`).join('')}
      </div>
      
      <div class="project-stats">
        <div class="project-meta">
          <div class="meta-item">
            <span class="language-indicator" style="background-color: ${languageColor}"></span>
            ${repo.language}
          </div>
          <div class="meta-item">
            <i class="fas fa-star"></i>
            ${repo.stars}
          </div>
          <div class="meta-item">
            <i class="fas fa-code-branch"></i>
            ${repo.forks}
          </div>
        </div>
        <div class="updated-date">Updated ${updatedDate}</div>
      </div>
    `;

    return card;
  }

  filterProjects(filter) {
    this.currentFilter = filter;
    
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.filter === filter) {
        btn.classList.add('active');
      }
    });

    // Filter project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
      const shouldShow = filter === 'all' || card.dataset.language === filter;
      
      if (shouldShow) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, index * 50);
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

  searchProjects(query) {
    const projectCards = document.querySelectorAll('.project-card');
    const searchTerm = query.toLowerCase();

    projectCards.forEach((card, index) => {
      const name = card.dataset.name;
      const topics = card.dataset.topics;
      const language = card.dataset.language;
      
      const matches = name.includes(searchTerm) || 
                     topics.includes(searchTerm) || 
                     language.includes(searchTerm);

      if (matches && (this.currentFilter === 'all' || card.dataset.language === this.currentFilter)) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, index * 50);
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

  setupCounterAnimations() {
    // Counter animation will be triggered by intersection observer
  }

  animateCounter(element) {
    const counter = element.querySelector('.stat-number');
    if (!counter || counter.classList.contains('animated')) return;

    const target = parseInt(counter.dataset.count);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    counter.classList.add('animated');

    const updateCounter = () => {
      current += step;
      if (current >= target) {
        counter.textContent = target;
        return;
      }
      counter.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    };

    updateCounter();
  }

  setupSkillAnimations() {
    // Skill animations will be triggered by intersection observer
  }

  animateSkillBar(skillItem) {
    const progressBar = skillItem.querySelector('.skill-progress');
    const level = skillItem.dataset.level;
    
    if (!progressBar || progressBar.classList.contains('animated')) return;

    progressBar.classList.add('animated');
    
    setTimeout(() => {
      progressBar.style.width = `${level}%`;
    }, 200);
  }

  setupParticleBackground() {
    const particlesBg = document.getElementById('particles-bg');
    if (!particlesBg) return;

    // Create floating particles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 1}px;
        height: ${Math.random() * 4 + 1}px;
        background: rgba(var(--color-teal-500-rgb), ${Math.random() * 0.5 + 0.1});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: floatParticle ${Math.random() * 20 + 10}s linear infinite;
      `;
      particlesBg.appendChild(particle);
    }

    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes floatParticle {
        0% {
          transform: translateY(0px) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(-100vh) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleContactFormSubmit(e.target);
    });
  }

  handleContactFormSubmit(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Simulate form submission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    setTimeout(() => {
      // Reset form
      form.reset();
      
      // Show success message
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      submitBtn.style.background = 'var(--color-success)';
      
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
      }, 3000);

      // You can integrate with a real form handler here
      console.log('Form submitted:', data);
      this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    }, 2000);
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: var(--space-16) var(--space-20);
      background: var(--color-${type === 'success' ? 'success' : 'info'});
      color: white;
      border-radius: var(--radius-base);
      box-shadow: var(--shadow-lg);
      z-index: 10000;
      transform: translateX(100%);
      transition: transform var(--duration-fast) ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 5000);
  }

  setupScrollAnimations() {
    // Additional scroll-based animations
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector('.hero-bg');
      
      if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translate3d(0, ${speed}px, 0)`;
      }
    });
  }

  handleResize() {
    // Handle responsive adjustments
    const mobileBreakpoint = 768;
    const isMobile = window.innerWidth <= mobileBreakpoint;
    
    // Close mobile nav on resize
    if (!isMobile) {
      const navToggle = document.getElementById('nav-toggle');
      const navMenu = document.getElementById('nav-menu');
      
      if (navToggle && navMenu) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    }
  }
}

// Enhanced smooth scrolling for older browsers
function smoothScrollTo(target, duration = 800) {
  if (!target) return;
  
  const targetPosition = target.offsetTop - 70;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// Utility functions
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Performance optimization
function preloadImages() {
  const imageUrls = [
    'https://avatars.githubusercontent.com/u/37180346?v=4'
  ];
  
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}

// Initialize the app
let portfolioApp;

function initializeApp() {
  if (!portfolioApp) {
    portfolioApp = new PortfolioApp();
    preloadImages();
  }
}

// Initialize immediately if DOM is ready, otherwise wait
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Add some easter eggs and advanced interactions
document.addEventListener('keydown', (e) => {
  // Konami Code easter egg (↑↑↓↓←→←→BA)
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ];
  
  if (!window.konamiSequence) window.konamiSequence = [];
  
  window.konamiSequence.push(e.code);
  window.konamiSequence = window.konamiSequence.slice(-konamiCode.length);
  
  if (window.konamiSequence.join(',') === konamiCode.join(',')) {
    // Easter egg activated!
    document.body.style.animation = 'rainbow 2s infinite';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 10000);
    
    // Add rainbow animation
    if (!document.getElementById('rainbow-style')) {
      const style = document.createElement('style');
      style.id = 'rainbow-style';
      style.textContent = `
        @keyframes rainbow {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }
  }
});

// Advanced cursor interactions
document.addEventListener('mousemove', (e) => {
  const cursor = document.querySelector('.custom-cursor');
  if (!cursor) {
    // Create custom cursor
    const newCursor = document.createElement('div');
    newCursor.className = 'custom-cursor';
    newCursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: rgba(var(--color-primary-rgb), 0.3);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: all 0.1s ease;
      mix-blend-mode: difference;
    `;
    document.body.appendChild(newCursor);
  }
  
  const cursorElement = document.querySelector('.custom-cursor');
  if (cursorElement) {
    cursorElement.style.left = e.clientX - 10 + 'px';
    cursorElement.style.top = e.clientY - 10 + 'px';
  }
});

// Add hover effects for interactive elements
document.addEventListener('mouseover', (e) => {
  const cursor = document.querySelector('.custom-cursor');
  if (cursor && (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.classList.contains('project-card'))) {
    cursor.style.transform = 'scale(2)';
    cursor.style.background = 'rgba(var(--color-primary-rgb), 0.6)';
  }
});

document.addEventListener('mouseout', (e) => {
  const cursor = document.querySelector('.custom-cursor');
  if (cursor && (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.classList.contains('project-card'))) {
    cursor.style.transform = 'scale(1)';
    cursor.style.background = 'rgba(var(--color-primary-rgb), 0.3)';
  }
});

// Service Worker for PWA capabilities (optional enhancement)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // You can add a service worker here for offline functionality
    console.log('Portfolio loaded successfully!');
  });
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PortfolioApp;
}