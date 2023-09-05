// backend/controllers/barChartController.js
const Transaction = require('../models/Transaction');

// Generate data for the bar chart
const generateBarChartData = async (req, res) => {
  try {
    const { month } = req.query;

    // Define the price ranges
    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Infinity }, // Items with prices above 900
    ];

    const barChartData = [];

    // Calculate the item count in each price range
    for (const range of priceRanges) {
      const itemCount = await Transaction.countDocuments({
        dateOfSale: { $regex: new RegExp(month, 'i') },
        price: { $gte: range.min, $lte: range.max },
      });
      barChartData.push({
        priceRange: `${range.min} - ${range.max}`,
        itemCount,
      });
    }

    res.status(200).json(barChartData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to generate bar chart data' });
  }
};

module.exports = {
  generateBarChartData,
};
