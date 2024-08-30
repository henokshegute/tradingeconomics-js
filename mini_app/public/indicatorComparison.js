document.getElementById("compareButton").addEventListener("click", async () => {
  const country = document.getElementById("country").value;
  const indicator1 = document.getElementById("indicator1").value;
  const indicator2 = document.getElementById("indicator2").value;

  try {
    const response = await fetch(
      `/api/indicator-data-json/${country}/${indicator1}/${indicator2}`
    );
    const data = await response.json();

    const indicator1Values = [];
    const indicator2Values = [];

    // Prepare data for scatter plot
    data.forEach((item) => {
      if (item.Category.toLowerCase() === indicator1.toLowerCase()) {
        indicator1Values.push({
          x: item.DateTime,
          y: item.Value, // X-axis will be Indicator 1 (e.g., GDP)
        });
      } else if (item.Category.toLowerCase() === indicator2.toLowerCase()) {
        indicator2Values.push({
          x: item.DateTime,
          y: item.Value, // Y-axis will be Indicator 2 (e.g., Population)
        });
      }
    });

    // Prepare scatter data format
    const scatterData = indicator1Values.map((item, index) => ({
      x: item.y, // Indicator 1 as X
      y: indicator2Values[index] ? indicator2Values[index].y : 0, // Indicator 2 as Y
    }));

    // Check if the chart exists before destroying
    if (window.myChart && typeof window.myChart.destroy === "function") {
      window.myChart.destroy(); // Destroy the previous chart instance if it exists
    }

    const ctx = document.getElementById("myChart").getContext("2d");

    // Create a new chart instance
    window.myChart = new Chart(ctx, {
      type: "scatter", // Scatter plot
      data: {
        datasets: [
          {
            label: `${indicator1} vs ${indicator2}`,
            data: scatterData,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: indicator1,
            },
          },
          y: {
            title: {
              display: true,
              text: indicator2,
            },
          },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching indicator data: ", error);
  }
});
