document.addEventListener('DOMContentLoaded', function() {
    // Simple gallery functionality
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    if (galleryItems.length) {
      galleryItems.forEach(item => {
        item.addEventListener('click', function() {
          // Create lightbox
          const lightbox = document.createElement('div');
          lightbox.className = 'lightbox';
          
          const lightboxImg = document.createElement('img');
          lightboxImg.src = this.src;
          
          const closeBtn = document.createElement('button');
          closeBtn.className = 'lightbox-close';
          closeBtn.innerHTML = '&times;';
          closeBtn.setAttribute('aria-label', 'Close lightbox');
          
          lightbox.appendChild(lightboxImg);
          lightbox.appendChild(closeBtn);
          document.body.appendChild(lightbox);
          
          // Prevent scrolling
          document.body.style.overflow = 'hidden';
          
          // Close lightbox
          closeBtn.addEventListener('click', closeLightbox);
          lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
              closeLightbox();
            }
          });
          
          // Close with escape key
          document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
              closeLightbox();
            }
          });
          
          function closeLightbox() {
            document.body.removeChild(lightbox);
            document.body.style.overflow = '';
          }
        });
      });
    }
  });