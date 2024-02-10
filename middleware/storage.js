const multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, "/download/");
    },
    filename: (req, file, callBack) => {
        callBack(null, 'alumniFeedback.csv');
    }
});

module.exports.upload = multer({
    storage: storage
});