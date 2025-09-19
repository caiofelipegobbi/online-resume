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
    initializeThemeToggle();
    initializeCertificationDownloads();
    initializeSkillBars();
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

// Contact item hover animations and email copy functionality
function initializeContactAnimations() {
    const contactItems = document.querySelectorAll('.contact-item');
    const emailButton = document.getElementById('email-copy-btn');
    
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
    
    // Email copy functionality
    if (emailButton) {
        emailButton.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.getAttribute('data-email');
            const originalText = this.querySelector('span').textContent;
            
            // Copy email to clipboard
            navigator.clipboard.writeText(email).then(() => {
                // Visual feedback - change text temporarily
                const span = this.querySelector('span');
                span.textContent = 'Copied!';
                span.style.color = '#10b981'; // Green color
                
                // Reset after 2 seconds
                setTimeout(() => {
                    span.textContent = originalText;
                    span.style.color = ''; // Reset to default color
                }, 2000);
                
            }).catch(err => {
                console.error('Failed to copy email: ', err);
                // Fallback for older browsers
                fallbackCopyEmail(email, this);
            });
        });
    }
}

// Fallback copy function for older browsers
function fallbackCopyEmail(email, buttonElement) {
    const textArea = document.createElement('textarea');
    textArea.value = email;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            // Visual feedback
            const span = buttonElement.querySelector('span');
            const originalText = span.textContent;
            span.textContent = 'Copied!';
            span.style.color = '#10b981';
            
            setTimeout(() => {
                span.textContent = originalText;
                span.style.color = '';
            }, 2000);
        }
    } catch (err) {
        console.error('Fallback: Could not copy email', err);
    }
    
    document.body.removeChild(textArea);
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

// Skills bar animation functionality
function initializeSkillBars() {
    const skillCategories = document.querySelectorAll('.skills-category');
    
    // Create intersection observer for skill animation
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                skillObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all skill categories
    skillCategories.forEach(category => {
        skillObserver.observe(category);
    });
    
    // Add hover effects to individual skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const skillBar = this.querySelector('.skill-bar');
            skillBar.style.boxShadow = '0 0 10px rgba(37, 99, 235, 0.4)';
        });
        
        item.addEventListener('mouseleave', function() {
            const skillBar = this.querySelector('.skill-bar');
            skillBar.style.boxShadow = 'none';
        });
    });
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

// Certification download functionality
function initializeCertificationDownloads() {
    const certificationLinks = document.querySelectorAll('.certification-link');
    
    certificationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Get the certificate name from the download attribute
            const downloadName = this.getAttribute('download');
            const certName = downloadName.replace('.pdf', '').replace('_', ' ');
            
            // Show download feedback
            showDownloadToast(`Downloading ${certName}...`);
            
            // Add click animation
            const certItem = this.querySelector('.certification-item');
            certItem.style.transform = 'translateY(-2px) scale(0.98)';
            
            setTimeout(() => {
                certItem.style.transform = '';
            }, 200);
        });
    });
}

// Show download toast notification
function showDownloadToast(message) {

    const existingToast = document.querySelector('.download-toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'download-toast';
    toast.innerHTML = `
        <i class="fas fa-download"></i>
        <span>${message}</span>
    `;
    
    // Add toast styles
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        font-weight: 500;
        animation: slideInUp 0.3s ease-out;
        max-width: 300px;
    `;
    
    // Add animation styles if not already added
    if (!document.querySelector('#toast-animations')) {
        const animationStyles = document.createElement('style');
        animationStyles.id = 'toast-animations';
        animationStyles.textContent = `
            @keyframes slideInUp {
                from {
                    transform: translateY(100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutDown {
                from {
                    transform: translateY(0);
                    opacity: 1;
                }
                to {
                    transform: translateY(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(animationStyles);
    }
    
    document.body.appendChild(toast);
    
    // Auto-remove toast after 3 seconds
    setTimeout(() => {
        if (toast && toast.parentNode) {
            toast.style.animation = 'slideOutDown 0.3s ease-in';
            setTimeout(() => {
                if (toast && toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }
    }, 3000);
}

// Enhanced keyboard navigation
document.addEventListener('keydown', function(e) {
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
