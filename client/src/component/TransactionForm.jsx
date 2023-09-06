// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function TransactionForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    dateOfSale: '',
    category: '',
    sold: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/add-transaction', formData);
      console.log('Transaction added:', response.data);
      // Reset the form after successful submission
      setFormData({
        title: '',
        description: '',
        price: 0,
        dateOfSale: '',
        category: '',
        sold: false,
      });
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Convert the value to a number if the input type is 'number'
    const processedValue = type === 'number' ? parseFloat(value) : value;

    setFormData({ ...formData, [name]: processedValue });
  };

  return (
    <div>
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="dateOfSale">Date of Sale</label>
          <input
            type="text"
            id="dateOfSale"
            name="dateOfSale"
            value={formData.dateOfSale}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="sold"
              checked={formData.sold}
              onChange={(e) => setFormData({ ...formData, sold: e.target.checked })}
            />
            Sold
          </label>
        </div>
        <div>
          <button type="submit">Add Transaction</button>
        </div>
      </form>
    </div>
  );
}

export default TransactionForm;
