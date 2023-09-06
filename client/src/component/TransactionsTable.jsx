// frontend/src/components/TransactionsTable.js
import React, { useState, useEffect } from 'react';
import { getTransactions} from '../services/api'; // Import your API service

function TransactionsTable() {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('March'); // Default month
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);

  const loadTransactions = async () => {
    try {
      const response = await getTransactions(selectedMonth, searchText, page, perPage);
      setTransactions(response.data);
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, [selectedMonth, searchText, page, perPage]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="transactions-table">
      <h2>Transaction Table</h2>
      <label>Select Month:</label>
      <select onChange={(e) => setSelectedMonth(e.target.value)} value={selectedMonth}>
        {/* Options for months (Jan to Dec) */}
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i} value={new Date(2023, i, 1).toLocaleString('default', { month: 'long' })}>
            {new Date(2023, i, 1).toLocaleString('default', { month: 'long' })}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Search by title, description, or price"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <table>
        {/* Table header */}
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction._id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>${transaction.price}</td>
              <td>{transaction.dateOfSale}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
}

export default TransactionsTable;
