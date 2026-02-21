import dayjs from 'dayjs'
import BuyAgainIcon from '../../assets/images/icons/buy-again.png'
import {Link} from 'react-router'
import { Fragment } from 'react';
import axios from 'axios';

export function OrderDetails( { orderId,  products } ) {
  
  const addProductToCart = async () => {
    await axios.post(`/api/cart-items`, {
      "productId": product.id,
      "quantity": quantity
    });
    loadCart();
  }

  return (
    <div className="order-details-grid">
      {products.map((orderProduct) => {
        return (
          <Fragment key={orderProduct.productId}>
            <div className="product-image-container">
              <img src={orderProduct.product.image} />
            </div>

            <div className="product-details">
              <div className="product-name">
                {orderProduct.product.name}
              </div>
              <div className="product-delivery-date">
                Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
              </div>
              <div className="product-quantity">
                Quantity: {orderProduct.quantity}
              </div>
              <button className="buy-again-button button-primary" onClick={addProductToCart}>
                <img className="buy-again-icon" src={BuyAgainIcon} />
                <span className="buy-again-message">Add to Cart</span>
              </button>
            </div>

            <div className="product-actions">
              <Link to={`/tracking/${orderId}/${orderProduct.productId}`}>
                <button className="track-package-button button-secondary">
                  Track package
                </button>
              </Link>
            </div>
          </Fragment>
        )
      })}
    </div>
  );
}