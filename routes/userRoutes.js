const express = require('express');

const { homepage, loginControl, contactControl, registerControl, createUser, loginUser, addControl, addContacts, addDisplay, editPage, editController} = require('../controllers/userController');
const router = express.Router();

router.route('/').get(homepage)
router.route('/login').get(loginControl).post(loginUser);

router.route('/contacts').get(contactControl)
router.route('/register').get(registerControl).post(createUser)
router.route('/add').get(addDisplay).post(addContacts)
router.route('/edit/:id').get(editPage).post(editController)


module.exports = router;