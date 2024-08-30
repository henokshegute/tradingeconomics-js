// controllers/gdpController.js
require('dotenv').config();
const axios = require('axios');

async function getHistoricalData(req) {
    const api_key = process.env.API_KEY;
    const base_url = process.env.BASE_URL;
    const country = req.params.country;
    const indicator = req.params.indicator;

    try {
        // Construct the URL with &f=json
        const url = `${base_url}/country/${country}/indicator/${indicator}?c=${api_key}&f=json`;

        // Fetch data using axios
        const response = await axios.get(url);

        // Return the fetched JSON data
        return response.data;  
    } catch (error) {
        // Throw error so it can be caught in the route
        throw new Error(`Error fetching data: ${error.message}`);
    }
}

module.exports = {
    getHistoricalData,
};
