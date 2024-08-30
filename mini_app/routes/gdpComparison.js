const express = require("express");
const path = require("path");
const router = express.Router();
const gdpComparisonController = require("../controllers/gdpComparisonController");

// Serve the HTML file for GDP comparison
router.get("/compare-gdp-data", (req, res) => {
  // Serve the HTML page with the dropdowns and chart
  res.sendFile(path.join(__dirname, "../views/gdpComparison.html"));
});

// Endpoint to get GDP data as JSON based on selected countries
router.get("/compare-gdp-data/:country1/:country2", async (req, res) => {
  try {
    // Get the GDP comparison data from the controller
    const gdpData = await gdpComparisonController.compareGDP(req);
    res.json(gdpData); // Send the GDP data as JSON
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching GDP data", error: error.message });
  }
});

module.exports = router;
