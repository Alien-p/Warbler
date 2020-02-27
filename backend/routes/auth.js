const express = require('express');
const router = express.Router();
const {signup, getUser} = require('../handlers/auth');

router.post('/signup', signup);
router.get('/users', getUser);

module.exports = router;