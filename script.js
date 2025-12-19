// ==========================================
// Amsterdam Schilderwerken - Main JavaScript
// ==========================================

// Global state
let currentLanguage = 'en';
let currentLightboxIndex = 0;
let portfolioImages = [];

// ==========================================
// Initialize on DOM Load
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLanguage();
    initMobileMenu();
    initScrollAnimations();
    initPortfolioGallery();
    initLightbox();
    initContactForm();
    initScrollToTop();
    initSmoothScroll();
    initNavbarScroll();
    initHeroLogoScroll();
    initFeatherIcons();
    setCurrentYear();
    
    console.log('Amsterdam Schilderwerken website initialized');
});

// ==========================================
// Language Switching
// ==========================================

function initLanguage() {
    // Check for saved language preference
    const savedLang = localStorage.getItem('language') || 'en';
    currentLanguage = savedLang;
    
    // Set up language button listeners
    const langButtons = document.querySelectorAll('.lang-btn, .lang-btn-mobile');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            switchLanguage(lang);
        });
        
        // Set active state for current language
        if (btn.getAttribute('data-lang') === currentLanguage) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Apply initial language
    applyLanguage(currentLanguage);
}

function switchLanguage(lang) {
    if (lang === currentLanguage) return;
    
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Update button states
    const langButtons = document.querySelectorAll('.lang-btn, .lang-btn-mobile');
    langButtons.forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Apply translations
    applyLanguage(lang);
}

function applyLanguage(lang) {
    const t = translations[lang];
    
    // Translate all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const value = getNestedProperty(t, key);
        
        if (value) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                // Don't change the value, only placeholder if exists
                if (element.hasAttribute('data-translate-placeholder')) {
                    const placeholderKey = element.getAttribute('data-translate-placeholder');
                    const placeholderValue = getNestedProperty(t, placeholderKey);
                    if (placeholderValue) {
                        element.placeholder = placeholderValue;
                    }
                }
            } else if (element.tagName === 'OPTION') {
                element.textContent = value;
            } else {
                element.textContent = value;
            }
        }
    });
    
    // Handle placeholder translations
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        const value = getNestedProperty(t, key);
        if (value) {
            element.placeholder = value;
        }
    });
}

function getNestedProperty(obj, path) {
    return path.split('.').reduce((prev, curr) => {
        return prev ? prev[curr] : null;
    }, obj);
}

// ==========================================
// Mobile Menu
// ==========================================

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            
            // Update icon
            const icon = mobileMenuBtn.querySelector('[data-feather]');
            if (icon) {
                const isOpen = !mobileMenu.classList.contains('hidden');
                icon.setAttribute('data-feather', isOpen ? 'x' : 'menu');
                feather.replace();
            }
        });
        
        // Close menu when clicking on a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('[data-feather]');
                if (icon) {
                    icon.setAttribute('data-feather', 'menu');
                    feather.replace();
                }
            });
        });
    }
}

// ==========================================
// Scroll Animations (Intersection Observer)
// ==========================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);
    
    // Observe all fade-in sections
    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });
}

// ==========================================
// Portfolio Gallery
// ==========================================

function initPortfolioGallery() {
    // Create placeholder portfolio images
    portfolioImages = [
        {
            src: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop',
            title: 'Modern Interior Living Room',
            description: 'Complete interior transformation'
        },
        {
            src: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&auto=format&fit=crop',
            title: 'Kitchen Renovation',
            description: 'Fresh and modern kitchen painting'
        },
        {
            src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop',
            title: 'Bedroom Suite',
            description: 'Calming bedroom transformation'
        },
        {
            src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop',
            title: 'Office Space',
            description: 'Professional office environment'
        },
        {
            src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&auto=format&fit=crop',
            title: 'Exterior Facade',
            description: 'Beautiful exterior painting'
        },
        {
            src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop',
            title: 'Dining Room',
            description: 'Elegant dining space'
        }
    ];
    
    const portfolioGrid = document.getElementById('portfolio-grid');
    
    if (portfolioGrid) {
        portfolioGrid.innerHTML = '';
        
        portfolioImages.forEach((image, index) => {
            const item = document.createElement('div');
            item.className = 'portfolio-item fade-in-section';
            item.innerHTML = `
                <img src="${image.src}" alt="${image.title}" loading="lazy">
                <div class="portfolio-overlay">
                    <div class="portfolio-overlay-content">
                        <h3 class="text-xl font-bold mb-2">${image.title}</h3>
                        <p class="text-sm">${image.description}</p>
                    </div>
                </div>
            `;
            
            item.addEventListener('click', () => {
                openLightbox(index);
            });
            
            portfolioGrid.appendChild(item);
        });
        
        // Re-initialize scroll animations for new elements
        initScrollAnimations();
    }
}

