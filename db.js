const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("Db connected successfully");
    } catch (error) {
        console.error("ERROR connecting db" + error.message);
    }
};

module.exports = connectDB;
