const express = require('express');
const { getFlights, getTrips } = require('../controllers/flightController');

const router = express.Router();

router.get('/:origin', getTrips);
router.get('/', getFlights);

module.exports = router;
