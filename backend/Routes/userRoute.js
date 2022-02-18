const express = require('express');
const { createUser, loginUser, logOutUser, forgotPassword } = require('../Controllers/userController');
const router = express.Router();

router.route('/register').post(createUser);
router.route('/logout').get(logOutUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/logout').get(logOutUser);


module.exports = router