import { OrderHeader } from './OrderHeader'
import { OrderDetails } from './OrderDetails';

export function OrdersGrid( { orders } ) {
  return (
    <div className="orders-grid">
      {orders.map((order) => {
        const products = order.products;
        return (
          <div key={order.id} className="order-container">
            <OrderHeader order={order} />
            <OrderDetails orderId={order.id} products={products} />
          </div>
        );
      })}
    </div>
  );
}