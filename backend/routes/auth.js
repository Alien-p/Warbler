const express = require('express');
const router = express.Router();
const {signup, signin, getUser} = require('../handlers/auth');

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/users', getUser);

module.exports = router;