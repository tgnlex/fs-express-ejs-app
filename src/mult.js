const multer = require('multer');

const filestore = multer({storage: 'storage/files'});
const upload = multer({dest: 'storage/uploads/'});

module.exports = {
    filestore,
    upload
};