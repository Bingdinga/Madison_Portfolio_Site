document.addEventListener('DOMContentLoaded', function() {
    // Add animation to opera cards when they come into view
    const operaCards = document.querySelectorAll('.opera-card');
    
    if (operaCards.length) {
      // Simple animation on scroll
      const animateOnScroll = function() {
        operaCards.forEach(card => {
          const cardPosition = card.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.3;
          
          if (cardPosition < screenPosition) {
            card.classList.add('visible');
          }
        });
      };
      
      // Add visible class for initial animation
      operaCards.forEach(card => {
        card.classList.add('animate');
      });
      
      window.addEventListener('scroll', animateOnScroll);
      animateOnScroll(); // Run once on load
    }
  });