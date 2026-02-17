import { DeliveryOptions } from "./DeliveryOptions"
import { CartItemDetails } from "./CartItemDetails";
import { DeliveryDate  } from "./DeliveryDate";

export function OrderSummary({ cart, deliveryOptions, loadCart}) {
  return (
    <div className="order-summary">
      {cart.map((cartItem) => {
        return (
          <div key={cartItem.productId} className="cart-item-container">
            <DeliveryDate cartItem={cartItem} deliveryOptions={deliveryOptions} />
            <div className="cart-item-details-grid">
              <CartItemDetails cartItem={cartItem} loadCart={loadCart}/>
            </div>
            <DeliveryOptions  cartItem={cartItem} deliveryOptions={deliveryOptions} loadCart={loadCart} />
          </div>
        );
        })}
    </div>
  );
}