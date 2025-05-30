// This file defines the routes for user or admin authentication in the application.
const express =  require('express')
const router = express.Router()

// Importing the admin controller which contains the logic for handling authentication
const {adminController} = require('../controllers')

// Route to register a new user or admin
router.post('/register',adminController.register)

// Route to login the user or admin
router.post('/login',adminController.login)

// Route to logout the user or admin
router.get('/logout', adminController.logout)

module.exports = router