import dayjs from "dayjs";
import { DeliveryOptions } from "./DeliveryOptions"
import { CartItemDetails } from "./CartItemDetails";

export function OrderSummary({ cart, deliveryOptions }) {
  return (
    <div className="order-summary">
      {cart.map((cartItem) => {
        const deliveryOptionSelected = deliveryOptions.find((deliveryOption) => {
          return deliveryOption.id == cartItem.deliveryOptionId;
        })
        return (
          
          <div key={cartItem.productId} className="cart-item-container">
            {deliveryOptionSelected &&
              <div className="delivery-date">
                {`Delivery date: ${dayjs(deliveryOptionSelected.estimatedDeliveryTimeMs).format('dddd, MMMM D')}`}
              </div>
            }

            <CartItemDetails cartItem={cartItem} />

            <DeliveryOptions  cartItem={cartItem} deliveryOptions={deliveryOptions} />

          </div>

        );
        })}
    </div>
  );
}