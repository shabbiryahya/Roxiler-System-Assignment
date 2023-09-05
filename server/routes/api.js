// backend/routes/api.js
const express = require('express');
const router = express.Router();
const databaseController = require('../controllers/databaseController');
const transactionsController = require('../controllers/transactionsController');
const statisticsController = require('../controllers/statisticsController');
const barChartController = require('../controllers/barChartController');
const pieChartController = require('../controllers/pieChartController');
const combinedDataController = require('../controllers/combinedDataController');



// Initialize the database
router.get('/initialize-database', databaseController.initializeDatabase);
router.get('/transactions', transactionsController.getAllTransactions);
router.get('/statistics', statisticsController.getStatistics);
router.get('/bar-chart', barChartController.generateBarChartData);
router.get('/pie-chart', pieChartController.generatePieChartData);
router.get('/combined-data', combinedDataController.fetchCombinedData);

module.exports = router;
