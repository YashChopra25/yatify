import mongoose from "mongoose";

const DBConfig = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        // await mongoose.connect("mongodb://mongodb:27017/");
        console.log("Database connected successfully");
    } catch (error) {
        console.error(error);
    }
};

export default DBConfig;