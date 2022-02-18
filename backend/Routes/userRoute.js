const express = require('express');
const { createUser, loginUser, logOutUser, forgotPassword, resetPassword, getUserDetails } = require('../Controllers/userController');
const { isAuthUser } = require('../Middleware/auth');
const router = express.Router();

router.route('/register').post(createUser);
router.route('/login').post(loginUser)
router.route('/password/reset/:token').put(resetPassword);
router.route('/password/forgot').post(forgotPassword);
router.route('/logout').get(logOutUser);
router.route('/me').get(isAuthUser,getUserDetails);



module.exports = router