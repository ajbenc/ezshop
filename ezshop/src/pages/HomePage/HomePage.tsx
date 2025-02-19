// src/pages/HomePage/HomePage.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Product } from "../../types";
import "./HomePage.scss";

// Import category images
import techImage from "../../assets/images/tech-category.jpg";
import jewelryImage from "../../assets/images/jewelry-category.jpg";
import mensClothingImage from "../../assets/images/mens-clothing-category.jpg";
import womensClothingImage from "../../assets/images/womens-clothing-category.jpg";

const HomePage: React.FC = () => {
  // Commented out carouselProducts state
  // const [carouselProducts, setCarouselProducts] = useState<Product[]>([]);
  const [randomProduct, setRandomProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Fetch a random product for the exclusive offer
    axios.get("https://fakestoreapi.com/products").then((res) => {
      const randomIndex = Math.floor(Math.random() * res.data.length);
      setRandomProduct(res.data[randomIndex]);
    });
  }, []);

  // Commented out carouselProducts effect
  /*
  useEffect(() => {
    // Fetch products for the carousel
    axios.get('https://fakestoreapi.com/products?limit=10')
      .then(res => setCarouselProducts(res.data));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselProducts(prev => {
        const newProducts = [...prev];
        newProducts.push(newProducts.shift()!);
        return newProducts;
      });
    }, 5000);
  
    return () => clearInterval(interval);
  }, []);
  */

  return (
    <div className="home-page">
      {/*Main text*/}
      <h1 className="home-page__title">Welcome to the Ezshop!</h1>
      <h2 className="home-page__subtitle">
        where you can find everything you want
      </h2>

      {/* Carousel Section (commented due to non use) */}
      {/*
      <div className="carousel">
        {carouselProducts.map((product) => (
          <div key={product.id} className="carousel-item">
            <div className="carousel-image-container">
              <img src={product.image} alt={product.title} className="carousel-image" />
            </div>
            <div className="carousel-content">
              <h1 className='carousel-header'>Check this out!</h1>
              <h4 className="carousel-sub">Premium jewelry, tech and clothing</h4>
              <h3 className="carousel-title">{product.title}</h3>
              <p className="carousel-price">${product.price}</p>
              <Link to={`/products/${product.id}`} className="carousel-button">
                Shop Now
              </Link>
            </div>
          </div>
        ))}
      </div>
      */}

      {/* Exclusive Offer Section */}
      {randomProduct && (
        <div className="exclusive-offer">
          <div className="exclusive-offer__image">
            <img src={randomProduct.image} alt={randomProduct.title} />
          </div>
          <div className="exclusive-offer__content">
            <h2>Don't Skip This Amazing Discount!</h2>
            <p>{randomProduct.title}</p>
            <p className="exclusive-offer__price">${randomProduct.price}</p>
            <Link
              to={`/products/${randomProduct.id}`}
              className="exclusive-offer__button"
            >
              Shop Now
            </Link>
          </div>
        </div>
      )}

      {/* Categories Section */}
      <div className="categories">
        {[
          { name: "electronics", image: techImage },
          { name: "jewelery", image: jewelryImage },
          { name: "men's clothing", image: mensClothingImage },
          { name: "women's clothing", image: womensClothingImage },
        ].map((category) => (
          <Link
            key={category.name}
            to={`/products?category=${encodeURIComponent(category.name)}`}
            className="category-card"
          >
            <div className="category-image-container">
              <img
                src={category.image}
                alt={category.name}
                className="category-image"
              />
              <div className="category-overlay" />
            </div>
            <h3 className="category-title">{category.name}</h3>
          </Link>
        ))}
      </div>
      {/*Store Reviews Section*/}
      <div className="store-reviews">
        <h2 className="store-reviews__title">OUR CUSTOMER REVIEWS</h2>
        <div className="store-review__one">
          <h4 className="review-one">
            "Excellent quality and great customer service"
          </h4>
          <p className="review-one-text">John Foster.</p>
        </div>
        <div className="store-review__two">
          <h4 className="review-two">
            "Great for easy presents, fast delivery too..."
          </h4>
          <p className="review-two-text">Ellie Brodwick.</p>
        </div>
        <div className="store-review__three">
          <h4 className="review-three">
            "As an old man technology is difficult for me but buying stuff here
            is a breeze"
          </h4>
          <p className="review-three-text">- Lane Bermulindez.</p>
        </div>
      </div>
      {/*footer section*/}
      <footer className="site-footer">
        <div className="footer-content">
          {/* store information*/}
          <div className="footer-section">
            <h4 className="footer-title">Ezshop</h4>
            <div className="footer-contact">
              <p>143 York Street</p>
              <p>New York, NY 10001</p>
              <p>Email: support@ezshop.com</p>
              <p>Phone: (555) 123-4567</p>
            </div>
          </div>
          {/* Guide and help */}
          <div className="footer-section">
            <h4 className="footer-title">Help & Support</h4>
            <ul className="footer-links">
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Returns & Exchanges</a>
              </li>
              <li>
                <a href="#">Shipping & Delivery</a>
              </li>
              <li>
                <a href="#">Terms & Conditions</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
          {/* Payment section */}
          <div className="footer-section">
            <h4 className="footer-title">Payment Methods</h4>
            <div className="payment-methods">
              <span className="payment-icon">Visa</span>
              <span className="payment-icon">MasterCard</span>
              <span className="payment-icon">Paypal</span>
              <span className="payment-icon">Apple Pay</span>
              <span className="payment-icon">Google Pay</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Ezshop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
