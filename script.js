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

    // Navigation fade on scroll - optimized with throttling
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = 10;

    // Throttle function for performance
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

    const handleScroll = throttle(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > scrollThreshold) {
            if (scrollTop > lastScrollTop) {
                navbar.classList.add('hidden');
            } else {
                navbar.classList.remove('hidden');
            }
        } else {
            navbar.classList.remove('hidden');
        }

        lastScrollTop = scrollTop;
    }, 16); // ~60fps

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Apply Nasalization font to TARS, TarsX, and TARSX text
    function applyNasalizationFont() {
        // Patterns to match: TARS, TarsX, TARSX (case-insensitive)
        const patterns = [
            /\bTARS\b/gi,
            /\bTarsX\b/gi,
            /\bTARSX\b/gi
        ];

        // Function to walk through all text nodes
        function walkTextNodes(node, callback) {
            if (node.nodeType === Node.TEXT_NODE) {
                callback(node);
            } else {
                // Skip script and style tags
                if (node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE') {
                    const children = Array.from(node.childNodes);
                    children.forEach(child => walkTextNodes(child, callback));
                }
            }
        }

        // Process each text node
        walkTextNodes(document.body, function(textNode) {
            let text = textNode.textContent;
            let hasMatch = false;
            let newHTML = text;

            // Check each pattern and wrap matches
            patterns.forEach(pattern => {
                if (pattern.test(text)) {
                    hasMatch = true;
                    newHTML = newHTML.replace(pattern, function(match) {
                        return '<span class="nasalization-text">' + match + '</span>';
                    });
                }
            });

            // If we found matches, replace the text node with HTML
            if (hasMatch && newHTML !== text) {
                const wrapper = document.createElement('span');
                wrapper.innerHTML = newHTML;
                
                // Replace the text node with the wrapper's content
                const parent = textNode.parentNode;
                while (wrapper.firstChild) {
                    parent.insertBefore(wrapper.firstChild, textNode);
                }
                parent.removeChild(textNode);
            }
        });
    }

    // Run on page load
    applyNasalizationFont();

    // Also run after a short delay to catch dynamically loaded content
    setTimeout(applyNasalizationFont, 500);

});

