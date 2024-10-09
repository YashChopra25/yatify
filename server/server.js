import express from "express";
import cors from "cors";
import env from "dotenv";
import DBConfig from "./DBConfig/DBConfig.js";
env.config();
const PORT = process.env.PORT || 8000;
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
cors(corsOptions);
const app = express();
await DBConfig();
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/test", (req, res) => {
  res.send({
    message: "Server is up and running",
    status: "success",
  });
});
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
