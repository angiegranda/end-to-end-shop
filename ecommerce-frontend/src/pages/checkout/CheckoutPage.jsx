import axios from 'axios'
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import './CheckoutPage.css'
import { OrderSummary } from './OrderSumary'
import { PaymentSummary } from './PaymentSummary';
import { CheckoutHeader } from './CheckoutHeader';

export function CheckoutPage({ cart, loadCart, setCart}) {

    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    const cartQuantity = cart.reduce((sum, cartItem) => sum + cartItem.quantity, 0);

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
    }, [cart])

    return (
        <>
            <title>Checkout</title>

            <CheckoutHeader cartQuantity={cartQuantity} />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                {cart.length === 0 ? (
                    <div className="empty-cart-message">
                        Your cart is empty. <Link className="link-primary" to="/">Continue shopping</Link>
                    </div>
                ) : (
                    <div className="checkout-grid">
                        <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart} />
                        <PaymentSummary cart={cart} setCart={setCart} paymentSummary={paymentSummary}/>
                    </div>
                )}
            </div>
        </>
    );
}
