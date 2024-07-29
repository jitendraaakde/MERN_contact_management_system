const express = require('express');

const { homepage, loginControl, contactControl, registerControl, createUser, loginUser } = require('../controllers/userController');
const router = express.Router();

router.route('/').get(homepage)

router.route('/login').get(loginControl).post(loginUser);

router.route('/contacts').get(contactControl)
router.route('/register').get(registerControl).post(createUser)


module.exports = router;