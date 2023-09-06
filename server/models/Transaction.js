// backend/models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  dateOfSale: String,
  category: String,
  sold: Boolean,
});
// transactionSchema.index({ dateOfSale: 1 });
transactionSchema.index({ title: 'text' });
// transactionSchema.index({ description: 'text' });
// transactionSchema.index({ price: 1 });
// transactionSchema.index({dateOfSale: 1 , title: 1, description: 1, price: 1 });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
