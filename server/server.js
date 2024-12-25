import express from "express";
import cors from "cors";
import env from "dotenv";
import DBConfig from "./DBConfig/DBConfig.js";
import cookieParser from "cookie-parser";
env.config();
const app = express();
const PORT = process.env.PORT || 8000;
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
cors(corsOptions);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
DBConfig();
app.get("/", (req, res) => {
  res.send("Hello yatify!,users are welcome");
});

app.get("/test", (req, res) => {
  res.send({
    message: "Server is up and running,Working fine....",
    status: "success",
  });
});

// This is an auth middleware that checks if the user is logged in or not
import HandleAuthRoutes from "./routes/HandleAuthRoutes.js";
import { AuthTokenMiddleware } from "./middlewares/AuthMiddleware.js";
import { AllRouteHandler, ErrorHandler } from "./utils/ErrorHandler.js";
app.use("/api/v1/auth/users", HandleAuthRoutes);

import MessageRoutes from "./routes/MessageRoutes.js";
import { messageMiddleware } from "./middlewares/MessageMiddleware.js";
app.use(
  "/api/v1/messages",
  AuthTokenMiddleware,
  messageMiddleware,
  MessageRoutes
);

app.use("*", AllRouteHandler); //used for the all the not found routes
app.use(ErrorHandler); //used for the all the error routes
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
