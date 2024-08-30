// controllers/gdpComparisonController.js
require("dotenv").config();
const axios = require("axios");
const dayjs = require("dayjs"); // Use for formatting dates

async function compareGDP(req) {
  const api_key = process.env.API_KEY;
  const base_url = process.env.BASE_URL;
  const { country1, country2 } = req.params;

  const currentYear = new Date().getFullYear();
  const startDate = `${currentYear - 5}-01-01`;
  const endDate = `${currentYear}-12-31`;

  try {
    const url = `${base_url}/country/${country1},${country2}/indicator/gdp/${startDate}/${endDate}?c=${api_key}&f=json`;
    const response = await axios.get(url);

    // Filter and format the data
    const gdpData = response.data
      .filter(
        (item) =>
          item.Country !==
          "Free accounts have access to the following countries: Mexico, New Zealand, Sweden, Thailand. For more, contact us at support@tradingeconomics.com."
      )
      .map((item) => ({
        Country: item.Country,
        DateTime: dayjs(item.DateTime).format("YYYY"), // Format date as 'YYYY'
        Value: item.Value,
      }));

    return gdpData;
  } catch (error) {
    throw new Error(`Error fetching GDP data: ${error.message}`);
  }
}

module.exports = {
  compareGDP,
};
