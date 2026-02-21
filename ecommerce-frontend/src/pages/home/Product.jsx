import CheckmarkIcon from '../../assets/images/icons/checkmark.png'
import { Stars } from '../../components/Stars';
import { useState } from 'react';
import axios from 'axios'

export function Product( {product, loadCart} ) {
  const [quantity, setQuantity] = useState(1);

  const updateSelectedQuantity = (event) => {
    const value = Number(event.target.value);
    setQuantity(value);
  }

  const addProductToCart = async () => {
    await axios.post(`/api/cart-items`, {
      "productId": product.id,
      "quantity": quantity
    });
    loadCart();
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

      <div className="added-to-cart">
        <img src={CheckmarkIcon} />
        Added
      </div>

      <button className="add-to-cart-button button-primary" onClick={addProductToCart}>
        Add to Cart
      </button>
    </div>
  );
}