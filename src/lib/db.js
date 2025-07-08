import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB IS CONNECTED");
    } catch (error) {
        console.log("CONNECTED FAILED TO DATABASE");
        process.exit(1);
    }
};
