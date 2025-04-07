exports.getAboutPage = (req, res) => {
    res.render('about', {
      title: 'About Madison',
      pageClass: 'about-page'
    });
  };