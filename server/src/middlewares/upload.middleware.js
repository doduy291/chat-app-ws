import multer from 'multer';

// The memory storage engine stores the files in memory as Buffer objects
const storage = multer.memoryStorage();

export const upload = multer({ storage });
