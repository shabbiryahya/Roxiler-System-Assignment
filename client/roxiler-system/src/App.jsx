// src/App.jsx
import React, { useState } from 'react';
import './App.css';
import TransactionsTable from './component/TransactionsTable';
import TransactionStatistics from './component/TransactionStatistics';
import TransactionsBarChart from './component/TransactionsBarChart';
import TransactionsPieChart from './component/TransactionsPieChart';


function App() {
  const [selectedMonth, setSelectedMonth] = useState('March'); // Default month

  return (
    <div className="App">
      <h1>MERN Stack Coding Challenge</h1>
      <div className="container">
        <div className="column">
          <label>Select Month:</label>
          <select onChange={(e) => setSelectedMonth(e.target.value)} value={selectedMonth}>
            {/* Options for months (Jan to Dec) */}
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={new Date(2023, i, 1).toLocaleString('default', { month: 'long' })}>
                {new Date(2023, i, 1).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
          <TransactionsTable selectedMonth={selectedMonth} />
          <TransactionStatistics selectedMonth={selectedMonth} />
        </div>
        <div className="column">
          <TransactionsBarChart selectedMonth={selectedMonth} />
          <TransactionsPieChart selectedMonth={selectedMonth} />
        </div>
      </div>
    </div>
  );
}

export default App;
