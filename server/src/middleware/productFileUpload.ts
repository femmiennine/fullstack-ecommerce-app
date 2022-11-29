import multer from 'multer';
import path from 'path';
import uuid4 from 'uuid4';

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, '../public/images'));
  },
  filename: function (req, file, callback) {
    const uniqueSuffix =
      Date.now() + '_' + uuid4() + path.extname(file.originalname);
    callback(null, file.fieldname + '_' + uniqueSuffix);
  },
});

const productUpload = multer({ storage: storage });

export default productUpload;
