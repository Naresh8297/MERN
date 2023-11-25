import React, { useState, useEffect } from 'react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
      
        const response = await fetch('YOUR_BACKEND_ORDER_HISTORY_ENDPOINT');
        if (!response.ok) {
          throw new Error('Failed to fetch order history');
        }
        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order history:', error);
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  return (
    <div>
      <h2>Order History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <p>Order ID: {order.id}</p>
              <p>Date: {order.date}</p>
              
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
