const express = require('express');
const router = express.Router();
const conAdmin = require('../controllers/admin');

router.get('/', conAdmin.index);
router.post('/login', conAdmin.login);

module.exports = router;