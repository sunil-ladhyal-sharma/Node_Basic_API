const express = require('express');
const router = express.Router();
const  userController = require('../controllers/user')

// Signup route
router.post("/signup", userController.user_signup);

// Login route 
router.post('/login', userController.user_login);

module.exports = router;