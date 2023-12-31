const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const PORT = process.env.PORT || 3000;


const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// Connect to the MongoDB database
connectDB();

// Routes
app.use('/api/items', require("./routes/items"));
app.use('/api/users', require('./routes/user'));
app.use('/api/payment', cors(), require("./routes/payment"));

// Start the server
app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
});
