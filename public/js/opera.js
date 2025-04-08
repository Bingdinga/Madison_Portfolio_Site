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
  
  // Click handlers for previous and next buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide(currentSlide - 1);
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showSlide(currentSlide + 1);
    });
  }
  
  // Click handlers for the dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
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