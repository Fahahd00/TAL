// ===============================
// Language Toggle System
// ===============================
let currentLanguage = 'ar';

const languageToggle = document.getElementById('languageToggle');

function toggleLanguage() {
    currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    
    // تحديث جميع العناصر التي فيها data-ar و data-en
    document.querySelectorAll('[data-ar][data-en]').forEach(element => {
        if (currentLanguage === 'ar') {
            element.textContent = element.getAttribute('data-ar');
        } else {
            element.textContent = element.getAttribute('data-en');
        }
    });
    
    // تحديث اتجاه الصفحة
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
    
    // تحديث نص الزر
    languageToggle.textContent = currentLanguage === 'ar' ? 'EN' : 'AR';
    languageToggle.classList.toggle('active');
    
    // حفظ اختيار اللغة
    localStorage.setItem('language', currentLanguage);
}

languageToggle.addEventListener('click', toggleLanguage);

// استرجاع اللغة المحفوظة عند التحميل
window.addEventListener('load', function() {
    const savedLanguage = localStorage.getItem('language') || 'ar';
    if (savedLanguage !== currentLanguage) {
        toggleLanguage();
    }
});

// ===============================
// Page Loader Animation - Optimized
// ===============================
window.addEventListener('load', function() {
    const loader = document.getElementById('pageLoader');
    
    // أسرع بـ 0.5 ثانية للخفة
    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 600);
        document.body.style.overflow = 'visible';
    }, 1000);
});

// Prevent scrolling while loading
document.body.style.overflow = 'hidden';

// ===============================
// Parallax Scrolling Effect
// ===============================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    
    // Parallax for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    // Parallax for section backgrounds
    const sections = document.querySelectorAll('.about, .services, .vision, .why-us, .team');
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionScroll = scrolled - sectionTop;
        if (sectionScroll > -window.innerHeight && sectionScroll < section.offsetHeight) {
            section.style.backgroundPositionY = `${sectionScroll * 0.3}px`;
        }
    });
});

// ===============================
// Advanced Animations & Interactions
// =============================== 

// Smooth Page Load Animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// ===============================
// Navigation Menu Toggle - Enhanced for Mobile
// ===============================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

// Toggle menu
menuToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'visible';
    }
    
    menuToggle.style.animation = 'rotateIn 0.4s ease';
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = 'visible';
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.nav-wrapper') && !event.target.closest('.nav-menu')) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = 'visible';
    }
});

// Close menu on ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = 'visible';
    }
});

// ===============================
// Smooth Scroll for Navigation
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===============================
// Navbar Background on Scroll
// =============================== 
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 12px 48px rgba(0, 0, 0, 0.3)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// ===============================
// Form Submission
// ===============================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('fullName').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (name && subject && message) {
            // Create WhatsApp message
            const whatsappMessage = `*الاسم:* ${name}%0A*الموضوع:* ${subject}%0A*الرسالة:*%0A${message}`;
            
            // WhatsApp number (Saudi format)
            const phoneNumber = '966548350331';
            
            // WhatsApp URL
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
            
            // Open WhatsApp
            window.open(whatsappURL, '_blank');
            
            // Reset form
            this.reset();
        } else {
            alert('يرجى ملء جميع الحقول المطلوبة');
        }
    });
}

// ===============================
// Intersection Observer for Advanced Animations
// ===============================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.animation = 'slideInUp 0.8s ease-out forwards';
        }
    });
}, observerOptions);

// Observe all service cards, team members, and stats
document.querySelectorAll('.service-card, .team-member, .vision-card, .why-us-item, .stat-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    observer.observe(element);
});

// ===============================
// Counter Animation for Stats
// ===============================
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats');
if (statsSection) {
    let hasAnimated = false;
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
            hasAnimated = true;
            const statItems = document.querySelectorAll('.stat-item h3');
            statItems.forEach(item => {
                const text = item.textContent;
                const number = parseInt(text);
                animateCounter(item, number);
            });
        }
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// ===============================
// Active Link Highlighting
// ===============================
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = 'var(--white)';
        }
    });
});

// ===============================
// Parallax Effect
// ===============================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero, .why-us');
    
    parallaxElements.forEach(element => {
        if (element.classList.contains('hero') || element.classList.contains('why-us')) {
            element.style.backgroundPosition = `0 ${scrolled * 0.5}px`;
        }
    });
});

// ===============================
// Utility Functions
// ===============================

// Add loading state to buttons
function setButtonLoading(button, isLoading) {
    if (isLoading) {
        button.disabled = true;
        button.style.opacity = '0.7';
    } else {
        button.disabled = false;
        button.style.opacity = '1';
    }
}

// Toast Notification (optional enhancement)
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background-color: ${type === 'success' ? '#D4AF37' : '#ff6b6b'};
        color: ${type === 'success' ? '#1a1a1a' : '#fff'};
        border-radius: 5px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations to stylesheet dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===============================
// Page Load Animation
// ===============================
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    console.log('تيم الليث - موقع احترافي يحمل بنجاح');
});

// ===============================
// Mobile Touch & Swipe Enhancements
// ===============================
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipeGesture();
}, { passive: true });

