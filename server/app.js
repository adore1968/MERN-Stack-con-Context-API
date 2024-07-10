import express from "express";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import cors from "cors";

import postsRoutes from "./routes/posts.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
);
app.use(morgan("dev"));

app.use("/api/posts", postsRoutes);

export default app;
