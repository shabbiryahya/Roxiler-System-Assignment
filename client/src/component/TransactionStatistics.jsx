// frontend/src/components/TransactionStatistics.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionStatistics = () => {
  const [statistics, setStatistics] = useState({});
  const [month, setMonth] = useState('March'); // Default month

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/statistics?month=${month}`);
        setStatistics(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
  }, [month]);

  return (
    <div>
      <h2>Transaction Statistics</h2>
      <select onChange={(e) => setMonth(e.target.value)}>
        {/* Options for months (Jan to Dec) */}
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i} value={i + 1}>
            {new Date(2023, i, 1).toLocaleString('default', { month: 'long' })}
          </option>
        ))}
      </select>
      <div>
        <p>Total Sale Amount: ${statistics.totalSaleAmount?.toFixed(2)}</p>
        <p>Total Sold Items: {statistics.totalSoldItems}</p>
        <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
      </div>
    </div>
  );
};

export default TransactionStatistics;
