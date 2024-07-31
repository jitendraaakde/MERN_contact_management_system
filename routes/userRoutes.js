const express = require('express');

const { homepage, loginControl, contactControl, registerControl, createUser, loginUser, addContacts, addDisplay, editPage, editController,deleteContacts} = require('../controllers/userController');
const router = express.Router();
router.route('/').get(homepage)
router.route('/login').get(loginControl).post(loginUser);
router.route('/contacts').get(contactControl)
router.route('/register').get(registerControl).post(createUser)
router.route('/add').get(addDisplay).post(addContacts)
router.route('/edit').get(editPage).post(editController)
router.route('/delete').post(deleteContacts)
module.exports = router;