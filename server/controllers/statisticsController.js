// backend/controllers/statisticsController.js
const Transaction = require('../models/Transaction');

// Calculate and return statistics for the selected month
const getStatistics = async (req, res) => {
  try {
    const { month } = req.query;

    // Calculate total sale amount for the selected month
    const totalSaleAmount = await Transaction.aggregate([
      {
        $match: {
          dateOfSale: { $regex: new RegExp(month, 'i') },
          sold: true,
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$price' },
        },
      },
    ]);

    // Calculate total number of sold items for the selected month
    const totalSoldItems = await Transaction.countDocuments({
      dateOfSale: { $regex: new RegExp(month, 'i') },
      sold: true,
    });

    // Calculate total number of not sold items for the selected month
    const totalNotSoldItems = await Transaction.countDocuments({
      dateOfSale: { $regex: new RegExp(month, 'i') },
      sold: false,
    });

    res.status(200).json({
      totalSaleAmount: totalSaleAmount[0]?.totalAmount || 0,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch statistics' });
  }
};

module.exports = {
  getStatistics,
};
