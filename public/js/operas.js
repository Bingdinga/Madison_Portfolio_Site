document.addEventListener('DOMContentLoaded', function() {
  console.log('Operas listing page script loaded');
  
  // Initialize any operas page specific functionality
  const operaCards = document.querySelectorAll('.featured-item');
  
  if (operaCards.length) {
    console.log(`Found ${operaCards.length} opera cards to display`);
    // Animation removed - cards will display normally without delay or effects
  }
});