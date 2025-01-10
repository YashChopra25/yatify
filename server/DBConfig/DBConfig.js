import e from "express";
import mongoose from "mongoose";

const DBConfig = async () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then((data) => {
      console.log("Database connected successfully", data.connection.host);
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
  // await mongoose.connect("mongodb://mongodb:27017/");
};

export default DBConfig;
