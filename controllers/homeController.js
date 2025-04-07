exports.getHomePage = (req, res) => {
    res.render('home', {
      title: 'Madison - Opera Director',
      pageClass: 'home-page'
    });
  };