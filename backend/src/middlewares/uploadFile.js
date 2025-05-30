// This function acts as a middleware to handle file uploads using multer.
// It checks the file type and allows only CSV files to be uploaded.
// If the file type is not allowed, it returns an error message.
const multer = require('multer')
const path = require('path')

// Set up storage engine
const storage =  multer.memoryStorage();

const filterFile = async(req,file,cb) =>{

    // allowed types of files
    const allowedTypes = ['.csv'];
    const ext = path.extname(file.originalname);
    // check if the file type is allowed or not
    console.log("The file type is ",ext); // for error handling case
    if(!allowedTypes.includes(ext)){
       return cb(new Error('File type not allowed. Only CSV and Excel files are accepted.'));
    }
    cb(null,true);
}

// Set up multer upload
const upload = multer({storage,fileFilter:filterFile});

module.exports = upload