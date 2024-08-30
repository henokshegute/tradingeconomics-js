const express = require("express");
const path = require("path");
const router = express.Router();
const indicatorComparisonController = require("../controllers/indicatorComparisonController");

// Serve the HTML file for the indicator comparison
router.get("/compare-indicators", (req, res) => {
  // Serve the HTML page with the dropdowns and chart
  res.sendFile(path.join(__dirname, "../views/indicatorComparison.html"));
});

// Endpoint to get indicator data as JSON based on selected country and indicators
router.get(
  "/indicator-data-json/:country/:indicator1/:indicator2",
  async (req, res) => {
    try {
      const indicatorsData =
        await indicatorComparisonController.getIndicatorsData(req);
      res.json(indicatorsData); // Send the data as JSON
    } catch (error) {
      res.status(500).json({
        message: "Error fetching indicator data",
        error: error.message,
      });
    }
  }
);

module.exports = router;
