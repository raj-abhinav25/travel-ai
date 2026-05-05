const express = require('express');
const router = express.Router();
const { save, getUserTrips, getTrip, removeTri } = require('../controllers/tripController');

router.post('/save', save);
router.get('/user/:userId', getUserTrips);
router.get('/:tripId', getTrip);
router.delete('/delete', removeTri);

module.exports = router;