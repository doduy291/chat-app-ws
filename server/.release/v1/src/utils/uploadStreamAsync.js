import cloudinary from '../configs/cloudinary.config.js';

export const folderName = { image: 'chat_app_ws/chat-img', application: 'chat_app_ws/chat-file' };

export const uploadStreamAsync = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          ...folder,
          transformation: [{ quality: '80', format: 'auto' }, { flags: 'lossy' }],
        },
        (error, result) => {
          if (error) {
            console.log(error);
            return reject(error);
          }
          console.log(result);
          resolve(result);
        }
      )
      .end(buffer);
  });
};
// transformation: optimize before uploading
