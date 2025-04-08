document.addEventListener('DOMContentLoaded', function() {
  // Simple Gallery Slideshow
  const slideshow = document.getElementById('gallerySlideshow');
  
  // If no slideshow element exists, exit
  if (!slideshow) return;
  
  const slides = slideshow.querySelectorAll('.gallery-slide');
  const dots = slideshow.querySelectorAll('.gallery-dot');
  const prevBtn = slideshow.querySelector('.gallery-prev');
  const nextBtn = slideshow.querySelector('.gallery-next');
  
  // If no slides, exit
  if (!slides.length) return;
  
  let currentSlide = 0;
  let slideInterval;
  
  // Function to show a specific slide
  function showSlide(n) {
    // Hide all slides
    slides.forEach(slide => slide.style.display = 'none');
    
    // Remove active class from all dots
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Calculate the correct slide index with wrapping
    currentSlide = (n + slides.length) % slides.length;
    
    // Show the current slide
    slides[currentSlide].style.display = 'block';
    
    // Add active class to current dot
    dots[currentSlide].classList.add('active');
  }
  
  // Initialize slideshow
  showSlide(0);
  
  // Click handlers for previous and next buttons
  prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
  });
  
  nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
  });
  
  // Click handlers for the dots
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      showSlide(parseInt(dot.getAttribute('data-slide')));
    });
  });
  
  // Add keyboard navigation
  document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
      showSlide(currentSlide - 1);
    }
    else if (event.key === 'ArrowRight') {
      showSlide(currentSlide + 1);
    }
  });
});