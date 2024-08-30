const express = require("express");
const path = require("path");
const app = express();

// Import the routes

const gdpComparison = require("./routes/gdpComparison");
const indicatorComparison = require("./routes/indicatorComparison");

// Middleware and other configurations
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from public directory

// Use the API routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.use("/api", gdpComparison);
app.use("/api", indicatorComparison); // Add the new route here

// Route to serve the indicator comparison page
app.get("/indicator-comparison", (req, res) => {
  res.sendFile(path.join(__dirname, "views/indicatorComparison.html"));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
