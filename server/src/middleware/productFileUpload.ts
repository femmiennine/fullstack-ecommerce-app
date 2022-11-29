import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/images');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname);
  },
});

const productUpload = multer({ storage: storage });

export default productUpload;
