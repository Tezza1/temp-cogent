// upload.js
const multer = require('multer');

const upload = multer({
    limits: {
        fileSize: 4*1024*1024,
    },
    fileFilter: function(req, file, cb) {
        sanitizeFile(file,cb);
    }
});

function sanitizeFile(file, cb) {
    // Define the allowed extensions
    let fileExts = ['png', 'jpg', 'jpeg', 'gif']

    // Check allowed extensions
    let isAllowedExt = fileExts.includes(file.originalname.split('.')[1].toLowerCase());

    // Mime type must be an image
    let isAllowedMimeType = file.mimetype.startsWith("image/");

    if(isAllowedExt && isAllowedMimeType) {
        return cb(null, true);
    } else {
        // Pass error message to callback, which can be display in the front end
        cb('Error: File type not allowed');
    }
}

module.exports = upload;