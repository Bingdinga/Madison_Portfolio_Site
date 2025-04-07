const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const aboutController = require('../controllers/aboutController');
const operasController = require('../controllers/operasController');
const contactController = require('../controllers/contactController');

// Home routes
router.get('/', homeController.getHomePage);

// About routes
router.get('/about', aboutController.getAboutPage);

// Opera routes
router.get('/operas', operasController.getAllOperas);
router.get('/operas/:id', operasController.getOperaDetails);

// Contact routes
router.get('/contact', contactController.getContactPage);
router.post('/contact', contactController.submitContactForm);

module.exports = router;