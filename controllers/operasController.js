const fs = require('fs');
const path = require('path');

// Read opera data from JSON file
const getOperaData = () => {
  const filePath = path.join(__dirname, '../data/operas.json');
  const fileData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileData);
};

exports.getAllOperas = (req, res) => {
  try {
    const operas = getOperaData();
    res.render('operas', {
      title: 'Directed Operas',
      pageClass: 'operas-page',
      operas
    });
  } catch (error) {
    console.error('Error fetching operas:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Could not load opera data'
    });
  }
};

exports.getOperaDetails = (req, res) => {
  try {
    const operas = getOperaData();
    const opera = operas.find(o => o.id === req.params.id);
    
    if (!opera) {
      return res.status(404).render('error', {
        title: 'Opera Not Found',
        message: 'The opera you are looking for does not exist'
      });
    }
    
    res.render('opera-detail', {
      title: `${opera.title} | Madison's Portfolio`,
      pageClass: 'opera-detail-page',
      opera
    });
  } catch (error) {
    console.error('Error fetching opera details:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Could not load opera details'
    });
  }
};