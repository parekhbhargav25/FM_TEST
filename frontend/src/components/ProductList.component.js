import React, { useState, useEffect } from 'react';

function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/getProducts'); // Adjust the endpoint according to your backend route
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div style={{ maxHeight: '500px', overflowY: 'auto' }}> {/* Adjust the maxHeight value as needed */}
      <h3 style={{ color: '#f50057' }}>Products List</h3>
      {error && <div className="text-danger">{error}</div>}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
