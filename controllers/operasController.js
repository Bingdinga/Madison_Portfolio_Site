// In controllers/operasController.js
const fs = require('fs');
const path = require('path');

// Read opera data from JSON file
const getOperaData = () => {
  const filePath = path.join(__dirname, '../data/operas.json');
  const fileData = fs.readFileSync(filePath, 'utf8');
  const operas = JSON.parse(fileData);
  
  // Enhance opera data with dynamic image loading
  operas.forEach(opera => {
    const operaFolderName = opera.id.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('_');
    
    const operaImgPath = path.join(__dirname, '../public/img/operas', operaFolderName);
    
    // Check if directory exists
    if (fs.existsSync(operaImgPath)) {
      // Get all image files from the directory
      const imageFiles = fs.readdirSync(operaImgPath)
        .filter(file => {
          const ext = path.extname(file).toLowerCase();
          return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
        })
        .map(file => `/img/operas/${operaFolderName}/${file}`);
      
      // Find main image (usually has "Main" in the filename)
      const mainImage = imageFiles.find(file => file.includes('Main')) || imageFiles[0];
      
      // Update opera object with dynamic images
      opera.featuredImage = mainImage;
      opera.gallery = imageFiles.filter(img => img !== mainImage);
      
      // If main image is first in gallery, move it to featuredImage
      if (!mainImage && imageFiles.length > 0) {
        opera.featuredImage = imageFiles[0];
        opera.gallery = imageFiles.slice(1);
      }
    }
  });
  
  return operas;
};

// The rest of the controller remains the same
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