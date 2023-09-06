import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

const TransactionsPieChart = () => {
  const [pieChartData, setPieChartData] = useState({});
  const [month, setMonth] = useState('March'); // Default month

  useEffect(() => {
    const fetchPieChartData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/pie-chart?month=${month}`);
        setPieChartData(response.data);
      } catch (error) {
        console.error('Error fetching pie chart data:', error);
      }
    };

    fetchPieChartData();
  }, [month]);

  return (
    <div>
      <h2>Transactions Pie Chart</h2>
      <select onChange={(e) => setMonth(e.target.value)}>
        {/* Options for months (Jan to Dec) */}
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i} value={i + 1}>
            {new Date(2023, i, 1).toLocaleString('default', { month: 'long' })}
          </option>
        ))}
      </select>

      {/* Display pie chart */}
      <div style={{ width: '80%', margin: '0 auto' }}>
        {pieChartData && pieChartData.categories ? (
          <Pie
            data={{
              labels: pieChartData.categories.map((category) => category.label),
              datasets: [
                {
                  data: pieChartData.itemCounts,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                  ],
                },
              ],
            }}
          />
        ) : (
          <p>Loading pie chart data...</p>
        )}
      </div>
    </div>
  );
};

export default TransactionsPieChart;
