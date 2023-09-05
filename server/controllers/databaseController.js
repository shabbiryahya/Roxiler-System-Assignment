// backend/controllers/databaseController.js
const axios = require('axios');
const Transaction = require('../models/Transaction');

// Initialize the database by fetching data from the third-party API and saving it to the Transaction collection.
const initializeDatabase = async (req, res) => {
  try {
    // Fetch JSON data from the third-party API
    const response = await axios.get(
      'https://s3.amazonaws.com/roxiler.com/product_transaction.json'
    );

    // Store the fetched data in MongoDB (Transaction collection)
    await Transaction.insertMany(response.data);

    res.status(200).json({ message: 'Database initialized successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to initialize the database' });
  }
};

module.exports = {
  initializeDatabase,
};
