import axios from 'axios'
import { useEffect, useState } from 'react';
import './CheckoutPage.css'
import { OrderSummary } from './OrderSumary'
import { PaymentSummary } from './PaymentSummary';
import { CheckoutHeader } from './CheckoutHeader';

export function CheckoutPage({ cart }) {

    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    useEffect(()=> {
        axios.get('/api/delivery-options?expand=estimatedDeliveryTime').then((response) => {
            setDeliveryOptions(response.data);
        })

        axios.get('/api/payment-summary').then((response) => {
            setPaymentSummary(response.data);
        })
    }, []);

    return (
        <>
            <title>Checkout</title>

            <CheckoutHeader cartQuantity={cart.quantity} />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary cart={cart} deliveryOptions={deliveryOptions}/>
                    <PaymentSummary paymentSummary={paymentSummary}/>
                </div>
            </div>
        </>
    );
}