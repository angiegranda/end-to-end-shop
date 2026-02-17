import axios from 'axios'
import { useEffect, useState } from 'react';
import './CheckoutPage.css'
import { OrderSummary } from './OrderSumary'
import { PaymentSummary } from './PaymentSummary';
import { CheckoutHeader } from './CheckoutHeader';

export function CheckoutPage({ cart, loadCart }) {

    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    const loadDeliveryOptions = async () => {
        let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
        setDeliveryOptions(response.data);
    }

    const loadPaymentSummary = async () => {
        const response = await axios.get('/api/payment-summary');
        setPaymentSummary(response.data);
    }

    useEffect(()=> {
        const getCheckoutData = async () => {
            await loadDeliveryOptions();
            await loadPaymentSummary();
        }
        getCheckoutData();
    }, []);

    useEffect(() => {
        const updateSummaryPayment = async () => {
            await loadPaymentSummary();
        }
        updateSummaryPayment();
    }, [deliveryOptions])

    return (
        <>
            <title>Checkout</title>

            <CheckoutHeader cartQuantity={cart.quantity} />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart} />
                    <PaymentSummary paymentSummary={paymentSummary}/>
                </div>
            </div>
        </>
    );
}