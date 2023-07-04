// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#financials

// Package Installation: npm install tradingeconomics
const te = require('tradingeconomics')

const FinancialsExample = async () => {
  try {
    // Login with client key or leave it blank and a sample of data will be provided, you can get your free key here: http://developer.tradingeconomics.com
    await te.login();

    // Gets a list of financials companies
    const data = await te.getFinancialsData()

    // Get a list of financials companies by country/countries or symbol/symbols
    const data1 = await te.getFinancialsData(country = 'united states')
    const data2 = await te.getFinancialsData(symbol = 'aapl:us')
    
    // Get financials historical data by symbol and category
    const data3 = await te.getFinancialsHistorical(symbol = 'aapl:us', category = 'assets')

    console.log(data); //Place one of the variables to test
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

FinancialsExample();
