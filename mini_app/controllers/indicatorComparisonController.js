require("dotenv").config();
const axios = require("axios");

async function getIndicatorsData(req) {
  const api_key = process.env.API_KEY; // Ensure this is correctly set
  const base_url = process.env.BASE_URL; // Base URL from the .env file
  const { country, indicator1, indicator2 } = req.params;

  try {
    const url = `${base_url}/country/${country}/indicator/${indicator1},${indicator2}?c=${api_key}&f=json`;

    const response = await axios.get(url);

    // Filter data for the requested indicators
    const data = response.data.filter((item) =>
      [indicator1.toLowerCase(), indicator2.toLowerCase()].includes(
        item.Category.toLowerCase()
      )
    );

    return data;
  } catch (error) {
    console.error(`Error fetching indicator data: ${error.message}`);
    throw new Error(`Error fetching indicator data: ${error.message}`);
  }
}

module.exports = {
  getIndicatorsData,
};
