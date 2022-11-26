import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, '../public/images/users'));
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname);
  },
});

const userUpload = multer({ storage: storage });

export default userUpload;
