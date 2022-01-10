import { cloudinary } from '../configs/cloudinary.config.js';

export const uploadStreamAsync = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ ...folder, transformation: [{ quality: '80', format: 'auto' }] }, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      })
      .end(buffer);
  });
};

// transformation: optimize before uploading
