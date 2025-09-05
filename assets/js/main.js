// Main JavaScript file for Rubies Micro Insurance website

// Testimonials carousel functionality
function scrollTestimonials(direction) {
    const carousel = document.getElementById('testimonials-carousel');
    const scrollAmount = 320; // Width of one testimonial card plus gap
    
    if (direction === 'left') {
        carousel.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    } else {
        carousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
}

// Auto-scroll testimonials every 5 seconds
function autoScrollTestimonials() {
    const carousel = document.getElementById('testimonials-carousel');
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    
    if (carousel.scrollLeft >= maxScroll) {
        carousel.scrollTo({
            left: 0,
            behavior: 'smooth'
        });
    } else {
        scrollTestimonials('right');
    }
}

// Initialize auto-scroll for testimonials
let testimonialInterval;

function startTestimonialAutoScroll() {
    testimonialInterval = setInterval(autoScrollTestimonials, 5000);
}

function stopTestimonialAutoScroll() {
    clearInterval(testimonialInterval);
}

// Mobile menu functionality (if needed in future)
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Smooth scroll to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Form validation (for future contact forms)
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Loading animation for buttons
function showButtonLoading(buttonElement) {
    const originalText = buttonElement.textContent;
    buttonElement.textContent = 'Loading...';
    buttonElement.disabled = true;
    
    // Restore button after 2 seconds (simulate API call)
    setTimeout(() => {
        buttonElement.textContent = originalText;
        buttonElement.disabled = false;
    }, 2000);
}

// Add click handlers for CTA buttons
document.addEventListener('DOMContentLoaded', function() {
    // Start testimonial auto-scroll
    startTestimonialAutoScroll();
    
    // Pause auto-scroll when user hovers over testimonials
    const testimonialCarousel = document.getElementById('testimonials-carousel');
    if (testimonialCarousel) {
        testimonialCarousel.addEventListener('mouseenter', stopTestimonialAutoScroll);
        testimonialCarousel.addEventListener('mouseleave', startTestimonialAutoScroll);
    }
    
    // Add click handlers to CTA buttons
    const ctaButtons = document.querySelectorAll('button');
    ctaButtons.forEach(button => {
        if (button.textContent.includes('Get Started') || button.textContent.includes('Learn More')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showButtonLoading(this);
                
                // Here you would typically redirect to a signup/info page
                console.log('CTA button clicked:', this.textContent);
            });
        }
    });
    
    // Add fade-in animation to sections on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    // Adjust testimonial carousel if needed
    const carousel = document.getElementById('testimonials-carousel');
    if (carousel) {
        // Reset scroll position on resize
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
    }
});

// Utility function to detect mobile devices
function isMobileDevice() {
    return window.innerWidth <= 768;
}

// Handle touch events for mobile testimonial swiping
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const carousel = document.getElementById('testimonials-carousel');
    if (!carousel) return;
    
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - scroll right
            scrollTestimonials('right');
        } else {
            // Swipe right - scroll left
            scrollTestimonials('left');
        }
    }
}

// Performance optimization: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);