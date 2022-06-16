const multer = require('multer');


function uploadFile() {
    const storage = multer.diskStorage({
        destination: './public/storage',
        filename: function(req, file, cb) {
            let extension = file.originalname.slice(file.originalname.lastIndexOf('.'));
            cb(null, Date.now() + file.originalname);

        }

    });

    const upload = multer({ storage });
    return upload;
}

module.exports = uploadFile;