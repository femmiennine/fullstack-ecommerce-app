import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    callback: DestinationCallback,
  ) {
    callback(null, path.join(__dirname, '../public/images/products'));
  },
  filename: function (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback,
  ) {
    callback(null, Date.now() + '-' + file.originalname);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png'
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;
