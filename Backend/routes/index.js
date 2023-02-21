const express = require('express');
const services = require('../services');
const router = express.Router();


router.get('/',services.temp);
router.post('/createuser',services.createUser);


module.exports = router;