function handleSwipeGesture() {
    const swipeThreshold = 50;
    const swipeDistanceX = touchEndX - touchStartX;
    const swipeDistanceY = touchEndY - touchStartY;
    
    // Horizontal swipe detection
    if (Math.abs(swipeDistanceX) > Math.abs(swipeDistanceY)) {
        // Swipe right to left (close menu)
        if (swipeDistanceX < -swipeThreshold && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = 'visible';
        }
        // Swipe left to right (open menu from edge)
        else if (swipeDistanceX > swipeThreshold && touchStartX < 20 && !navMenu.classList.contains('active')) {
            navMenu.classList.add('active');
            menuToggle.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
}

// Optimize scroll performance on mobile
let ticking = false;

function optimizeScroll(callback) {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            callback();
            ticking = false;
        });
        ticking = true;
    }
}

// Add smooth scrolling polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollPolyfill = function(target) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let start = null;
        
        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
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
    };
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                smoothScrollPolyfill(document.querySelector(href));
            }
        });
    });
}

// Prevent zoom on double tap for better UX
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, { passive: false });

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swiped left
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = 'visible';
        }
    }
}

// ===============================
// Keyboard Navigation
// ===============================
document.addEventListener('keydown', function(e) {
    // Close menu on Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

console.log('✨ تيم الليث - تطبيق متقدم وآمن');
console.log('🚀 تم تحميل جميع التأثيرات الحديثة بنجاح');

// ===============================
// Back to Top Button
// ===============================
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.setAttribute('aria-label', 'العودة للأعلى');
    document.body.appendChild(backToTop);
    
    // Show/hide button based on scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    // Scroll to top on click
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Create back to top button on load
window.addEventListener('DOMContentLoaded', createBackToTopButton);

// ===============================
// Progress Bar on Page
// ===============================
function initProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.insertBefore(progressBar, document.body.firstChild);
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

window.addEventListener('load', initProgressBar);

// ===============================
// Scroll Spy for Active Navigation
// ===============================
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

window.addEventListener('DOMContentLoaded', initScrollSpy);

// ===============================
// Lazy Loading Images
// ===============================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        threshold: 0.1
    });
    
    images.forEach(img => imageObserver.observe(img));
}

window.addEventListener('DOMContentLoaded', initLazyLoading);

// ===============================
// Enhanced Form Validation
// ===============================
function initFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary-color)';
        });
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            submitForm(this);
        }
    });
}

function validateField(field) {
    const value = field.value.trim();
    
    if (!value) {
        showFieldError(field, 'هذا الحقل مطلوب');
        return false;
    }
    
    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'البريد الإلكتروني غير صحيح');
            return false;
        }
    }
    
    clearFieldError(field);
    return true;
}

function showFieldError(field, message) {
    field.style.borderColor = '#ff6b6b';
    field.style.boxShadow = '0 0 10px rgba(255, 107, 107, 0.3)';
}

function clearFieldError(field) {
    field.style.borderColor = 'var(--primary-color)';
    field.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.2)';
}

function submitForm(form) {
    showNotification('تم إرسال رسالتك بنجاح! شكراً لتواصلك معنا.', 'success');
    form.reset();
}

window.addEventListener('DOMContentLoaded', initFormValidation);

// ===============================
// Smooth Hover Effects
// ===============================
document.querySelectorAll('.btn, .service-card, .vision-card, .team-member').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===============================
// Accessibility Enhancements
// ===============================
function initAccessibility() {
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'تخطي إلى المحتوى الرئيسي';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--primary-color);
        color: #1a1a1a;
        padding: 8px;
        z-index: 100;
    `;
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);
}

window.addEventListener('DOMContentLoaded', initAccessibility);

// ===============================
// Performance Monitoring
// ===============================
function initPerformanceMonitoring() {
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', function() {
            const timing = window.performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            console.log('⏱️ وقت تحميل الصفحة: ' + loadTime + 'ms');
        });
    }
}

window.addEventListener('DOMContentLoaded', initPerformanceMonitoring);

// ===============================
// Dynamic Theme Detection
// ===============================
function initThemeDetection() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log('✨ الوضع الليلي المفضل');
    } else {
        console.log('☀️ الوضع النهاري المفضل');
    }
}

window.addEventListener('DOMContentLoaded', initThemeDetection);

// ===============================
// Founders Toggle Functionality
// ===============================
const foundersToggleBtn = document.getElementById('foundersToggleBtn');
const foundersCardsWrapper = document.getElementById('foundersCardsWrapper');
const teamMembersToggleBtn = document.getElementById('teamMembersToggleBtn');
const teamMembersCardsWrapper = document.getElementById('teamMembersCardsWrapper');

if (foundersToggleBtn && foundersCardsWrapper) {
    foundersToggleBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        foundersCardsWrapper.classList.toggle('active');
        
        // Add animation to cards when they appear
        if (foundersCardsWrapper.classList.contains('active')) {
            const cards = foundersCardsWrapper.querySelectorAll('.simple-founder-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.animation = 'fadeInScale 0.6s ease forwards';
                }, index * 150);
            });
        }
    });
}

if (teamMembersToggleBtn && teamMembersCardsWrapper) {
    teamMembersToggleBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        teamMembersCardsWrapper.classList.toggle('active');
        
        // Add animation to cards when they appear
        if (teamMembersCardsWrapper.classList.contains('active')) {
            const cards = teamMembersCardsWrapper.querySelectorAll('.simple-founder-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.animation = 'fadeInScale 0.6s ease forwards';
                }, index * 150);
            });
        }
    });
}
