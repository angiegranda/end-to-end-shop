import dayjs from 'dayjs'
import axios from 'axios';
import { formatMoney } from "../../utils/Money";

export function DeliveryOptions( { cartItem, deliveryOptions, loadCart} ) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">
        Choose a delivery option:
      </div>
      {deliveryOptions.map((deliveryOption) => {
          const changeDeliveryOption = async () => {
            const request = {
              'quantity': cartItem.quantity,
              'deliveryOptionId': deliveryOption.id,
            }
            await axios.put(`/api/cart-items/${cartItem.productId}`, request);
          }
        let priceString = deliveryOption.priceCents <= 0 ?
          "FREE Shipping" :
          `$${formatMoney(deliveryOption.priceCents)} - Shipping`;
        return (
          <div key={deliveryOption.id} className="delivery-option" onClick={changeDeliveryOption} onChange={loadCart}>
            <input type="radio" checked={deliveryOption.id === cartItem.deliveryOptionId} onChange={loadCart}
              className="delivery-option-input"
              name={`delivery-option-${cartItem.productId}`} />
            <div>
              <div className="delivery-option-date">
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
              </div>
              <div className="delivery-option-price">
                {priceString}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
