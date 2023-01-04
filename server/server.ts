import dotenv from "dotenv";
import express from "express";
import http from "http";
import OS from "os";

import mongoose, { ConnectOptions } from "mongoose";
import compression from "compression";
import cors from "cors";
import cookieParser from "cookie-parser";
import corsConfig from "./src/configs/cors.config.js";
import { globalErrorHandler, notFoundError } from "./src/utils/errorHandler.js";
import useWebsocketServer from "./src/websocket/useWebsocketServer.js";

// ======= import router =======
// import accountRouter from "./src/routers/account.router.js";
// import userRouter from "./src/routers/user.router.js";
// import contactRouter from "./src/routers/contact.router.js";
// import channelRouter from "./src/routers/channel.router.js";
// import messageRouter from "./src/routers/message.router.js";

// ======= configs =======
const app = express();
dotenv.config();
process.env.UV_THREADPOOL_SIZE = `${OS.cpus().length}`;

// ======= middlewares =======
app.use(cors(corsConfig));
app.use(cookieParser());
app.use(
  compression({
    level: 6, // 6 is best optimize, it'll help server reduce memory to handle compression
    threshold: 100 * 1000, // convert to byte => (100 byte * 1000 = 100 KB) (if Size in network > 100kb, compression will be implemented)
    // Just be filter
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        // don't compress responses with this request header
        return false;
      }
      // fallback to standard filter function
      return compression.filter(req, res);
    },
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======= database config =======
mongoose
  .connect(`${process.env.MONGODB_URI}`, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Failed Connection", err);
  });

// ======= api routes =======
app.get("/", (_, res) => {
  res.send("API is running");
});
// app.use("/api/auth", accountRouter);
// app.use("/api/user", userRouter);
// app.use("/api/contact", contactRouter);
// app.use("/api/channel", channelRouter);
// app.use("/api/message", messageRouter);

// ======= error handle =======
app.use(notFoundError);
app.use(globalErrorHandler);
// ======= listen =======
const port = process.env.PORT;
const server = http.createServer(app);

// ======= WebSocket Global Handler =======
useWebsocketServer(server);

server.listen(port, () => console.log(`App running on port ${port}`));
