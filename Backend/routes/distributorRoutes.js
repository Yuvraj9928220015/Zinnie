const express = require('express');
const router = express.Router();
const { submitContactForm } = require('../controllers/distributorController');

router.post('/', submitContactForm);

module.exports = router;
