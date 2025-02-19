import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Product } from '../../types';
import './ProductsPage.scss';

const ProductsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const category = searchParams.get('category');

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const url = category 
          ? `https://fakestoreapi.com/products/category/${category}`
          : 'https://fakestoreapi.com/products';
        
        const response = await axios.get(url);
        setProducts(response.data);
      }  catch (error) {
        console.error('Error fetching products:', error);
      } finally{
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  if (isLoading) return <div className="loading">Loading products...</div>;

  return (
    <div className="products-page">
      <h1 className="products-page__title">
        {category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : 'All Products'}
      </h1>
      <div className="products-page__grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;