import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const TransactionsBarChart = () => {
  const [barChartData, setBarChartData] = useState({});
  const [month, setMonth] = useState('March'); // Default month

  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/bar-chart?month=${month}`);
        
        setBarChartData(response.data);
      } catch (error) {
        console.error('Error fetching bar chart data:', error);
      }
    };

    fetchBarChartData();
  }, [month]);

  return (
    <div>
      <h2>Transactions Bar Chart</h2>
      <select onChange={(e) => setMonth(e.target.value)}>
        {/* Options for months (Jan to Dec) */}
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i} value={i + 1}>
            {new Date(2023, i, 1).toLocaleString('default', { month: 'long' })}
          </option>
        ))}
      </select>

      {/* Display bar chart */}
      <div style={{ width: '80%', margin: '0 auto' }}>
        {barChartData && barChartData.priceRanges && barChartData.itemCounts ? (
          <Bar
            data={{
              labels: barChartData.priceRanges.map((range) => range.label),
              datasets: [
                {
                  label: 'Number of Items',
                  data: barChartData.itemCounts,
                  backgroundColor: 'rgba(75, 192, 192, 0.6)',
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Number of Items',
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: 'Price Range',
                  },
                },
              },
            }}
          />
        ) : (
          <p>Loading chart data...</p>
        )}
      </div>
    </div>
  );
};

export default TransactionsBarChart;
