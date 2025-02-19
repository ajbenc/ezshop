// src/pages/CategoriesPage/CategoriesPage.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Product } from '../../types';
import ProductCard from '../../components/ProductCard/ProductCard';
import './CategoriesPage.scss';

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<{
    [key: string]: Product[];
  }>({});

  useEffect(() => {
    // Fetch all categories
    axios.get('https://fakestoreapi.com/products/categories')
      .then(res => setCategories(res.data));

    // Fetch 4 products for each category
    categories.forEach(category => {
      axios.get(`https://fakestoreapi.com/products/category/${category}?limit=4`)
        .then(res => {
          setCategoryProducts(prev => ({
            ...prev,
            [category]: res.data
          }));
        });
    });
  }, [categories]);

  return (
    <div className="categories-page">
      {categories.map((category) => (
        <section key={category} className="category-section">
          <div className="category-header">
            <h2 className="category-title">{category}</h2>
            <Link to={`/products?category=${category}`} className="view-all">
              View All →
            </Link>
          </div>
          <div className="products-grid">
            {categoryProducts[category]?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default CategoriesPage;