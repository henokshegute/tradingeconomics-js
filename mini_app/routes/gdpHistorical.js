// routes/gdpHistorical.js
const express = require('express');
const router = express.Router();
const gdpController = require('../controllers/gdpController'); // Import the controller

// Route to get historical data and render the Pug template
router.get('/historical/:country/:indicator', async (req, res) => {
    try {
        // Call the controller to get the data
        const jsonResponse = await gdpController.getHistoricalData(req);  // Remove res parameter

        // Render the Pug template with the data
        res.render('gdp', { gdpData: jsonResponse });
    } catch (error) {
        res.status(500).json({ message: 'Error rendering data', error: error.message });
    }
});

module.exports = router;
