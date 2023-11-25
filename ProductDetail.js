import React, { useState, useEffect } from 'react';

const ProductDetail = ({ match }) => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const productId = match.params.id;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`YOUR_BACKEND_PRODUCT_DETAIL_ENDPOINT/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <div>
      <h2>Product Details</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h3>{product.name}</h3>
          <p>Description: {product.description}</p>
          <p>Price: ${product.price}</p>
         
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
