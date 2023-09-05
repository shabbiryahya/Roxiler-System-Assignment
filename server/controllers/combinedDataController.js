// backend/controllers/combinedDataController.js
const axios = require('axios');

// Function to fetch data from multiple APIs and combine responses
const fetchCombinedData = async (req, res) => {
  try {
    const { month } = req.query;

    // Define the URLs of the APIs to fetch data from
    const apiEndpoints = [
      `/api/transactions?month=${month}`,
      `/api/statistics?month=${month}`,
      `/api/bar-chart?month=${month}`,
      `/api/pie-chart?month=${month}`,
    ];

    // Array to store the responses from the APIs
    const responses = [];

    // Fetch data from each API in parallel
    await Promise.all(
      apiEndpoints.map(async (endpoint) => {
        const response = await axios.get(`http://localhost:5000${endpoint}`);
        responses.push(response.data);
      })
    );

    // Combine the responses into a single object
    const combinedData = {
      transactions: responses[0],
      statistics: responses[1],
      barChart: responses[2],
      pieChart: responses[3],
    };

    res.status(200).json(combinedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch combined data' });
  }
};

module.exports = {
  fetchCombinedData,
};
