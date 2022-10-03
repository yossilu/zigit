const Project = require('../model/Project');
const aws = require("aws-sdk");
const fs = require('fs');

aws.config.update({
    secretAccessKey: 'vVX6UaqtDrHHvN1y4dX3z5KL4roVd99DcHCa5gcT',
    accessKeyId: 'AKIA5ZM4MUJ6DX7AORJL',
    region: 'eu-west-1'
})

const s3 = new aws.S3();

const handleProjectCreation = async (req, res) => {
    const cookies = req.cookies;
    const { name, address, status, endDate } = req.body;
    if (!cookies?.jwt) return res.sendStatus(204); //No content

    const doesExists = await Project.doesExists(name);
    if(doesExists){
        res.status(204).json({ message: 'project exists' })
    } else {
        const addProject = await Project.create({ name, address, status, endDate })
        res.status(200).json({ message: 'project created' })
    }
}

const uploadFile = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const projectName = Object.keys(req.files)[0];
    const file = req.files;
    const fileStream = fs.createReadStream(file[projectName].tempFilePath)
    const s3Image = await s3.upload({Bucket: 'zigit', Body: fileStream, Key: projectName}).promise();
    await Project.addImageToProject(s3Image.Location, projectName);
    res.status(200).json({ message: 'image saved to s3' })
}

const writeComment = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    res.status(200).json({ message: 'image saved to s3' })
}

const getProjectsNames = async(req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const nameArr = await Project.getAllProjects();
    res.status(200).json({ names: nameArr })
}



module.exports = { handleProjectCreation, uploadFile, writeComment, getProjectsNames }