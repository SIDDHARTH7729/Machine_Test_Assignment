const express = require('express');
const router = express.Router();
const {upload, verifyToken} = require('../middlewares');
const {fileController} = require('../controllers');

// upload file and receive distributed data route
router.post('/upload',upload.single('file'),verifyToken,fileController.uploadAndDistributeData);

// fetch all data route
router.get('/fetchAllData',verifyToken,fileController.fetchAllData);

module.exports = router;