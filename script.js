/* ============================================
   ERNEST EMBASSY TRAVELS & INFINITY MOVIE STAR
   PROFESSIONAL JAVASCRIPT
   Version: 1.0
   Author: Damian Anielozie Okafor
   ============================================ */

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    
    /* --------------------------------------------
       SCROLL ANIMATIONS FOR CARDS & SECTIONS
    --------------------------------------------- */
    
    // Select all elements to animate
    const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .subject-card, .approach-card, .stat-box, .pricing-card, .info-card');
    
    // Set initial styles for animation
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        return rect.top <= windowHeight - 100;
    }
    
    // Function to animate elements when they come into view
    function animateOnScroll() {
        animateElements.forEach(el => {
            if (isElementInViewport(el)) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Run animation on load
    animateOnScroll();
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    
    /* --------------------------------------------
       MOBILE NAVIGATION MENU (HAMBURGER)
    --------------------------------------------- */
    
    // Create mobile menu button if needed
    const nav = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    
    if (nav && navLinks && window.innerWidth <= 768) {
        // Check if hamburger button already exists
        let hamburger = document.querySelector('.hamburger');
        
        if (!hamburger) {
            hamburger = document.createElement('button');
            hamburger.className = 'hamburger';
            hamburger.innerHTML = '☰';
            hamburger.style.cssText = `
                background: none;
                border: none;
                color: #ffd700;
                font-size: 1.8rem;
                cursor: pointer;
                display: block;
            `;
            
            // Insert hamburger before nav-links
            const navContainer = document.querySelector('.nav-container');
            if (navContainer) {
                navContainer.insertBefore(hamburger, navLinks);
            }
            
            // Initially hide nav links on mobile
            navLinks.style.display = 'none';
            navLinks.style.flexDirection = 'column';
            navLinks.style.width = '100%';
            navLinks.style.textAlign = 'center';
            navLinks.style.gap = '10px';
            
            // Toggle menu on click
            hamburger.addEventListener('click', function() {
                if (navLinks.style.display === 'none') {
                    navLinks.style.display = 'flex';
                    hamburger.innerHTML = '✕';
                } else {
                    navLinks.style.display = 'none';
                    hamburger.innerHTML = '☰';
                }
            });
        }
    }
    
    // Reset on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            const hamburger = document.querySelector('.hamburger');
            const navLinksMobile = document.querySelector('.nav-links');
            if (hamburger) {
                hamburger.style.display = 'none';
            }
            if (navLinksMobile) {
                navLinksMobile.style.display = 'flex';
                navLinksMobile.style.flexDirection = 'row';
            }
        } else {
            const hamburger = document.querySelector('.hamburger');
            const navLinksMobile = document.querySelector('.nav-links');
            if (hamburger) {
                hamburger.style.display = 'block';
            }
            if (navLinksMobile && window.innerWidth <= 768) {
                navLinksMobile.style.display = 'none';
                navLinksMobile.style.flexDirection = 'column';
            }
        }
    });
    
    
    /* --------------------------------------------
       FORM VALIDATION & SUBMISSION FEEDBACK
    --------------------------------------------- */
    
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Don't prevent default - let Netlify handle it
            // Just show loading indicator if needed
            
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '⏳ Sending...';
                submitBtn.disabled = true;
                
                // Re-enable after 3 seconds (in case of error)
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    });
    
    
    /* --------------------------------------------
       WHATSAPP FLOATING BUTTON - TRACK CLICKS
    --------------------------------------------- */
    
    const whatsappBtn = document.querySelector('.whatsapp-float');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            // Track WhatsApp button click (optional analytics)
            console.log('WhatsApp button clicked at: ' + new Date().toLocaleString());
            
            // You can add Google Analytics or other tracking here
            // Example: gtag('event', 'whatsapp_click', { 'event_category': 'contact' });
        });
    }
    
    
    /* --------------------------------------------
       SMOOTH SCROLL FOR ANCHOR LINKS
    --------------------------------------------- */
    
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#' && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    
    /* --------------------------------------------
       FAQ ACCORDION FUNCTIONALITY
    --------------------------------------------- */
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
    
    
    /* --------------------------------------------
       YEAR UPDATE IN FOOTER (AUTOMATIC)
    --------------------------------------------- */
    
    const footerYearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    
    footerYearElements.forEach(el => {
        el.textContent = currentYear;
    });
    
    // If no specific class exists, update copyright text
    const copyrightText = document.querySelector('footer p:first-child');
    if (copyrightText && !copyrightText.innerHTML.includes('2026')) {
        copyrightText.innerHTML = copyrightText.innerHTML.replace(/\d{4}/, currentYear);
    }
    
    
    /* --------------------------------------------
       BACK TO TOP BUTTON
    --------------------------------------------- */
    
    // Create back to top button
    let backToTop = document.querySelector('.back-to-top');
    
    if (!backToTop) {
        backToTop = document.createElement('button');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '↑';
        backToTop.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            border: none;
            cursor: pointer;
            font-size: 1.5rem;
            font-weight: bold;
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 999;
            transition: all 0.3s;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;
        document.body.appendChild(backToTop);
    }
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });
    
    // Scroll to top when clicked
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    
    /* --------------------------------------------
       LOADING SCREEN (OPTIONAL)
    --------------------------------------------- */
    
    // Simple loading screen removal
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 500);
    }
    
    
    /* --------------------------------------------
       FORM FIELD VALIDATION (REAL-TIME)
    --------------------------------------------- */
    
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#dc3545';
            } else {
                this.style.borderColor = '#e0e0e0';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = '#667eea';
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = '#28a745';
            } else {
                this.style.borderColor = '#e0e0e0';
            }
        });
    });
    
    
    /* --------------------------------------------
       PHONE NUMBER FORMATTING (OPTIONAL)
    --------------------------------------------- */
    
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            // Remove all non-digits
            let value = this.value.replace(/\D/g, '');
            
            // Limit to 11 digits (Nigeria phone numbers)
            if (value.length > 11) {
                value = value.slice(0, 11);
            }
            
            // Format as Nigerian number: 0801 234 5678
            if (value.length >= 5) {
                // Just update the raw value without formatting to avoid confusion
                this.value = value;
            } else {
                this.value = value;
            }
        });
    });
    
    
    /* --------------------------------------------
       LOGO CLICK REDIRECT (ensures home works)
    --------------------------------------------- */
    
    const logo = document.querySelector('.logo');
    if (logo && logo.tagName !== 'A') {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }
    
    
    /* --------------------------------------------
       EXTERNAL LINK HANDLER (open in new tab)
    --------------------------------------------- */
    
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    
    externalLinks.forEach(link => {
        if (!link.hostname.includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
    
    
    /* --------------------------------------------
       ACTIVE NAVIGATION HIGHLIGHTING
    --------------------------------------------- */
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksActive = document.querySelectorAll('.nav-links a');
    
    navLinksActive.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.style.color = '#ffd700';
            link.style.fontWeight = 'bold';
        }
    });
    
    
    /* --------------------------------------------
       CONSOLE LOG FOR DEVELOPMENT (Remove in production)
    --------------------------------------------- */
    
    console.log('Website loaded successfully!');
    console.log('Current page: ' + currentPage);
    console.log('Screen size: ' + window.innerWidth + 'x' + window.innerHeight);
    
}); // End of DOMContentLoaded


/* --------------------------------------------
   SERVICE WORKER REGISTRATION (FOR PWA)
--------------------------------------------- */

if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
        console.log('Service Worker registered successfully:', registration.scope);
    }).catch(function(error) {
        console.log('Service Worker registration failed:', error);
    });
}


/* --------------------------------------------
   PREVENT DOUBLE FORM SUBMISSION
--------------------------------------------- */

const allForms = document.querySelectorAll('form');
allForms.forEach(form => {
    let submitted = false;
    
    form.addEventListener('submit', function(e) {
        if (submitted) {
            e.preventDefault();
            return false;
        }
        submitted = true;
        
        // Reset after 5 seconds (in case of error)
        setTimeout(() => {
            submitted = false;
        }, 5000);
    });
});
