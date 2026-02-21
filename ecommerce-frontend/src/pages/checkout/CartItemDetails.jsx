import axios from "axios";
import { useState, useEffect } from "react";
import { formatMoney } from "../../utils/Money";

export function CartItemDetails({ cartItem, loadCart}) {

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    loadCart();
  }

  const [quantity, setQuantity] = useState(1);
  const [isEditing, setIsEditing] = useState(false);

  const updateQuantity = (event) => {
    setIsEditing(false);
    const newVal = Number(event.target.value);
    setQuantity(newVal);
    axios.put(`/api/cart-items/${cartItem.productId}`, { quantity: newVal });
    loadCart();
  }

  return (
    <>
      <img className="product-image"
        src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">
          {cartItem.product.name}
        </div>
        <div className="product-price">
          ${formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity: <span className="quantity-label">{cartItem.quantity}</span>
          </span>
          <span className="update-quantity-link link-primary">
            {!isEditing ? <span onClick={()=>{setIsEditing(true);}}>Update</span> : (
              <select value={quantity} onChange={updateQuantity}>
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
            )}
          </span>
          <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>
            Delete
          </span>
        </div>
      </div>
    </>
  );
}