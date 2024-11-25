const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = 3001;
const routes = require("./routes");

// MongoDB connection URI
const dbUri = process.env.MONGO_URI || "mongodb://mongo:27017/todos";

// Main function to initialize the application
async function main() {
  try {
    // Connect to MongoDB
    await mongoose.connect(dbUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connected to MongoDB!");

    // Initialize Express application
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use("/api", routes);

    // Start the server
    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
    });
  } catch (err) {
    console.error("Failed to initialize the application:", err);
  }
}

// Run the main function
main().catch((err) => console.error("Error in main:", err));
