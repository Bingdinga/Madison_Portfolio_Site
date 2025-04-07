document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
      menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        const expanded = navMenu.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', expanded);
      });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (navMenu && navMenu.classList.contains('active') && !event.target.closest('.main-nav')) {
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Add active class to current page link
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
      const linkPath = link.getAttribute('href');
      
      // Check if it's the home page
      if (currentPath === '/' && linkPath === '/') {
        link.classList.add('active');
      }
      // Check for other pages and account for subpages
      else if (currentPath !== '/' && linkPath !== '/' && currentPath.startsWith(linkPath)) {
        link.classList.add('active');
      }
    });
    
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Skip if it's just "#" (empty links)
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          e.preventDefault();
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for header
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Add animation for elements when they come into view
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length) {
      const animateOnScroll = function() {
        animatedElements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.2;
          
          if (elementPosition < screenPosition) {
            element.classList.add('visible');
          }
        });
      };
      
      window.addEventListener('scroll', animateOnScroll);
      animateOnScroll(); // Run once on load
    }
    
    // Handle form submissions with fetch API when available
    const ajaxForms = document.querySelectorAll('form[data-ajax="true"]');
    
    ajaxForms.forEach(form => {
      form.addEventListener('submit', function(e) {
        if (window.fetch) {
          e.preventDefault();
          
          const formData = new FormData(this);
          const action = this.getAttribute('action') || window.location.href;
          const method = this.getAttribute('method') || 'POST';
          
          fetch(action, {
            method: method,
            body: formData,
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            }
          })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              if (data.redirect) {
                window.location.href = data.redirect;
              } else if (data.message) {
                showFormMessage(form, data.message, 'success');
              }
            } else {
              showFormMessage(form, data.message || 'An error occurred', 'error');
            }
          })
          .catch(error => {
            console.error('Form submission error:', error);
            showFormMessage(form, 'An error occurred. Please try again.', 'error');
          });
        }
      });
    });
    
    function showFormMessage(form, message, type) {
      // Remove any existing messages
      const existingMessage = form.querySelector('.form-message');
      if (existingMessage) {
        existingMessage.remove();
      }
      
      // Create new message
      const messageElement = document.createElement('div');
      messageElement.className = `form-message ${type}`;
      messageElement.textContent = message;
      
      // Insert at top of form
      form.insertBefore(messageElement, form.firstChild);
      
      // Scroll to message
      messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });