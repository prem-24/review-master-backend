const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import the cors middleware
const reviewRoutes = require('./router/router');
const dbConnection = require('./database/db');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all requests
app.use(cors());

app.get("/", (req, res) => {
  res.json({ msg: "Hello friend!" });
});

// Connect to the database
const startServer = async () => {
  try {
    await dbConnection();
    console.log('Database connected successfully');

    // Define routes
    app.use("/review", reviewRoutes);

    // Start the server
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1); // Exit the process if the database connection fails
  }
};

// Start the server after establishing the database connection
startServer();
