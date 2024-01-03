import multer from 'multer';

export const filestore = multer({storage: 'storage/files'});
export const upload = multer({dest: 'storage/uploads/'});
export const avatar = multer( {dest: 'storage/avatar'})
