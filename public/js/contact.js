document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(event) {
        let isValid = true;
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        // Remove existing error messages
        const existingErrors = contactForm.querySelectorAll('.error-message');
        existingErrors.forEach(error => error.remove());
        
        // Validate name
        if (!nameInput.value.trim()) {
          showError(nameInput, 'Please enter your name');
          isValid = false;
        }
        
        // Validate email
        if (!emailInput.value.trim()) {
          showError(emailInput, 'Please enter your email address');
          isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
          showError(emailInput, 'Please enter a valid email address');
          isValid = false;
        }
        
        // Validate message
        if (!messageInput.value.trim()) {
          showError(messageInput, 'Please enter your message');
          isValid = false;
        }
        
        if (!isValid) {
          event.preventDefault();
        }
      });
      
      function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        formGroup.appendChild(errorElement);
        input.classList.add('error');
      }
      
      function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }
    }
  });