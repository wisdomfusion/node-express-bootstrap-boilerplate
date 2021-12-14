const express = require('express');
const router = express.Router();

const ctrlHome = require('../controllers/home.controller');

router.get('/', ctrlHome.index);

module.exports = router;
