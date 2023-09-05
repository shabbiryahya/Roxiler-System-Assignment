// backend/controllers/transactionsController.js
const Transaction = require('../models/Transaction');

// Get all transactions with pagination and search
const getAllTransactions = async (req, res) => {
  try {
    const { month, page = 1, perPage = 10, search = '' } = req.query;

    // Build the query to filter by month and search parameters
    const query = {
      dateOfSale: { $regex: new RegExp(month, 'i') }, // Case-insensitive search by month
      $or: [
        { title: { $regex: new RegExp(search, 'i') } }, // Case-insensitive search by title
        { description: { $regex: new RegExp(search, 'i') } }, // Case-insensitive search by description
        { price: { $regex: new RegExp(search, 'i') } }, // Case-insensitive search by price
      ],
    };

    // Calculate skip and limit values for pagination
    const skip = (page - 1) * perPage;
    const limit = parseInt(perPage);

    // Fetch transactions based on query, skip, and limit
    const transactions = await Transaction.find(query)
      .skip(skip)
      .limit(limit)
      .exec();

    // Count the total number of transactions for pagination
    const totalTransactions = await Transaction.countDocuments(query);

    res.status(200).json({
      transactions,
      currentPage: page,
      totalPages: Math.ceil(totalTransactions / perPage),
      totalResults: totalTransactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch transactions' });
  }
};

module.exports = {
  getAllTransactions,
};
