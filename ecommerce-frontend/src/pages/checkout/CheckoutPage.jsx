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

        const getCheckoutData = async () => {
            let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
            setDeliveryOptions(response.data);
            response = await axios.get('/api/payment-summary');
            setPaymentSummary(response.data);
        }
        getCheckoutData();
        
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