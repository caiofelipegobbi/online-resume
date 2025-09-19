// Initialize AOS (Animate On Scroll) library
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with custom settings
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
    }
    
    // Initialize all interactive features
    initializeTypewriter();
    initializeContactAnimations();
    initializeScrollEffects();
    initializePrintFunctionality();
    initializeThemeToggle();
});

// Typewriter effect for the name
function initializeTypewriter() {
    const nameElement = document.getElementById('fullName');
    const originalText = nameElement.textContent;
    
    // Only run typewriter effect on desktop
    if (window.innerWidth > 768) {
        nameElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                nameElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typewriter effect after a short delay
        setTimeout(typeWriter, 500);
    }
}

// Contact item hover animations
function initializeContactAnimations() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
        
        // Add click animation
        item.addEventListener('click', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px) scale(1)';
            }, 150);
        });
    });
}

// Scroll effects and progress indicator
function initializeScrollEffects() {
    // Create scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);
    
    // Add CSS for progress bar
    const style = document.createElement('style');
    style.textContent = `
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: rgba(37, 99, 235, 0.1);
            z-index: 1000;
            pointer-events: none;
        }
        
        .scroll-progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #2563eb, #3b82f6);
            width: 0%;
            transition: width 0.3s ease;
        }
        
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #2563eb, #3b82f6);
            border: none;
            border-radius: 50%;
            color: white;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
            z-index: 1000;
        }
        
        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(37, 99, 235, 0.4);
        }
    `;
    document.head.appendChild(style);
    
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);
    
    // Handle scroll events
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrolled / maxHeight) * 100;
        
        // Update progress bar
        document.querySelector('.scroll-progress-bar').style.width = progress + '%';
        
        // Show/hide back to top button
        if (scrolled > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
    
    // Back to top functionality
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Print functionality
function initializePrintFunctionality() {
    // Add print button
    const printBtn = document.createElement('button');
    printBtn.className = 'print-btn';
    printBtn.innerHTML = '<i class="fas fa-print"></i> Print CV';
    printBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        padding: 12px 20px;
        background: linear-gradient(135deg, #059669, #10b981);
        border: none;
        border-radius: 25px;
        color: white;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        opacity: 0.9;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 8px;
    `;
    
    printBtn.addEventListener('mouseenter', function() {
        this.style.opacity = '1';
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 16px rgba(5, 150, 105, 0.4)';
    });
    
    printBtn.addEventListener('mouseleave', function() {
        this.style.opacity = '0.9';
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.3)';
    });
    
    printBtn.addEventListener('click', function() {
        window.print();
    });
    
    document.body.appendChild(printBtn);
    
    // Hide print button on mobile
    if (window.innerWidth <= 768) {
        printBtn.style.display = 'none';
    }
}

// Theme toggle functionality (bonus feature)
function initializeThemeToggle() {
    // This is a placeholder for future dark mode implementation
    // You can expand this to add dark/light theme switching
    console.log('Theme toggle initialized - ready for dark mode implementation');
}

// Smooth scrolling for internal links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Enhanced keyboard navigation
document.addEventListener('keydown', function(e) {
    // Press 'P' to print
    if (e.key === 'p' || e.key === 'P') {
        if (e.ctrlKey || e.metaKey) {
            return; // Let browser handle Ctrl+P
        } else {
            e.preventDefault();
            window.print();
        }
    }
    
    // Press 'T' to go to top
    if (e.key === 't' || e.key === 'T') {
        if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
});

// Intersection Observer for fade-in animations on older browsers
function initializeFallbackAnimations() {
    if (typeof AOS === 'undefined') {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe elements that should animate
        document.querySelectorAll('.experience-item, .contact-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

// Initialize fallback animations if AOS is not available
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeFallbackAnimations, 100);
});

// Performance optimization: Lazy load non-critical features
function lazyLoadFeatures() {
    // Lazy load AOS library
    if (!document.querySelector('link[href*="aos"]')) {
        const aosCSS = document.createElement('link');
        aosCSS.rel = 'stylesheet';
        aosCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css';
        document.head.appendChild(aosCSS);
    }
}

// Load non-critical features after page load
window.addEventListener('load', lazyLoadFeatures);
