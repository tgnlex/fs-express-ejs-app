const multer = require('multer');

const filestore = multer({storage: 'storage/files'});
const upload = multer({dest: 'storage/uploads/'});
const avatar = multer( {dest: 'storage/avatar'})
module.exports = {
    filestore,
    upload,
    avatar
};