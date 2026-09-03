import CheckmarkIcon from '../../assets/images/icons/checkmark.png'
import { Stars } from '../../components/Stars';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios'

export function Product( {product, loadCart} ) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const addedTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (addedTimeoutRef.current) {
        clearTimeout(addedTimeoutRef.current);
      }
    };
  }, []);

  const updateSelectedQuantity = (event) => {
    const value = Number(event.target.value);
    setQuantity(value);
  }

  const addProductToCart = async () => {
    if (isAdding) {
      return;
    }
    setIsAdding(true);
    try {
      await axios.post(`/api/cart-items`, {
        "productId": product.id,
        "quantity": quantity
      });
      await loadCart();
      setQuantity(1);
      setIsAddedToCart(true);
      if (addedTimeoutRef.current) {
        clearTimeout(addedTimeoutRef.current);
      }
      addedTimeoutRef.current = setTimeout(() => setIsAddedToCart(false), 2000);
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <div className="product-container">
      <div className="product-image-container">
        <img className="product-image"
          src={product.image} />
      </div>

      <div className="product-name limit-text-to-2-lines">
        {product.name}
      </div>

      <div className="product-rating-container">
        <Stars rating={product.rating.stars} starSize={18} />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">
        ${Math.floor(product.priceCents / 100)}
      </div>

      <div className="product-quantity-container">
        <select value={quantity} onChange={updateSelectedQuantity}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className={`added-to-cart ${isAddedToCart ? 'added-to-cart-visible' : ''}`}>
        <img src={CheckmarkIcon} />
        Added
      </div>

      <button className="add-to-cart-button button-primary" onClick={addProductToCart} disabled={isAdding}>
        Add to Cart
      </button>
    </div>
  );
}
