import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import corsConfig from './src/configs/cors.config.js';
import { globalErrorHandler, notFoundError } from './src/utils/errorHandler.js';

// ======= import router =======
import accountRouter from './src/routers/account.router.js';
import userRouter from './src/routers/user.router.js';
import contactRouter from './src/routers/contact.router.js';
import channelRouter from './src/routers/channel.router.js';

// ======= configs =======
const app = express();
dotenv.config();
// ======= middlewares =======
app.use(cors(corsConfig));
// app.use(cors());
app.use(cookieParser());
app.use(
  compression({
    level: 6,
    threshold: 100 * 1000, // charges in byte => (100 byte * 1000 = 100 KB)
    filter: (req, res) => {
      if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false;
      }
      // fallback to standard filter function
      return compression.filter(req, res);
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======= database config =======
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Failed Connection', err);
  });

// ======= api routes =======
app.get('/', (req, res) => {
  res.send('API is running');
});
app.use('/api/auth', accountRouter);
app.use('/api/user', userRouter);
app.use('/api/contact', contactRouter);
app.use('/api/channel', channelRouter);

// ======= error handle =======
app.use(notFoundError);
app.use(globalErrorHandler);
// ======= listen =======
const port = process.env.PORT;
app.listen(port, console.log(`App running on port ${port}...`));
