const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

// Registration route
router.post('/registration', userController.register);

// Login route
router.post('/login', userController.login);

// Logout route
router.post('/logout', authMiddleware, (req, res) => {
  // Implement your logout logic here
});

module.exports = router;