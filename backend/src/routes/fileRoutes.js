// This file defines the routes for handling files cases of the frontend application.
// This includes uploading files and fetching all distributed data.
const express = require('express');
const router = express.Router();

// Importing the middleware for file upload and token verification
const {upload, verifyToken} = require('../middlewares');

// Importing the file controller which contains the logic for handling file operations
const {fileController} = require('../controllers');

// upload file and receive distributed data route
router.post('/upload',upload.single('file'),verifyToken,fileController.uploadAndDistributeData);

// fetch all data route
router.get('/fetchAllData',verifyToken,fileController.fetchAllData);

module.exports = router;