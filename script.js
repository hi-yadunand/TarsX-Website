// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }

    // FAQ Toggle Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active', !isActive);
            });
        }
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            formData.append("access_key", "a6a29f10-558f-443f-ba2d-5dc1ebf2a61f");
            
            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;
            
            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    alert("Success! Your message has been sent.");
                    contactForm.reset();
                } else {
                    alert("Error: " + data.message);
                }
            } catch (error) {
                alert("Something went wrong. Please try again.");
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Navigation fade on scroll
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = 10; // Minimum scroll distance to trigger fade

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > scrollThreshold) {
            if (scrollTop > lastScrollTop) {
                // Scrolling down - fade out
                navbar.classList.add('hidden');
            } else {
                // Scrolling up - fade in
                navbar.classList.remove('hidden');
            }
        } else {
            // At the top - always show
            navbar.classList.remove('hidden');
        }

        lastScrollTop = scrollTop;
    });

    // Make Projects link area more clickable (including tooltip area)
    const projectsLink = document.querySelector('.nav-menu a[href="dronx.html"]');
    if (projectsLink) {
        // The expanded padding-bottom already makes the entire area clickable
        // Add visual feedback on hover
        projectsLink.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });

        // Toggle tooltip visibility on click (prevent navigation to toggle)
        projectsLink.addEventListener('click', function(e) {
            // Check if clicking on the Projects text (not the tooltip area)
            const rect = this.getBoundingClientRect();
            const clickY = e.clientY;
            const linkBottom = rect.bottom;
            const linkTop = rect.top;
            
            // Calculate tooltip area (bottom 30px of the expanded clickable area)
            const tooltipAreaStart = linkBottom - 30;
            
            // If clicking in the tooltip area (DronX text), navigate to dronx.html
            if (clickY >= tooltipAreaStart && clickY <= linkBottom) {
                // Allow default navigation to dronx.html
                return true;
            }
            
            // If clicking in the main link area (Projects text), toggle visibility
            if (clickY >= linkTop && clickY < tooltipAreaStart) {
                e.preventDefault();
                this.classList.toggle('tooltip-visible');
            }
        });
    }
});

