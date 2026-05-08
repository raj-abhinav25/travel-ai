const express = require('express');
const router = express.Router();
const { saveUser, getUser } = require('../controllers/authController');

router.post('/user', saveUser);
router.get('/user/:userId', getUser);

module.exports = router;