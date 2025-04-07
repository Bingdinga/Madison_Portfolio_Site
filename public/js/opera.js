document.addEventListener('DOMContentLoaded', function() {
  console.log('Opera slideshow script loaded');
  
  // Simple Gallery Slideshow
  const slideshow = document.getElementById('gallerySlideshow');
  
  // If no slideshow element exists, exit
  if (!slideshow) {
    console.log('No slideshow found');
    return;
  }
  
  const slides = slideshow.querySelectorAll('.gallery-slide');
  const dots = slideshow.querySelectorAll('.gallery-dot');
  const prevBtn = slideshow.querySelector('.gallery-prev');
  const nextBtn = slideshow.querySelector('.gallery-next');
  
  // If no slides, exit
  if (!slides.length) {
    console.log('No slides found');
    return;
  }
  
  console.log(`Found ${slides.length} slides`);
  
  let currentSlide = 0;
  let slideInterval;
  
  // Function to show a specific slide
  function showSlide(n) {
    // Calculate the correct slide index with wrapping
    currentSlide = (n + slides.length) % slides.length;
    
    // Update slide visibility
    slides.forEach((slide, i) => {
      if (i === currentSlide) {
        slide.classList.add('visible');
        slide.classList.remove('hidden');
      } else {
        slide.classList.add('hidden');
        slide.classList.remove('visible');
      }
    });
    
    // Update dot indicators
    dots.forEach((dot, i) => {
      if (i === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
    
    console.log(`Showing slide ${currentSlide + 1} of ${slides.length}`);
  }
  
  // Initialize slideshow
  showSlide(0);
  
  // Start automatic slideshow
  function startSlideshow() {
    slideInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 7000); // Change slide every 7 seconds
  }
  
  // Stop automatic slideshow
  function stopSlideshow() {
    clearInterval(slideInterval);
  }
  
  // Click handlers for previous and next buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      stopSlideshow();
      showSlide(currentSlide - 1);
      startSlideshow();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      stopSlideshow();
      showSlide(currentSlide + 1);
      startSlideshow();
    });
  }
  
  // Click handlers for the dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      stopSlideshow();
      showSlide(index);
      startSlideshow();
    });
  });
  
  // Pause slideshow when hovering over it
  slideshow.addEventListener('mouseenter', stopSlideshow);
  slideshow.addEventListener('mouseleave', startSlideshow);
  
  // Start the slideshow
  startSlideshow();
  
  // Add keyboard navigation
  document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
      stopSlideshow();
      showSlide(currentSlide - 1);
      startSlideshow();
    }
    else if (event.key === 'ArrowRight') {
      stopSlideshow();
      showSlide(currentSlide + 1);
      startSlideshow();
    }
  });
});