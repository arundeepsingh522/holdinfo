const express = require('express');
const { getData } = require('../controllers/userController');
const router = express.Router();

router.get('/getData',getData)

module.exports = router;