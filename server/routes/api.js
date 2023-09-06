// backend/routes/api.js
const express = require('express');
const router = express.Router();
const databaseController = require('../controllers/databaseController');
const transactionsController = require('../controllers/transactionsController');
const statisticsController = require('../controllers/statisticsController');
const barChartController = require('../controllers/barChartController');
const pieChartController = require('../controllers/pieChartController');
const combinedDataController = require('../controllers/combinedDataController');
const Transaction = require('../models/Transaction');


// Initialize the database
router.get('/initialize-database', databaseController.initializeDatabase);
router.get('/transactions', transactionsController.getAllTransactions);
router.get('/statistics', statisticsController.getStatistics);
router.get('/bar-chart', barChartController.generateBarChartData);
router.get('/pie-chart', pieChartController.generatePieChartData);
router.get('/combined-data', combinedDataController.fetchCombinedData);
router.post('/add-transaction', async (req, res) => {
    try {
      const {
        title,
        description,
        price,
        dateOfSale,
        category,
        sold,
      } = req.body;
  
      const transaction = new Transaction({
        title,
        description,
        price,
        dateOfSale,
        category,
        sold,
      });
  
      await transaction.save();
      res.status(201).json(transaction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to add transaction' });
    }
  });
  

module.exports = router;
