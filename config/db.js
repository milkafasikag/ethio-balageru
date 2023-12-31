const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
          //serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      });
      console.log("Mongo DB Connected: ", conn.connection.host);
  } catch (err) {
      console.error("Error connecting to MongoDB:", err.message);
      process.exit(1);
  }
};


module.exports = connectDB;