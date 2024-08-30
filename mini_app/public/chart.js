let chartInstance = null; // Global variable to hold the chart instance

async function fetchData(country1, country2) {
  try {
    const response = await fetch(
      `/api/compare-gdp-data/${country1}/${country2}`
    );
    const gdpData = await response.json();
    updateChart(gdpData, country1, country2);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function updateChart(gdpData, country1, country2) {
  const dataCountry1 = gdpData
    .filter((item) => item.Country.toLowerCase() === country1.toLowerCase())
    .map((item) => ({ date: item.DateTime, gdp: item.Value / 1000 })); // Convert to billions

  const dataCountry2 = gdpData
    .filter((item) => item.Country.toLowerCase() === country2.toLowerCase())
    .map((item) => ({ date: item.DateTime, gdp: item.Value / 1000 }));

  const labels = dataCountry1.map((item) => item.date);
  const gdpValuesCountry1 = dataCountry1.map((item) => item.gdp);
  const gdpValuesCountry2 = dataCountry2.map((item) => item.gdp);

  const ctx = document.getElementById("myChart").getContext("2d");

  // Destroy the previous chart instance if it exists
  if (chartInstance) {
    chartInstance.destroy();
  }

  // Create a new chart instance
  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: `${country1} GDP (Billions USD)`,
          data: gdpValuesCountry1,
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
          fill: false,
        },
        {
          label: `${country2} GDP (Billions USD)`,
          data: gdpValuesCountry2,
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 2,
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: "Year",
          },
        },
        y: {
          title: {
            display: true,
            text: "GDP (Billions USD)",
          },
          ticks: {
            callback: function (value) {
              return value + "B"; // Append 'B' for billions
            },
          },
          beginAtZero: false,
        },
      },
    },
  });
}

// Fetch initial data for default countries
fetchData("mexico", "sweden");

// Event listener for dropdown change
document.getElementById("compareButton").addEventListener("click", function () {
  const country1 = document.getElementById("country1").value;
  const country2 = document.getElementById("country2").value;
  fetchData(country1, country2);
});
