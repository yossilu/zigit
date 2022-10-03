const express = require('express');
const router = express.Router();
const fileUpload = require("express-fileupload");
const projectController = require('../../controllers/projectController');


router.post('/', projectController.handleProjectCreation);

router.post('/project-comment', projectController.writeComment);

router.get('/getAll', projectController.getProjectsNames);

router.post('/file-upload', 
fileUpload({ 
    createParentPath: true, 
    useTempFiles : true,
    tempFileDir : '/tmp/'}), 
projectController.uploadFile);

module.exports = router;