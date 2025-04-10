document.addEventListener('DOMContentLoaded', function() {
    console.log('Operas listing page script loaded');
    
    // Initialize any operas page specific functionality
    const operaCards = document.querySelectorAll('.featured-item');
    
    if (operaCards.length) {
      console.log(`Found ${operaCards.length} opera cards to display`);
      
      // You could add animations or other enhancements here
      // For example, a simple fade-in effect:
      operaCards.forEach((card, index) => {
        setTimeout(() => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 100);
        }, index * 150); // Stagger the animations
      });
    }
  });