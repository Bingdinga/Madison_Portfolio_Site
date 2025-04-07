exports.getContactPage = (req, res) => {
    res.render('contact', {
      title: 'Contact Madison',
      pageClass: 'contact-page',
      message: null,
      error: null
    });
  };
  
  exports.submitContactForm = (req, res) => {
    const { name, email, subject, message } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      return res.render('contact', {
        title: 'Contact Madison',
        pageClass: 'contact-page',
        error: 'Please fill out all required fields',
        message: null
      });
    }
    
    // In a real app, you would send an email here
    console.log('Contact form submission:', { name, email, subject, message });
    
    // For now, just acknowledge receipt
    res.render('contact', {
      title: 'Contact Madison',
      pageClass: 'contact-page',
      message: 'Your message has been received. Thank you for reaching out!',
      error: null
    });
  };