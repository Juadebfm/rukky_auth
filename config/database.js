// Connection to mongodb happens in this file
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Mongo DB connect: ${conn.connection.host}`);
  } catch (error) {
    console.log("Database connect error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
