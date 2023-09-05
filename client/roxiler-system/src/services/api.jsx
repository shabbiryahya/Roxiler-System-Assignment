// frontend/src/services/api.js

import axios from 'axios';

const BASE_URL = 'http://localhost:3001'; // Update with your backend server URL

export const getTransactions = async (selectedMonth, searchText, page, perPage) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/transactions`, {
      params: {
        selectedMonth,
        searchText,
        page,
        perPage,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
