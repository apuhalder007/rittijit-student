const express = require('express');
const router = express.Router();
const geocode = require('../controllers/geocode');

router.post('/', geocode.getGeocode);

module.exports = router;