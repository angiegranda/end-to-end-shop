import dayjs from 'dayjs';

export function DeliveryDate( { cartItem, deliveryOptions } ) {  

  const deliveryOptionSelected = deliveryOptions.find((deliveryOption) => {
    return deliveryOption.id == cartItem.deliveryOptionId;
  })

  return (
    <>
      {deliveryOptionSelected &&
      <div className="delivery-date">
        {`Delivery date: ${dayjs(deliveryOptionSelected.estimatedDeliveryTimeMs).format('dddd, MMMM D')}`}
      </div>}
    </>      
  );
}