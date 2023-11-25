import React, { useState, useEffect } from 'react';

const OrderTracking = () => {
  const [orderStatus, setOrderStatus] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
    
        const response = await fetch('YOUR_BACKEND_ORDER_STATUS_ENDPOINT');
        if (!response.ok) {
          throw new Error('Failed to fetch order status');
        }
        const data = await response.json();
        setOrderStatus(data.status);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order status:', error);
        setLoading(false);
      }
    };

    fetchOrderStatus();
  }, []);

  return (
    <div>
      <h2>Order Tracking</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>Status: {orderStatus}</p>
       
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
