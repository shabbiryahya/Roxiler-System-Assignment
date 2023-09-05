// backend/controllers/pieChartController.js
const Transaction = require('../models/Transaction');

// Generate data for the pie chart
const generatePieChartData = async (req, res) => {
  try {
    const { month } = req.query;

    // Aggregate and group data to count unique categories and their counts
    const pieChartData = await Transaction.aggregate([
      {
        $match: {
          dateOfSale: { $regex: new RegExp(month, 'i') },
        },
      },
      {
        $group: {
          _id: '$category',
          itemCount: { $sum: 1 },
        },
      },
      {
        $sort: { itemCount: -1 }, // Sort by itemCount in descending order
      },
    ]);

    res.status(200).json(pieChartData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to generate pie chart data' });
  }
};

module.exports = {
  generatePieChartData,
};
