import dayjs from "dayjs";

export function ProductDetails( {product, deliveryProgress} ) {
  const deliveryStateString = deliveryProgress === 100 ? "Delivered on" : "Arriving on";
  const isPreparing = deliveryProgress < 33;
  const isShipped = deliveryProgress >= 33 && deliveryProgress < 100;
  const isDelivered = deliveryProgress === 100;
  return (
    <>
      <div className="delivery-date">
        {deliveryStateString} {dayjs(product.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
      </div>

      <div className="product-info">
        {product.name}
      </div>

      <div className="product-info">
        Quantity: {product.quantity}
      </div>

      <img className="product-image" src={product.image} />

      <div className="progress-labels-container">
        <div className={`progress-label ${isPreparing ? "current-status" : ""}`}>
          Preparing
        </div>
        <div className={`progress-label ${isShipped ? "current-status" : ""}`}>
          Shipped
        </div>
        <div className={`progress-label ${isDelivered ? "current-status" : ""}`}>
          Delivered
        </div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar" style={{width: `${deliveryProgress}%`}}></div>
      </div>
    </>
  );
}