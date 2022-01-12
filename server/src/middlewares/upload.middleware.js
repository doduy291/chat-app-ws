import multer from 'multer';

// The memory storage engine stores the files in memory as Buffer objects
const storage = multer.memoryStorage();
// const storage = multer.diskStorage({}); // use diskStorage to get path direction

export const upload = multer({ storage });