// ==========================================
// Lightbox
// ==========================================

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', showPreviousImage);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', showNextImage);
    }
    
    // Close on background click
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPreviousImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });
}

function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    
    if (lightbox && lightboxImage) {
        currentLightboxIndex = index;
        lightboxImage.src = portfolioImages[index].src;
        lightboxImage.alt = portfolioImages[index].title;
        
        lightbox.classList.remove('hidden');
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Replace feather icons
        feather.replace();
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    
    if (lightbox) {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.classList.add('hidden');
        }, 300);
        document.body.style.overflow = '';
    }
}

function showPreviousImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + portfolioImages.length) % portfolioImages.length;
    const lightboxImage = document.getElementById('lightbox-image');
    
    if (lightboxImage) {
        lightboxImage.style.opacity = '0';
        setTimeout(() => {
            lightboxImage.src = portfolioImages[currentLightboxIndex].src;
            lightboxImage.alt = portfolioImages[currentLightboxIndex].title;
            lightboxImage.style.opacity = '1';
        }, 150);
    }
}

function showNextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % portfolioImages.length;
    const lightboxImage = document.getElementById('lightbox-image');
    
    if (lightboxImage) {
        lightboxImage.style.opacity = '0';
        setTimeout(() => {
            lightboxImage.src = portfolioImages[currentLightboxIndex].src;
            lightboxImage.alt = portfolioImages[currentLightboxIndex].title;
            lightboxImage.style.opacity = '1';
        }, 150);
    }
}

// ==========================================
// Contact Form
// ==========================================

function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const formMessage = document.getElementById('form-message');
    
    // Get form data
    const formData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        projectType: form['project-type'].value,
        message: form.message.value
    };
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
        showFormMessage('error', translations[currentLanguage].contact.form.error);
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showFormMessage('error', 'Please enter a valid email address.');
        return;
    }
    
    // Show loading state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = translations[currentLanguage].contact.form.sending;
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    
    // Simulate form submission (replace with actual backend call)
    try {
        await simulateFormSubmission(formData);
        
        // Show success message
        showFormMessage('success', translations[currentLanguage].contact.form.success);
        
        // Reset form
        form.reset();
        
    } catch (error) {
        // Show error message
        showFormMessage('error', translations[currentLanguage].contact.form.error);
        console.error('Form submission error:', error);
    } finally {
        // Restore button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
    }
}

function simulateFormSubmission(data) {
    return new Promise((resolve) => {
        console.log('Form submitted with data:', data);
        setTimeout(resolve, 1500);
    });
}

function showFormMessage(type, message) {
    const formMessage = document.getElementById('form-message');
    
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.classList.remove('hidden');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 5000);
    }
}

// ==========================================
// Scroll to Top Button
// ==========================================

function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top');
    
    if (scrollTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.remove('hidden');
            } else {
                scrollTopBtn.classList.add('hidden');
            }
        });
        
        // Scroll to top on click
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ==========================================
// Smooth Scroll for Navigation Links
// ==========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for # only
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// Navbar Scroll Effect
// ==========================================

function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }
            
            lastScroll = currentScroll;
        });
    }
}

// ==========================================
// Hero Logo Scroll Animation
// ==========================================

function initHeroLogoScroll() {
    const heroLogo = document.getElementById('hero-logo');
    const heroTitle = document.getElementById('hero-title');
    
    if (heroLogo && heroTitle) {
        window.addEventListener('scroll', throttle(() => {
            const scrollPosition = window.pageYOffset;
            const heroSection = document.getElementById('home');
            
            if (heroSection) {
                const heroHeight = heroSection.offsetHeight;
                const triggerPoint = 150; // Start animation after 150px scroll
                
                if (scrollPosition > triggerPoint) {
                    heroLogo.classList.add('scroll-fade');
                    heroTitle.classList.add('scroll-up');
                } else {
                    heroLogo.classList.remove('scroll-fade');
                    heroTitle.classList.remove('scroll-up');
                }
            }
        }, 10));
    }
}

// ==========================================
// Initialize Feather Icons
// ==========================================

function initFeatherIcons() {
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

// ==========================================
// Set Current Year in Footer
// ==========================================

function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ==========================================
// Utility Functions
// ==========================================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
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
    };
}

// ==========================================
// Handle Page Visibility Changes
// ==========================================

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page hidden');
    } else {
        console.log('Page visible');
        // Refresh feather icons when page becomes visible
        feather.replace();
    }
});

// ==========================================
// Performance Monitoring (Development)
// ==========================================

if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${pageLoadTime}ms`);
    });
}

// ==========================================
// Export for module usage (optional)
// ==========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        switchLanguage,
        openLightbox,
        closeLightbox
    };
}

